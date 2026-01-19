import { Metadata } from 'next'

export function constructMetadata({
  title = 'Bryce Blankinship - Full-Stack Software Engineer | React, Next.js, Swift, Java, Spring Boot, Golang',
  description = "Full-stack software engineer with expertise in React, Next.js, TypeScript, and cloud infrastructure. Co-founder of ButterPhone and PatentFlip. Available for freelance web development projects. View my portfolio and get in touch.",
  image = '/avatar.jpg',
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
    title: {
      default: title,
      template: '%s | Bryce Blankinship'
    },
    description,
    keywords: [
      // Personal branding
      'Bryce Blankinship',
      'Bryce Blankinship portfolio',
      'Bryce Blankinship software engineer',
      // Professional titles
      'Software Engineer',
      'Full-Stack Developer',
      'Full Stack Engineer',
      'Web Developer',
      'Frontend Developer',
      'Backend Developer',
      // Technologies
      'React Developer',
      'Next.js Developer',
      'TypeScript Developer',
      'JavaScript Developer',
      'Node.js Developer',
      'Python Developer',
      // Frameworks & Tools
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Python',
      'PostgreSQL',
      'Google Cloud',
      'Spring Boot',
      'CI/CD',
      // Services
      'Freelance Web Developer',
      'Web Development Services',
      'Software Development',
      'Startup Technical Co-Founder',
      // Location-based (if relevant)
      'New Jersey Software Engineer',
      'NJ Web Developer',
      ...(tags || [])
    ],
    authors: authors.map(name => ({ name, url: baseUrl })),
    creator: 'Bryce Blankinship',
    publisher: 'Bryce Blankinship',
    category: 'Technology',
    classification: 'Portfolio',
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
      siteName: 'Bryce Blankinship - Portfolio',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: 'Bryce Blankinship - Full-Stack Software Engineer',
          type: 'image/jpeg',
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
    icons: {
      icon: icons,
      shortcut: icons,
      apple: icons,
    },
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
    verification: {
      // Add your verification codes here when available
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
    other: {
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': 'Bryce Blankinship',
    },
  }

  return metadata
}
