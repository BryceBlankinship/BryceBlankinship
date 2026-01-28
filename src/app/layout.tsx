import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";

import { cn } from "@/lib/utils";
import { geistSans, geistMono } from "./fonts/fonts";
import { constructMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/Navbar";
import { JsonLd } from "@/components/JsonLd";

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://github.com" />
        <link rel="preconnect" href="https://linkedin.com" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#171717" media="(prefers-color-scheme: dark)" />
        
        {/* Additional SEO meta tags */}
        <meta name="author" content="Bryce Blankinship" />
        <meta name="geo.region" content="US-NJ" />
        <meta name="geo.placename" content="New Jersey" />
      </head>
      <body
        className={cn("antialiased", geistSans.variable, geistMono.variable)}
      >
        <GoogleAnalytics gaId={'G-P5NZ37X2JF'} />
        <JsonLd />
        <Navbar />
        <main role="main">
          {children}
        </main>
      </body>
    </html>
  );
}
