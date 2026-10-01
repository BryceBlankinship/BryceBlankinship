import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PostMetaLine } from "@/components/blog/PostMetaLine";
import { getAllPosts } from "@/lib/blog";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Blog",
  description:
    "Writing by Bryce Blankinship on software engineering, building startups, and life outside of code.",
  url: "/blog",
});

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <Card>
      <CardHeader className="p-4 md:p-6 pb-3 md:pb-4">
        <CardTitle className="text-2xl md:text-3xl">Blog</CardTitle>
        <p className="text-sm md:text-base text-muted-foreground">
          Engineering, building in public, and everything in between.
        </p>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0">
        {posts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No posts yet. Check back soon.</p>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.slug} className="border-b last:border-b-0 pb-6 last:pb-0">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h2 className="font-semibold text-base md:text-lg group-hover:underline">
                    {post.title}
                  </h2>
                  <PostMetaLine post={post} className="mt-1" />
                  {post.description && (
                    <p className="text-sm text-muted-foreground mt-2">{post.description}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
