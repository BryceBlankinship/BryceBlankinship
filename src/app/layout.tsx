import "./globals.css";

import { cn } from "@/lib/utils";
import { geistSans, geistMono } from "./fonts/fonts";
import { constructMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/Navbar";

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
