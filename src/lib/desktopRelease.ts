export type DesktopReleaseInfo = {
  name?: string
  prerelease?: boolean
  publishedAt?: string
  tag: string
}

type DesktopReleaseManifest = {
  name?: string
  prerelease?: boolean
  publishedAt?: string
  tag?: string
}

const manifestUrl = import.meta.env.VITE_MEMOH_DESKTOP_RELEASE_MANIFEST || '/downloads/desktop/latest/manifest.json'

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
    },
  })

  const contentType = response.headers.get('content-type') || ''
  if (!response.ok || !contentType.includes('application/json')) {
    throw new Error(`Unable to load JSON from ${url}`)
  }

  return response.json() as Promise<T>
}

const fromManifest = (manifest: DesktopReleaseManifest): DesktopReleaseInfo | undefined => {
  if (!manifest.tag) return undefined

  return {
    name: manifest.name,
    prerelease: manifest.prerelease,
    publishedAt: manifest.publishedAt,
    tag: manifest.tag,
  }
}

const releaseTimestamp = (release: { created_at?: string; published_at?: string }) => {
  return Date.parse(release.published_at || release.created_at || '') || 0
}

const fetchFromGithubInDev = async (): Promise<DesktopReleaseInfo | undefined> => {
  if (!import.meta.env.DEV) return undefined

  const releases = await fetchJson<Array<{
    created_at?: string
    draft?: boolean
    name?: string
    prerelease?: boolean
    published_at?: string
    tag_name?: string
  }>>(
    'https://api.github.com/repos/memohai/Memoh/releases?per_page=30',
  )
  const release = releases
    .filter((item) => !item.draft)
    .sort((a, b) => releaseTimestamp(b) - releaseTimestamp(a))[0]

  if (!release?.tag_name) return undefined

  return {
    name: release.name,
    prerelease: release.prerelease,
    publishedAt: release.published_at,
    tag: release.tag_name,
  }
}

export const fetchDesktopReleaseInfo = async (): Promise<DesktopReleaseInfo | undefined> => {
  try {
    return fromManifest(await fetchJson<DesktopReleaseManifest>(manifestUrl))
  } catch {
    return fetchFromGithubInDev()
  }
}
