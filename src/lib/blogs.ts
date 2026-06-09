const markdownModules = import.meta.glob('../content/blogs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export type BlogPost = {
  slug: string
  title: string
  author: string
  date: string
  excerpt: string
  readingMinutes: number
  body: string
}

const parseFrontmatter = (raw: string) => {
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(raw)
  if (!match) return { meta: {}, body: raw }

  const meta = Object.fromEntries(
    match[1]
      .split('\n')
      .map((line) => {
        const separator = line.indexOf(':')
        if (separator === -1) return undefined
        return [
          line.slice(0, separator).trim(),
          line.slice(separator + 1).trim().replace(/^["']|["']$/g, ''),
        ] as const
      })
      .filter((entry): entry is readonly [string, string] => Boolean(entry)),
  )

  return {
    meta,
    body: raw.slice(match[0].length),
  }
}

const stripMarkdown = (value: string) =>
  value
    .replace(/!\[[^\]]*]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/[`*_>#|:-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

const getExcerpt = (body: string) => {
  const lines = body.split('\n')
  const line = lines.find((candidate) => {
    const trimmed = candidate.trim()
    return (
      trimmed &&
      !trimmed.startsWith('#') &&
      !trimmed.startsWith(':::') &&
      !trimmed.startsWith('![') &&
      !trimmed.startsWith('- ') &&
      !trimmed.startsWith('|') &&
      !trimmed.startsWith('```')
    )
  })

  const excerpt = stripMarkdown(line ?? '')
  return excerpt.length > 180 ? `${excerpt.slice(0, 177)}...` : excerpt
}

const getReadingMinutes = (body: string) => {
  const normalized = stripMarkdown(body.replace(/```[\s\S]*?```/g, ''))
  const units = normalized.match(/[\u4e00-\u9fff]|[A-Za-z0-9]+/g)?.length ?? 0
  return Math.max(2, Math.round(units / 320))
}

const getDateLabel = (slug: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${slug}T00:00:00Z`))

const parseBlogPost = (path: string, raw: string): BlogPost | undefined => {
  const slug = path.split('/').pop()?.replace(/\.md$/, '')
  if (!slug || slug === 'index') return undefined

  const { meta, body } = parseFrontmatter(raw)
  const bodyWithoutTitle = body.replace(/^#\s+.+\n+/, '')
  const title = meta.title || slug

  return {
    slug,
    title,
    author: meta.author || 'Team Memoh',
    date: getDateLabel(slug),
    excerpt: getExcerpt(bodyWithoutTitle),
    readingMinutes: getReadingMinutes(bodyWithoutTitle),
    body: bodyWithoutTitle,
  }
}

export const blogPosts = Object.entries(markdownModules)
  .map(([path, raw]) => parseBlogPost(path, raw))
  .filter((post): post is BlogPost => Boolean(post))
  .sort((a, b) => b.slug.localeCompare(a.slug))

export const getBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug)
