# Blog System Documentation

This portfolio website now includes a fully-featured blog with a retro 1980s Apple computer aesthetic. Here's how to use and maintain it.

## Adding New Blog Posts

1. Create a new markdown file in the `blog/` directory
2. Use the following frontmatter structure:

```markdown
---
title: "Your Post Title"
description: "A brief description of your post for SEO and social sharing"
date: "2024-01-15"
author: "Bryce Blankinship"
tags: ["tag1", "tag2", "tag3"]
featured: false
image: "/blog/post-image.png" # Optional
---

# Your Post Title

Your content goes here...
```

### Frontmatter Fields

- **title**: The post title (required)
- **description**: SEO description and social media preview (required)
- **date**: Publication date in YYYY-MM-DD format (required)
- **author**: Author name (defaults to "Bryce Blankinship")
- **tags**: Array of tags for categorization and related posts
- **featured**: Boolean - featured posts appear in a special section
- **image**: Optional hero image for social sharing

## Blog Features

### 🎨 Retro Apple Aesthetic
- 1980s computer-inspired design
- Amber and orange color palette
- Classic typography with Courier New headings
- Vintage-style buttons and cards

### 📱 Social Sharing
- Twitter, LinkedIn, Facebook sharing
- Copy link functionality
- OpenGraph meta tags for rich previews
- Twitter Card support

### 🔍 SEO Optimization
- Structured data (JSON-LD) for search engines
- Automatic sitemap generation
- RSS feed at `/blog/rss.xml`
- Optimized meta tags for each post

### 📖 Content Features
- Markdown to HTML conversion
- Syntax highlighting for code blocks
- Reading time calculation
- Related posts based on tags
- Responsive design

## File Structure

```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx              # Blog listing page
│   │   │   └── page.tsx          # Individual blog post
│   │   └── rss.xml/
│   │       └── route.ts          # RSS feed generator
│   ├── sitemap.ts                # SEO sitemap
│   └── robots.ts                 # robots.txt
├── components/
│   ├── BlogCard.tsx              # Blog post preview card
│   └── SocialShare.tsx           # Social sharing component
└── lib/
    ├── blog.ts                   # Blog utilities and parsing
    └── metadata.ts               # SEO and metadata helpers

blog/                             # Markdown blog posts
├── welcome-to-my-blog.md
└── building-scalable-nextjs-applications.md
```

## Development

### Running the Blog
The blog is integrated into the main Next.js application. Run:

```bash
npm run dev
```

Then visit:
- `/blog` - Blog listing
- `/blog/[slug]` - Individual posts
- `/blog/rss.xml` - RSS feed

### Adding Dependencies
The blog uses these key dependencies:
- `gray-matter` - Markdown frontmatter parsing
- `remark` & `remark-html` - Markdown processing
- `reading-time` - Reading time calculation
- `@tailwindcss/typography` - Enhanced prose styling

## Customization

### Changing the Theme
The retro Apple aesthetic is defined in `src/app/globals.css`. Key classes:
- `.retro-apple-card` - Card styling
- `.retro-apple-title` - Heading typography
- `.retro-apple-text` - Body text styling
- `.retro-apple-button` - Button styling

### Modifying Content Processing
Blog processing logic is in `src/lib/blog.ts`. You can:
- Add new frontmatter fields
- Modify markdown processing
- Customize reading time calculation
- Add content validation

### SEO Configuration
Update `src/lib/metadata.ts` to:
- Change default metadata
- Modify OpenGraph settings
- Update structured data
- Customize social sharing

## Production Considerations

### Performance
- Blog posts are statically generated at build time
- Images should be optimized and placed in `public/blog/`
- RSS feed is cached for 1 hour

### Analytics
Add analytics tracking by extending the blog post page component with your preferred analytics solution.

### Comments
The blog is ready for comment integration. Consider adding:
- Giscus (GitHub Discussions)
- Disqus
- Custom comment system

## Best Practices

1. **Consistent Publishing**: Use consistent date formats and frontmatter
2. **SEO Optimization**: Always include meaningful descriptions and tags
3. **Image Optimization**: Use Next.js Image component for blog images
4. **Content Structure**: Use clear headings and proper markdown formatting
5. **Social Media**: Test social sharing previews before publishing

## Troubleshooting

### Common Issues

**Blog posts not appearing**: Check that the markdown file is in the `blog/` directory with proper frontmatter.

**RSS feed not updating**: The RSS feed is cached. In development, restart the server. In production, redeploy.

**Social sharing not working**: Verify OpenGraph meta tags are properly generated and the site is accessible.

**Styling issues**: The blog uses Tailwind CSS. Ensure the development server is running and styles are compiled.

---

For more help, check the source code or open an issue on GitHub. 