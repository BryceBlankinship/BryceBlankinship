import { CalendarDays, Clock } from "lucide-react";

import { formatPostDate, type PostMeta } from "@/lib/blog";
import { cn } from "@/lib/utils";

export const PostMetaLine = ({
    post,
    className,
}: {
    post: Pick<PostMeta, "date" | "readingTime">;
    className?: string;
}) => {
    return (
        <p className={cn("flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground", className)}>
            <span className="flex items-center">
                <CalendarDays className="size-3 mr-1.5 flex-shrink-0" aria-hidden="true" />
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            </span>
            <span className="flex items-center">
                <Clock className="size-3 mr-1.5 flex-shrink-0" aria-hidden="true" />
                {post.readingTime} min read
            </span>
        </p>
    );
};
