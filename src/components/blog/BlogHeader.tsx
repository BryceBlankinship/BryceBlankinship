import Link from "next/link";

import { ArrowLeft } from "lucide-react";

export const BlogHeader = () => {
    return (
        <header className="flex items-center justify-between gap-4 mb-6 md:mb-8">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Bryce Blankinship
            </Link>
            <Link
                href="/blog"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
                All posts
            </Link>
        </header>
    );
};
