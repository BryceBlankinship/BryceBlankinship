import { getAllBlogPosts } from '@/lib/blog'

export async function GET() {
  const posts = await getAllBlogPosts()
  const baseUrl = 'https://www.bryceblankinship.com'

  const rssItems = posts
    .map(
      (post) =>
        `<item>
          <title><![CDATA[${post.title}]]></title>
          <description><![CDATA[${post.description}]]></description>
          <link>${baseUrl}/blog/${post.slug}</link>
          <guid>${baseUrl}/blog/${post.slug}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <author>blankinship2002@gmail.com (Bryce Blankinship)</author>
          ${post.tags.map(tag => `<category>${tag}</category>`).join('\n          ')}
        </item>`
    )
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Computing Chronicles - Bryce Blankinship</title>
    <description>A software engineer's thoughts on web development, technology trends, and programming insights.</description>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <managingEditor>blankinship2002@gmail.com (Bryce Blankinship)</managingEditor>
    <webMaster>blankinship2002@gmail.com (Bryce Blankinship)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <ttl>60</ttl>
    <image>
      <url>${baseUrl}/avatar.jpg</url>
      <title>Computing Chronicles - Bryce Blankinship</title>
      <link>${baseUrl}/blog</link>
    </image>
    ${rssItems}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
} 