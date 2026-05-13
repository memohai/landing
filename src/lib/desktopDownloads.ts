import { desktopPlatformIcons, type DesktopDownloadKey } from './desktopDevice'

export type { DesktopDownloadKey } from './desktopDevice'

export type DesktopDownloadOption = {
  key: DesktopDownloadKey
  icon: string
  href?: string
}

const desktopDownloadFileNames: Record<DesktopDownloadKey, string> = {
  macArm: 'mac-arm64.dmg',
  macIntel: 'mac-x64.dmg',
  win: 'win-x64-setup.exe',
  linuxDebAmd64: 'linux-amd64.deb',
  linuxAppImageX86: 'linux-x86_64.AppImage',
}

const proxiedDownloadUrl = (key: DesktopDownloadKey, tag = 'latest') => {
  return `/downloads/desktop/${encodeURIComponent(tag)}/${desktopDownloadFileNames[key]}`
}

const envUrl = (value: string | undefined, fallback: string) => value || fallback

const desktopDownloadEnvUrls: Record<DesktopDownloadKey, string | undefined> = {
  macArm: import.meta.env.VITE_MEMOH_DESKTOP_DOWNLOAD_MAC_ARM,
  macIntel: import.meta.env.VITE_MEMOH_DESKTOP_DOWNLOAD_MAC_INTEL,
  win: import.meta.env.VITE_MEMOH_DESKTOP_DOWNLOAD_WINDOWS,
  linuxDebAmd64: import.meta.env.VITE_MEMOH_DESKTOP_DOWNLOAD_LINUX_DEB_AMD64,
  linuxAppImageX86: import.meta.env.VITE_MEMOH_DESKTOP_DOWNLOAD_LINUX_APPIMAGE_X86_64,
}

export const desktopDownloadUrls: Record<DesktopDownloadKey, string | undefined> = {
  macArm: envUrl(desktopDownloadEnvUrls.macArm, proxiedDownloadUrl('macArm')),
  macIntel: envUrl(desktopDownloadEnvUrls.macIntel, proxiedDownloadUrl('macIntel')),
  win: envUrl(desktopDownloadEnvUrls.win, proxiedDownloadUrl('win')),
  linuxDebAmd64: envUrl(desktopDownloadEnvUrls.linuxDebAmd64, proxiedDownloadUrl('linuxDebAmd64')),
  linuxAppImageX86: envUrl(desktopDownloadEnvUrls.linuxAppImageX86, proxiedDownloadUrl('linuxAppImageX86')),
}

export const desktopDownloadOptions: DesktopDownloadOption[] = [
  { key: 'macArm', icon: desktopPlatformIcons.macArm, href: desktopDownloadUrls.macArm },
  { key: 'macIntel', icon: desktopPlatformIcons.macIntel, href: desktopDownloadUrls.macIntel },
  { key: 'win', icon: desktopPlatformIcons.win, href: desktopDownloadUrls.win },
  { key: 'linuxDebAmd64', icon: desktopPlatformIcons.linuxDebAmd64, href: desktopDownloadUrls.linuxDebAmd64 },
  { key: 'linuxAppImageX86', icon: desktopPlatformIcons.linuxAppImageX86, href: desktopDownloadUrls.linuxAppImageX86 },
]

export const getDesktopDownloadHref = (key?: DesktopDownloadKey | null, tag?: string) => {
  if (!key) return undefined
  if (tag && !desktopDownloadEnvUrls[key]) {
    return proxiedDownloadUrl(key, tag)
  }
  return desktopDownloadUrls[key]
}
