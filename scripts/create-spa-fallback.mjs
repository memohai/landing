import { copyFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'

const distDir = resolve('dist')
const indexPath = resolve(distDir, 'index.html')

await copyFile(indexPath, resolve(distDir, '404.html'))

for (const route of ['desktop']) {
  const routeDir = resolve(distDir, route)
  await mkdir(routeDir, { recursive: true })
  await copyFile(indexPath, resolve(routeDir, 'index.html'))
}

console.log('Created SPA fallback files')
