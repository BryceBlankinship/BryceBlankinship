import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PostMetaLine } from "@/components/blog/PostMetaLine";
import { cn } from "@/lib/utils";
import { getAllPosts, getPostBySlug, getPostExcerpt } from "@/lib/blog";

export const BlogPreview = () => {
    const latestSlug = getAllPosts()[0]?.slug;
    const latest = latestSlug ? getPostBySlug(latestSlug) : null;

    return (
        <Card
            id="blog"
            className={cn(
                "scroll-mt-20 md:scroll-mt-24",
                latest &&
                    "group relative transition-colors hover:border-primary/30 hover:bg-muted/40 has-[h3_a:focus-visible]:ring-2 has-[h3_a:focus-visible]:ring-ring"
            )}
        >
            <CardHeader className="flex flex-row justify-between items-baseline p-4 pb-4 md:p-6 md:pb-5">
                <CardTitle className="text-xl md:text-2xl">Blog</CardTitle>
                {latest && (
                    <Link
                        href="/blog"
                        className="relative z-10 flex items-center gap-1.5 text-sm text-primary hover:underline"
                    >
                        View all posts
                        <ArrowRight className="size-3" aria-hidden="true" />
                    </Link>
                )}
            </CardHeader>
            <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                {!latest ? (
                    <p className="text-sm md:text-base text-muted-foreground">
                        Posts are coming soon.
                    </p>
                ) : (
                    <article>
                        <h3 className="font-semibold text-base md:text-lg">
                            <Link
                                href={`/blog/${latest.meta.slug}`}
                                className="group-hover:underline focus-visible:outline-none after:absolute after:inset-0 after:rounded-lg"
                            >
                                {latest.meta.title}
                            </Link>
                        </h3>
                        <PostMetaLine post={latest.meta} className="mt-1" />
                        <p className="pointer-events-none mt-3 max-h-[5lh] overflow-hidden text-sm md:text-base text-muted-foreground [mask-image:linear-gradient(to_bottom,black_60%,transparent)]">
                            {getPostExcerpt(latest.content) || latest.meta.description}
                        </p>
                    </article>
                )}
            </CardContent>
        </Card>
    );
};
