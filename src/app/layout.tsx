import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { BookOpen, PenTool, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "AI English Learning",
  description: "Learn English with local AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-50"
      >
        <div className="flex h-screen flex-col md:flex-row overflow-hidden">
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 flex flex-col">
            <div className="p-6">
              <h1 className="text-xl font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-6 h-6" />
                AI English
              </h1>
            </div>
            <nav className="flex-1 px-4 space-y-2">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                Dashboard
              </Link>
              <Link
                href="/vocabulary"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                Vocabulary
              </Link>
              <Link
                href="/practice"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <PenTool className="w-5 h-5" />
                Practice Area
              </Link>
            </nav>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-zinc-950">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
