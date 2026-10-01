import { BlogHeader } from "@/components/blog/BlogHeader";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background min-h-screen">
      <div className="container max-w-screen-md mx-auto px-4 py-6 md:py-10">
        <BlogHeader />
        {children}
      </div>
    </div>
  );
}
