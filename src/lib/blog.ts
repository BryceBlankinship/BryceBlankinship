import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')
const WORDS_PER_MINUTE = 200

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string
  updated?: string
  tags: string[]
  readingTime: number
}

export type Post = {
  meta: PostMeta
  content: string
}

type Frontmatter = {
  title?: string
  description?: string
  date?: string | Date
  updated?: string | Date
  tags?: string[]
  published?: boolean
}

const toISODate = (value: string | Date) =>
  (value instanceof Date ? value : new Date(value)).toISOString().split('T')[0]

const getReadingTime = (content: string) => {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

const readPost = (slug: string): Post | null => {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'))
  const frontmatter = data as Frontmatter

  if (frontmatter.published === false) return null
  if (!frontmatter.title || !frontmatter.date) {
    throw new Error(`Blog post "${slug}" is missing a required "title" or "date" in its frontmatter.`)
  }

  return {
    meta: {
      slug,
      title: frontmatter.title,
      description: frontmatter.description ?? '',
      date: toISODate(frontmatter.date),
      updated: frontmatter.updated ? toISODate(frontmatter.updated) : undefined,
      tags: frontmatter.tags ?? [],
      readingTime: getReadingTime(content),
    },
    content,
  }
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => readPost(file.replace(/\.mdx$/, ''))?.meta)
    .filter((meta): meta is PostMeta => Boolean(meta))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  if (!/^[a-z0-9-]+$/i.test(slug)) return null
  return readPost(slug)
}

const EXCERPT_MAX_CHARS = 600

const isTextBlock = (block: string) => !/^(#|\||<|import\s|export\s)/.test(block)

const stripBlockMarkers = (block: string) => block.replace(/^\s*(>\s?|[-*+]\s+|\d+\.\s+)/gm, '')

const stripInlineMarkdown = (text: string) =>
  text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/(\*\*|__)(.+?)\1/g, '$2')
    .replace(/(?<!\w)[*_](.+?)[*_](?!\w)/g, '$1')
    .replace(/~~(.+?)~~/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()

/** Plain-text version of the start of the post, skipping headings, code blocks, tables, and JSX. */
export function getPostExcerpt(content: string, maxChars = EXCERPT_MAX_CHARS) {
  const blocks = content
    .replace(/```[\s\S]*?```/g, '')
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(isTextBlock)
    .map((block) => stripInlineMarkdown(stripBlockMarkers(block)))
    .filter(Boolean)

  let excerpt = ''
  for (const block of blocks) {
    excerpt = excerpt ? `${excerpt} ${block}` : block
    if (excerpt.length >= maxChars) break
  }

  if (excerpt.length <= maxChars) return excerpt
  const cut = excerpt.slice(0, maxChars)
  return cut.slice(0, cut.lastIndexOf(' ')) || cut
}

export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
