import "./globals.css";

import { Button } from "@repo/ui/components/button";
import { Card, CardContent } from "@repo/ui/components/card";
import { cn } from "@repo/ui/lib/utils";
import type { Metadata } from "next";
import { Inter as Font } from "next/font/google";
import Link from "next/link";

const font = Font({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neon vs SingleStore: Free Plan Comparison",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(font.className, "dark")}
      suppressHydrationWarning
    >
      <body className="text-foreground bg-background flex min-h-screen flex-col gap-y-8">
        <header className="container mx-auto mt-8 px-4">
          <Card>
            <CardContent className="flex justify-between gap-4">
              <h1 className="text-2xl font-semibold text-balance">Neon vs SingleStore: Free Plan Comparison</h1>
              <Button asChild>
                <Link href="https://portal.singlestore.com/intention/cloud?utm_source=yaroslav&utm_medium=app&utm_campaign=general-technical&utm_content=neon-vs-singlestore-free-plan-comparison">
                  Try SingleStore Free
                </Link>
              </Button>
            </CardContent>
          </Card>
        </header>

        <main className="container mx-auto flex-1 px-4">{children}</main>

        <footer className="text-muted-foreground container mx-auto px-4 text-sm">
          <div className="flex items-center justify-center py-8">
            <Link
              href="https://github.com/singlestore-labs/neon-vs-singlestore-free-plan-comparison"
              className="hover:text-foreground hover:underline"
              target="_blank"
            >
              GitHub Repository
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
