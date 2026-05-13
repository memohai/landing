const RELEASE_REPO = 'memohai/Memoh'
const DOWNLOAD_PREFIX = '/downloads/desktop'
const LATEST_TTL_SECONDS = 300
const ASSET_TTL_SECONDS = 60 * 60 * 24 * 30

const ASSETS = {
  'mac-arm64.dmg': {
    key: 'macArm',
    pattern: /mac-arm64.*\.dmg$/i,
  },
  'mac-x64.dmg': {
    key: 'macIntel',
    pattern: /mac-x64.*\.dmg$/i,
  },
  'win-x64-setup.exe': {
    key: 'win',
    pattern: /win-x64.*setup.*\.exe$/i,
  },
  'linux-amd64.deb': {
    key: 'linuxDebAmd64',
    pattern: /linux-amd64.*\.deb$/i,
  },
  'linux-x86_64.AppImage': {
    key: 'linuxAppImageX86',
    pattern: /linux-x86_64.*\.AppImage$/i,
  },
}

const sanitizeFileNamePart = (value) => {
  return String(value).replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, '-')
}

const downloadFileName = (tag, slug) => {
  return `Memoh-${sanitizeFileNamePart(tag)}-${sanitizeFileNamePart(slug)}`
}

const jsonResponse = (body, init = {}) => {
  return new Response(JSON.stringify(body, null, 2), {
    ...init,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...init.headers,
    },
  })
}

const notFound = () => new Response('Not found', { status: 404 })

const githubHeaders = (env, accept = 'application/vnd.github+json') => {
  const headers = {
    accept,
    'user-agent': 'memoh-landing-download-proxy',
    'x-github-api-version': '2022-11-28',
  }

  if (env.GITHUB_TOKEN) {
    headers.authorization = `Bearer ${env.GITHUB_TOKEN}`
  }

  return headers
}

const githubFetch = async (url, env, accept) => {
  const response = await fetch(url, {
    headers: githubHeaders(env, accept),
    redirect: 'follow',
  })

  if (!response.ok) {
    throw new Error(`GitHub request failed: ${response.status} ${url}`)
  }

  return response
}

const releaseTimestamp = (release) => {
  return Date.parse(release.published_at || release.created_at || '') || 0
}

const pickLatestRelease = (releases) => {
  return releases
    .filter((release) => !release.draft)
    .sort((a, b) => releaseTimestamp(b) - releaseTimestamp(a))[0]
}

const getLatestRelease = async (env) => {
  const repo = env.MEMOH_RELEASE_REPO || RELEASE_REPO
  const response = await githubFetch(`https://api.github.com/repos/${repo}/releases?per_page=30`, env)
  const latest = pickLatestRelease(await response.json())

  if (!latest) {
    throw new Error(`No published releases found for ${repo}`)
  }

  return latest
}

const getRelease = async (tag, env) => {
  if (tag === 'latest') {
    return getLatestRelease(env)
  }

  const repo = env.MEMOH_RELEASE_REPO || RELEASE_REPO
  const response = await githubFetch(`https://api.github.com/repos/${repo}/releases/tags/${encodeURIComponent(tag)}`, env)

  return response.json()
}

const findAsset = (release, slug) => {
  const definition = ASSETS[slug]
  if (!definition) return undefined

  const asset = release.assets?.find((candidate) => definition.pattern.test(candidate.name))
  if (!asset) return undefined

  return {
    ...definition,
    slug,
    asset,
  }
}

const buildManifest = (requestUrl, release, repo) => {
  const assets = {}

  for (const [slug, definition] of Object.entries(ASSETS)) {
    const asset = release.assets?.find((candidate) => definition.pattern.test(candidate.name))
    if (!asset) continue

    assets[definition.key] = {
      path: `${requestUrl.origin}${DOWNLOAD_PREFIX}/${encodeURIComponent(release.tag_name)}/${slug}`,
      name: downloadFileName(release.tag_name, slug),
      originalName: asset.name,
      size: asset.size,
      contentType: asset.content_type,
      updatedAt: asset.updated_at,
    }
  }

  return {
    repo,
    name: release.name,
    prerelease: Boolean(release.prerelease),
    tag: release.tag_name,
    sourceUrl: release.html_url,
    publishedAt: release.published_at,
    assets,
  }
}

const cacheHeaders = (seconds, extra = {}) => ({
  'cache-control': `public, max-age=${seconds}, s-maxage=${seconds}`,
  ...extra,
})

const withCacheStatus = (response, status) => {
  const cachedResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  })
  cachedResponse.headers.set('x-memoh-cache', status)
  return cachedResponse
}

const proxyAsset = async (request, env, ctx, tag, slug) => {
  const cache = caches.default
  const cacheKey = new Request(request.url, { method: 'GET' })

  if (request.method === 'GET' && !request.headers.has('range')) {
    const cached = await cache.match(cacheKey)
    if (cached) return withCacheStatus(cached, 'HIT')
  }

  const release = await getRelease(tag, env)
  const selected = findAsset(release, slug)
  if (!selected) return notFound()

  const assetResponse = await fetch(selected.asset.browser_download_url, {
    method: request.method === 'HEAD' ? 'HEAD' : 'GET',
    headers: {
      'user-agent': 'memoh-landing-download-proxy',
      ...(request.headers.has('range') ? { range: request.headers.get('range') } : {}),
    },
    redirect: 'follow',
  })

  if (!assetResponse.ok && assetResponse.status !== 206) {
    return new Response('Unable to fetch release asset', { status: assetResponse.status })
  }

  const response = new Response(request.method === 'HEAD' ? null : assetResponse.body, {
    status: assetResponse.status,
    statusText: assetResponse.statusText,
    headers: assetResponse.headers,
  })
  response.headers.set('cache-control', `public, max-age=${ASSET_TTL_SECONDS}, immutable`)
  response.headers.set('content-disposition', `attachment; filename="${downloadFileName(release.tag_name, slug)}"`)
  response.headers.set('x-memoh-release-tag', release.tag_name)
  response.headers.set('x-memoh-cache', 'MISS')
  response.headers.delete('set-cookie')

  if (request.method === 'GET' && !request.headers.has('range')) {
    ctx.waitUntil(cache.put(cacheKey, response.clone()))
  }

  return response
}

const parsePath = (pathname) => {
  if (!pathname.startsWith(`${DOWNLOAD_PREFIX}/`)) return undefined

  const rest = pathname.slice(DOWNLOAD_PREFIX.length + 1)
  const [tag, ...fileParts] = rest.split('/').filter(Boolean)
  const file = fileParts.join('/')

  if (!tag || !file) return undefined
  return { tag: decodeURIComponent(tag), file: decodeURIComponent(file) }
}

export default {
  async fetch(request, env, ctx) {
    if (!['GET', 'HEAD'].includes(request.method)) {
      return new Response('Method not allowed', {
        status: 405,
        headers: { allow: 'GET, HEAD' },
      })
    }

    try {
      const url = new URL(request.url)
      const parsed = parsePath(url.pathname)
      if (!parsed) return notFound()

      if (parsed.file === 'manifest.json') {
        const cache = caches.default
        const cacheKey = new Request(request.url, { method: 'GET' })
        const cached = await cache.match(cacheKey)
        if (cached) return withCacheStatus(cached, 'HIT')

        const release = await getRelease(parsed.tag, env)
        const response = jsonResponse(request.method === 'HEAD' ? undefined : buildManifest(url, release, env.MEMOH_RELEASE_REPO || RELEASE_REPO), {
          headers: cacheHeaders(parsed.tag === 'latest' ? LATEST_TTL_SECONDS : ASSET_TTL_SECONDS, {
            'x-memoh-cache': 'MISS',
          }),
        })
        if (request.method === 'GET') {
          ctx.waitUntil(cache.put(cacheKey, response.clone()))
        }
        return response
      }

      if (!ASSETS[parsed.file]) return notFound()

      if (parsed.tag === 'latest') {
        const release = await getRelease('latest', env)
        const redirectUrl = new URL(request.url)
        redirectUrl.pathname = `${DOWNLOAD_PREFIX}/${encodeURIComponent(release.tag_name)}/${parsed.file}`

        return new Response(null, {
          status: 302,
          headers: cacheHeaders(LATEST_TTL_SECONDS, {
            location: redirectUrl.toString(),
            'x-memoh-release-tag': release.tag_name,
          }),
        })
      }

      return proxyAsset(request, env, ctx, parsed.tag, parsed.file)
    } catch (error) {
      return new Response(error instanceof Error ? error.message : 'Unexpected error', { status: 502 })
    }
  },
}
