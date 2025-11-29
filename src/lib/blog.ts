import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import readingTime from 'reading-time'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  featured?: boolean
  image?: string
  content: string
  readingTime: {
    text: string
    minutes: number
    time: number
    words: number
  }
}

const blogDirectory = path.join(process.cwd(), 'blog')

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  // Create blog directory if it doesn't exist
  if (!fs.existsSync(blogDirectory)) {
    fs.mkdirSync(blogDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(blogDirectory)
  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(blogDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        // Process markdown to HTML
        const processedContent = await remark()
          .use(remarkGfm)
          .use(remarkHtml)
          .process(content)
        const contentHtml = processedContent.toString()

        return {
          slug,
          title: data.title || 'Untitled',
          description: data.description || '',
          date: data.date || new Date().toISOString(),
          author: data.author || 'Bryce Blankinship',
          tags: data.tags || [],
          featured: data.featured || false,
          image: data.image || null,
          content: contentHtml,
          readingTime: readingTime(content),
        } as BlogPost
      })
  )

  return allPostsData.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Process markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .process(content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Bryce Blankinship',
      tags: data.tags || [],
      featured: data.featured || false,
      image: data.image || null,
      content: contentHtml,
      readingTime: readingTime(content),
    } as BlogPost
  } catch (error) {
    return null
  }
}

export function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], limit = 3): BlogPost[] {
  return allPosts
    .filter(post => post.slug !== currentPost.slug)
    .filter(post => post.tags.some(tag => currentPost.tags.includes(tag)))
    .slice(0, limit)
} 