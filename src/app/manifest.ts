import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bryce Blankinship - Full-Stack Software Engineer',
    short_name: 'Bryce B.',
    description: 'Full-stack software engineer specializing in React, Next.js, TypeScript, and cloud infrastructure. View my portfolio, projects, and professional experience.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#171717',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/avatar.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
        purpose: 'any'
      },
      {
        src: '/avatar.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
        purpose: 'maskable'
      }
    ],
    categories: ['portfolio', 'personal', 'technology'],
  }
}
