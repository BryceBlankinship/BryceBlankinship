import { Metadata } from 'next'
import { BlogPost } from './blog'

// TODO: Update metadata

export function constructMetadata({
  title = 'Bryce Blankinship - Full-Stack Software Engineer',
  description = "Full-stack software engineer with a passion for building user applications. Explore my portfolio, projects, and technical blog posts about software development.",
  image = '/thumbnail.png',
  icons = '/avatar.jpg',
  noIndex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors = ['Bryce Blankinship'],
  tags,
  url,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
  url?: string
} = {}): Metadata {
  const baseUrl = 'https://www.bryceblankinship.com'
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl

  const metadata: Metadata = {
    title,
    description,
    keywords: [
      'Bryce Blankinship',
      'Software Engineer',
      'Full-Stack Developer',
      'Web Development',
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Software Development',
      'Programming',
      ...(tags || [])
    ],
    authors: authors.map(name => ({ name })),
    creator: 'Bryce Blankinship',
    publisher: 'Bryce Blankinship',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type,
      title,
      description,
      url: fullUrl,
      siteName: 'Bryce Blankinship',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale: 'en_US',
      ...(type === 'article' && publishedTime && {
        publishedTime,
        modifiedTime,
        authors: authors,
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@bryceblankinship',
      site: '@bryceblankinship',
    },
    icons,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: fullUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }

  return metadata
}

export function constructBlogPostMetadata(post: BlogPost): Metadata {
  return constructMetadata({
    title: `${post.title} | Bryce Blankinship`,
    description: post.description,
    image: post.image || '/blog-default.png',
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.date,
    authors: [post.author],
    tags: post.tags,
    url: `/blog/${post.slug}`,
  })
}

export function generateJsonLd(post?: BlogPost) {
  const baseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Bryce Blankinship',
    jobTitle: 'Full-Stack Software Engineer',
    url: 'https://www.bryceblankinship.com',
    sameAs: [
      'https://github.com/BryceBlankinship',
      'https://linkedin.com/in/bryceblankinship',
      'https://twitter.com/bryceblankinship',
    ],
    knowsAbout: [
      'Software Engineering',
      'Web Development',
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Node.js',
    ],
  }

  if (post) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      author: {
        '@type': 'Person',
        name: post.author,
        url: 'https://www.bryceblankinship.com',
      },
      publisher: {
        '@type': 'Person',
        name: 'Bryce Blankinship',
        url: 'https://www.bryceblankinship.com',
      },
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://www.bryceblankinship.com/blog/${post.slug}`,
      },
      url: `https://www.bryceblankinship.com/blog/${post.slug}`,
      image: post.image || 'https://www.bryceblankinship.com/blog-default.png',
      keywords: post.tags.join(', '),
      wordCount: post.readingTime.words,
      timeRequired: `PT${Math.ceil(post.readingTime.minutes)}M`,
    }
  }

  return baseJsonLd
}
