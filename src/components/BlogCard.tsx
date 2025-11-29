'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BlogPost } from '@/lib/blog'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Calendar, Clock, User } from 'lucide-react'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const router = useRouter()

  return (
    <Card className="apple-classic-card hover:shadow-md transition-all duration-200 group">
      <CardHeader className="pb-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge key={tag} className="apple-classic-badge">
              {tag}
            </Badge>
          ))}
        </div>
        <Link href={`/blog/${post.slug}`} onClick={() => router.push(`/blog/${post.slug}`)}>
          <h2 className="apple-classic-title text-2xl group-hover:text-gray-600 transition-colors duration-150">
            {post.title}
          </h2>
        </Link>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="apple-classic-text text-base mb-6 leading-relaxed">
          {post.description}
        </p>

        <div className="article-meta flex flex-wrap items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.readingTime.text}</span>
          </div>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          onClick={() => router.push(`/blog/${post.slug}`)}
          className="apple-classic-link text-base font-normal"
        >
          Read Article →
        </Link>
      </CardContent>
    </Card >
  )
} 