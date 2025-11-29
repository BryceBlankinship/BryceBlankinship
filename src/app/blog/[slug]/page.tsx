import { getBlogPost, getAllBlogPosts, getRelatedPosts } from '@/lib/blog'
import { constructBlogPostMetadata, generateJsonLd } from '@/lib/metadata'
import { SocialShare } from '@/components/SocialShare'
import { BlogCard } from '@/components/BlogCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { FloppyDiskLoader } from '@/components/FloppyDiskLoader'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const post = await getBlogPost(resolvedParams.slug)
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  return constructBlogPostMetadata(post)
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const post = await getBlogPost(resolvedParams.slug)
  
  if (!post) {
    notFound()
  }

  const allPosts = await getAllBlogPosts()
  const relatedPosts = getRelatedPosts(post, allPosts, 2)

  const jsonLd = generateJsonLd(post)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <BlogPostWrapper post={post} relatedPosts={relatedPosts} />
    </>
  )
}

interface BlogPostWrapperProps {
  post: any
  relatedPosts: any[]
}

function BlogPostWrapper({ post, relatedPosts }: BlogPostWrapperProps) {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Clean Apple Navigation Header */}
      <header className="apple-classic-nav py-6 pt-20 md:pt-6">
        <div className="blog-layout px-6">
          <Link href="/blog">
            <Button variant="outline" size="sm" className="apple-classic-button">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Posts
            </Button>
          </Link>
        </div>
      </header>

      <article className="blog-layout px-6 py-12">
        {/* Article Header */}
        <header className="blog-header">
          <div className="apple-classic-card p-12">
            <div className="flex flex-wrap gap-3 mb-6">
              {post.tags.map((tag: string) => (
                <Badge key={tag} className="apple-classic-badge">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="apple-classic-title text-5xl mb-8 leading-tight">
              {post.title}
            </h1>
            
            <p className="apple-classic-text text-xl mb-8 leading-relaxed text-gray-700">
              {post.description}
            </p>
            
            <div className="article-meta flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5" />
                <span>{post.readingTime.text}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="blog-article">
          <div className="apple-classic-card p-12">
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>

        {/* Social Share */}
        <div className="mb-12">
          <SocialShare 
            url={`/blog/${post.slug}`}
            title={post.title}
            description={post.description}
          />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="apple-classic-title text-3xl mb-8">
              Related Articles
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
} 