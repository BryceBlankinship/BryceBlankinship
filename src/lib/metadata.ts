import { Metadata } from 'next'

// TODO: Update metadata

export function constructMetadata({
  title = 'Bryce Blankinship - Full-Stack Software Engineer',
  description = "Full-stack software engineer with a passion for building user applications. Explore my portfolio and projects.",
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