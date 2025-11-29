import "./globals.css";

import { cn } from "@/lib/utils";
import { geistSans, geistMono } from "./fonts/fonts";
import { constructMetadata, generateJsonLd } from "@/lib/metadata";
import { Navbar } from "@/components/Navbar";

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = generateJsonLd();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="alternate" type="application/rss+xml" title="Computing Chronicles - Bryce Blankinship" href="/blog/rss.xml" />
      </head>
      <body
        className={cn("antialiased", geistSans.variable, geistMono.variable)}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
