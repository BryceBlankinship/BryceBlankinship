import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

const MdxLink = ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    if (href.startsWith("/") || href.startsWith("#")) {
        return <Link href={href} {...props} />;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
};

const components = {
    a: MdxLink,
};

export const Mdx = ({ source }: { source: string }) => {
    return (
        <MDXRemote
            source={source}
            components={components}
            options={{
                mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [[rehypePrettyCode, { theme: "github-light" }]],
                },
            }}
        />
    );
};
