"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LayoutDashboard, PenTool, Sparkles } from "lucide-react";
import { useSoftReveal } from "@/lib/use-soft-reveal";

const navItems = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/vocabulary", label: "Words", icon: BookOpen },
  { href: "/practice", label: "Practice", icon: PenTool },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shellRef = useSoftReveal<HTMLDivElement>();

  return (
    <div ref={shellRef} className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside
          data-reveal
          className="border-b border-[var(--border)] bg-[var(--panel)]/95 md:sticky md:top-0 md:h-screen md:w-60 md:border-b-0 md:border-r"
        >
          <div className="flex items-center justify-between gap-3 px-4 py-4 md:block md:px-5 md:py-6">
            <Link href="/" className="flex items-center gap-2 text-base font-extrabold">
              <span className="grid size-9 place-items-center rounded-xl bg-[var(--primary)] text-[var(--foreground)]">
                <Sparkles className="size-5" />
              </span>
              AI English
            </Link>
            <p className="hidden text-xs font-semibold uppercase tracking-wide text-[var(--muted-2)] md:mt-2 md:block">
              Daily study
            </p>
          </div>

          <nav className="flex gap-2 overflow-x-auto px-3 pb-3 md:flex-col md:px-4 md:pb-0">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex min-w-fit items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold md:px-4 md:py-3 ${
                    isActive
                      ? "bg-[#3d2f26] text-[var(--foreground)]"
                      : "text-[var(--muted)] hover:bg-[var(--panel-soft)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <Icon className="size-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
