import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const distDir = resolve('dist')
const indexPath = resolve(distDir, 'index.html')
const metaPattern = /<!-- app-meta-start -->[\s\S]*?<!-- app-meta-end -->/

const pages = {
  home: {
    title: 'MemohAI - The Agent Orchestrator',
    description: 'Memoh is a self-hosted agent orchestrator for hackers and AI developers, with container isolation, long-term memory, high concurrency, and zero telemetry.',
    socialDescription: 'Self-hosted agent orchestration with container isolation, long-term memory, high concurrency, and zero telemetry.',
    url: 'https://memoh.ai/',
  },
  desktop: {
    title: 'Memoh Desktop - Download for macOS, Windows & Linux',
    description: 'Download the Memoh desktop app for macOS, Windows, and Linux. Run your agent workspace natively on your computer.',
    socialDescription: 'Download Memoh Desktop for macOS, Windows, and Linux.',
    url: 'https://memoh.ai/desktop',
  },
}

const escapeHtml = (value) => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

const renderMeta = ({ title, description, socialDescription, url }) => {
  const image = 'https://memoh.ai/logo.png'

  return `<!-- app-meta-start -->
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${escapeHtml(url)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="MemohAI" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(socialDescription)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(socialDescription)}" />
    <meta name="twitter:image" content="${image}" />
    <!-- app-meta-end -->`
}

const withMeta = (html, page) => {
  if (!metaPattern.test(html)) {
    throw new Error('Missing app metadata markers in dist/index.html')
  }

  return html.replace(metaPattern, renderMeta(page))
}

const indexHtml = await readFile(indexPath, 'utf8')
await writeFile(indexPath, withMeta(indexHtml, pages.home))
await writeFile(resolve(distDir, '404.html'), withMeta(indexHtml, pages.home))

for (const route of ['desktop']) {
  const routeDir = resolve(distDir, route)
  await mkdir(routeDir, { recursive: true })
  await writeFile(resolve(routeDir, 'index.html'), withMeta(indexHtml, pages[route]))
}

console.log('Created SPA fallback files')
