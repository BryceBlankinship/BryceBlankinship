import { getAllBlogPosts } from '@/lib/blog'
import { BlogCard } from '@/components/BlogCard'
import { constructMetadata } from '@/lib/metadata'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Rss } from 'lucide-react'

export const metadata = constructMetadata({
  title: 'Blog | Bryce Blankinship - Software Engineering & Tech Insights',
  description: 'Read my latest thoughts on software engineering, web development, and technology. Tutorials, insights, and experiences from a full-stack developer.',
  url: '/blog',
})

export default async function BlogPage() {
  const posts = await getAllBlogPosts()
  const featuredPosts = posts.filter(post => post.featured)
  const regularPosts = posts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Clean Apple Navigation Header */}
      <header className="apple-classic-nav py-8 pt-20 md:pt-8">
        <div className="blog-layout px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/">
                <Button variant="outline" size="sm" className="apple-classic-button">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Portfolio
                </Button>
              </Link>
              <div>
                <h1 className="apple-classic-title text-4xl">
                  Bryce's Blog
                </h1>
                <p className="apple-classic-subtitle text-lg mt-2">
                  Thoughts on software engineering, entrepreneurship, and life.
                </p>
              </div>
            </div>
            
            <Link href="/blog/rss.xml">
              <Button variant="outline" size="sm" className="apple-classic-button">
                <Rss className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="blog-layout px-6 py-12">
        {/* Introduction */}
        <div className="blog-header">
          <div className="apple-classic-card p-8">
            <h2 className="apple-classic-title text-3xl mb-6">
              Welcome
            </h2>
            <p className="apple-classic-text text-lg leading-relaxed">
              This is where I share my thoughts on software engineering, technology, and the craft of building digital products. 
              Each article represents lessons learned, insights gained, and ideas worth exploring further.
            </p>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="apple-classic-title text-3xl mb-8">Featured</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <h2 className="apple-classic-title text-3xl mb-8">
            {featuredPosts.length > 0 ? 'Recent Articles' : 'Articles'}
          </h2>
          
          {posts.length === 0 ? (
            <div className="apple-classic-card p-12 text-center">
              <h3 className="apple-classic-title text-2xl mb-4">Coming Soon</h3>
              <p className="apple-classic-text text-lg">
                I'm currently working on the first articles. Check back soon for insights on 
                software development, technology, and engineering practices.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {regularPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
} 