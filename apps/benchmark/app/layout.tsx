import "./globals.css";

import { cn } from "@repo/ui/lib/utils";
import type { Metadata } from "next";
import { Inter as Font } from "next/font/google";

const font = Font({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Benchmark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(font.className)}
      suppressHydrationWarning
    >
      <body className="text-foreground bg-background flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
