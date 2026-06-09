import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import githubDark from 'shiki/themes/github-dark.mjs'
import javascript from 'shiki/langs/javascript.mjs'
import json from 'shiki/langs/json.mjs'
import shellscript from 'shiki/langs/shellscript.mjs'
import typescript from 'shiki/langs/typescript.mjs'
import xml from 'shiki/langs/xml.mjs'

const shikiTheme = 'github-dark'
const supportedLanguages = ['xml', 'typescript', 'javascript', 'json', 'shellscript'] as const
const languageAliases: Record<string, string> = {
  bash: 'shellscript',
  js: 'javascript',
  shell: 'shellscript',
  sh: 'shellscript',
  ts: 'typescript',
}

const highlighterPromise = createHighlighterCore({
  themes: [githubDark],
  langs: [xml, typescript, javascript, json, shellscript],
  engine: createJavaScriptRegexEngine(),
})

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const escapeAttr = escapeHtml

const isExternalUrl = (href: string) => /^https?:\/\//.test(href)

const renderInline = (value: string) => {
  const codeSpans: string[] = []
  const withPlaceholders = value.replace(/`([^`]+)`/g, (_, code: string) => {
    const token = `@@CODE_${codeSpans.length}@@`
    codeSpans.push(`<code>${escapeHtml(code)}</code>`)
    return token
  })

  let html = escapeHtml(withPlaceholders)

  html = html.replace(/\[([^\]]+)]\(([^)]+)\)/g, (_, label: string, href: string) => {
    const externalAttrs = isExternalUrl(href) ? ' target="_blank" rel="noopener noreferrer"' : ''
    return `<a href="${escapeAttr(href)}"${externalAttrs}>${renderInline(label)}</a>`
  })

  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/@@CODE_(\d+)@@/g, (_, index: string) => codeSpans[Number(index)] ?? '')

  return html
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')

const isHeading = (line: string) => /^#{1,4}\s+/.test(line.trim())
const isImage = (line: string) => /^!\[[^\]]*]\([^)]+\)$/.test(line.trim())
const isFence = (line: string) => line.trim().startsWith('```')
const isTipStart = (line: string) => line.trim() === ':::tip'
const isBlockquote = (line: string) => line.trim().startsWith('>')
const isUnorderedList = (line: string) => /^\s*-\s+/.test(line)
const isOrderedList = (line: string) => /^\s*\d+\.\s+/.test(line)
const isTableSeparator = (line: string) => /^\s*\|?[\s:-]+(\|[\s:-]+)+\|?\s*$/.test(line)
const isTableRow = (line: string) => line.trim().startsWith('|') && line.trim().endsWith('|')

const isSpecialLine = (line: string, nextLine?: string) =>
  isHeading(line) ||
  isImage(line) ||
  isFence(line) ||
  isTipStart(line) ||
  isBlockquote(line) ||
  isUnorderedList(line) ||
  isOrderedList(line) ||
  (isTableRow(line) && nextLine !== undefined && isTableSeparator(nextLine))

const renderImage = (line: string) => {
  const match = /^!\[([^\]]*)]\(([^)]+)\)$/.exec(line.trim())
  if (!match) return ''

  const [, alt, src] = match
  return `<figure><img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}" loading="lazy" /></figure>`
}

const splitTableRow = (line: string) =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())

const renderTable = (lines: string[]) => {
  const [headerLine, , ...bodyLines] = lines
  const headers = splitTableRow(headerLine)
  const rows = bodyLines.map(splitTableRow)

  return [
    '<div class="blog-table-wrap"><table>',
    '<thead><tr>',
    ...headers.map((header) => `<th>${renderInline(header)}</th>`),
    '</tr></thead>',
    '<tbody>',
    ...rows.map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join('')}</tr>`),
    '</tbody></table></div>',
  ].join('')
}

const renderCodeBlock = async (code: string, language: string) => {
  const normalizedLanguage = language.toLowerCase()
  const lang = languageAliases[normalizedLanguage] ?? normalizedLanguage
  const isSupportedLanguage = supportedLanguages.includes(lang as typeof supportedLanguages[number])

  if (!isSupportedLanguage) {
    return `<pre><code${language ? ` class="language-${escapeAttr(language)}"` : ''}>${escapeHtml(code)}</code></pre>`
  }

  try {
    const highlighter = await highlighterPromise
    return highlighter.codeToHtml(code, {
      lang,
      theme: shikiTheme,
    })
  } catch {
    return `<pre><code${language ? ` class="language-${escapeAttr(language)}"` : ''}>${escapeHtml(code)}</code></pre>`
  }
}

export const renderMarkdown = async (markdown: string) => {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const html: string[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]
    const trimmed = line.trim()

    if (!trimmed) {
      index += 1
      continue
    }

    if (isFence(line)) {
      const language = trimmed.replace(/^```/, '').trim().split(/\s+/)[0] ?? ''
      const code: string[] = []
      index += 1

      while (index < lines.length && !isFence(lines[index])) {
        code.push(lines[index])
        index += 1
      }

      index += 1
      html.push(await renderCodeBlock(code.join('\n'), language))
      continue
    }

    if (isTipStart(line)) {
      const body: string[] = []
      index += 1

      while (index < lines.length && lines[index].trim() !== ':::') {
        body.push(lines[index])
        index += 1
      }

      index += 1
      html.push(`<aside class="blog-tip"><strong>Tip</strong>${await renderMarkdown(body.join('\n'))}</aside>`)
      continue
    }

    if (isHeading(line)) {
      const match = /^(#{1,4})\s+(.+)$/.exec(trimmed)
      if (match) {
        const level = match[1].length
        const content = renderInline(match[2])
        const id = slugify(content)
        html.push(`<h${level} id="${escapeAttr(id)}">${content}</h${level}>`)
      }
      index += 1
      continue
    }

    if (isImage(line)) {
      html.push(renderImage(line))
      index += 1
      continue
    }

    if (/^_[^_].*_$/.test(trimmed)) {
      html.push(`<p class="blog-caption">${renderInline(trimmed.slice(1, -1))}</p>`)
      index += 1
      continue
    }

    if (isTableRow(line) && index + 1 < lines.length && isTableSeparator(lines[index + 1])) {
      const tableLines = [line, lines[index + 1]]
      index += 2

      while (index < lines.length && isTableRow(lines[index])) {
        tableLines.push(lines[index])
        index += 1
      }

      html.push(renderTable(tableLines))
      continue
    }

    if (isBlockquote(line)) {
      const quoteLines: string[] = []

      while (index < lines.length && isBlockquote(lines[index])) {
        quoteLines.push(lines[index].replace(/^\s*>\s?/, ''))
        index += 1
      }

      html.push(`<blockquote><p>${renderInline(quoteLines.join(' '))}</p></blockquote>`)
      continue
    }

    if (isUnorderedList(line)) {
      const items: string[] = []

      while (index < lines.length && isUnorderedList(lines[index])) {
        items.push(lines[index].replace(/^\s*-\s+/, ''))
        index += 1
      }

      html.push(`<ul>${items.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ul>`)
      continue
    }

    if (isOrderedList(line)) {
      const items: string[] = []

      while (index < lines.length && isOrderedList(lines[index])) {
        items.push(lines[index].replace(/^\s*\d+\.\s+/, ''))
        index += 1
      }

      html.push(`<ol>${items.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ol>`)
      continue
    }

    const paragraph: string[] = []

    while (
      index < lines.length &&
      lines[index].trim() &&
      !isSpecialLine(lines[index], lines[index + 1])
    ) {
      paragraph.push(lines[index].trim())
      index += 1
    }

    html.push(`<p>${renderInline(paragraph.join(' '))}</p>`)
  }

  return html.join('\n')
}
