import { notFound } from "next/navigation";

import { Mdx } from "@/components/blog/Mdx";
import { PostMetaLine } from "@/components/blog/PostMetaLine";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { constructMetadata } from "@/lib/metadata";

const baseUrl = "https://www.bryceblankinship.com";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { meta } = post;
  return constructMetadata({
    title: meta.title,
    description: meta.description,
    type: "article",
    publishedTime: meta.date,
    modifiedTime: meta.updated ?? meta.date,
    tags: meta.tags,
    url: `/blog/${meta.slug}`,
  });
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { meta, content } = post;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.updated ?? meta.date,
    url: `${baseUrl}/blog/${meta.slug}`,
    mainEntityOfPage: `${baseUrl}/blog/${meta.slug}`,
    image: `${baseUrl}/avatar.jpg`,
    keywords: meta.tags,
    author: {
      "@type": "Person",
      name: "Bryce Blankinship",
      url: baseUrl,
    },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{meta.title}</h1>
        <PostMetaLine post={meta} className="mt-3 text-sm" />
      </header>
      <div className="prose prose-neutral md:prose-lg prose-code:before:content-none prose-code:after:content-none">
        <Mdx source={content} />
      </div>
    </article>
  );
}
