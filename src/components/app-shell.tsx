"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  CalendarCheck2,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  Library,
  Lock,
  RotateCcw,
  Target,
} from "lucide-react";
import { useSoftReveal } from "@/lib/use-soft-reveal";
import { AuthModal } from "@/components/auth-modal";
import { apiRequest } from "@/lib/api-client";

const navItems = [
  { href: "/", label: "Today", icon: CalendarCheck2 },
  { href: "/learn", label: "Learn", icon: GraduationCap },
  { href: "/review", label: "Review", icon: RotateCcw },
  { href: "/practice", label: "TOEIC Practice", shortLabel: "Practice", icon: FileCheck2 },
  { href: "/library", label: "Library", icon: Library },
  { href: "/progress", label: "Progress", icon: BarChart3 },
];

const mobileNav = navItems.filter((item) => ["/", "/review", "/practice", "/library"].includes(item.href));

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shellRef = useSoftReveal<HTMLDivElement>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = async () => {
    try {
      const data = await apiRequest<{ authenticated: boolean; configured: boolean }>("/api/auth/login");
      setIsAuthenticated(Boolean(data?.authenticated));
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
    const handleAuthSuccess = () => setIsAuthenticated(true);
    window.addEventListener("auth:success", handleAuthSuccess);
    return () => window.removeEventListener("auth:success", handleAuthSuccess);
  }, []);

  const openLoginModal = () => {
    window.dispatchEvent(new CustomEvent("open-auth-modal"));
  };

  return (
    <div ref={shellRef} className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <AuthModal />
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside
          data-reveal
          className="hidden border-r border-[var(--border)] bg-[var(--sidebar)] md:sticky md:top-0 md:flex md:h-screen md:w-64 md:flex-col"
        >
          <div className="px-5 pb-5 pt-6">
            <Link href="/" className="flex items-center gap-3 text-base font-extrabold">
              <span className="grid size-10 place-items-center rounded-[14px] bg-[var(--primary)] text-[var(--primary-ink)] shadow-[var(--shadow-low)]">
                <Target className="size-5" />
              </span>
              <span>
                <span className="block">TOEIC 650</span>
                <span className="mt-0.5 block text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[var(--muted-2)]">
                  Study cabin
                </span>
              </span>
            </Link>
          </div>

          <nav aria-label="Điều hướng chính" className="flex flex-1 flex-col gap-1 px-3">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-[14px] px-3 py-3 text-sm font-bold transition-colors ${
                    isActive
                      ? "bg-[var(--active)] text-[var(--foreground)]"
                      : "text-[var(--muted)] hover:bg-[var(--panel-soft)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <Icon className={`size-4 ${isActive ? "text-[var(--primary)]" : ""}`} />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 space-y-3">
            <button
              type="button"
              onClick={openLoginModal}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[14px] text-xs font-bold transition-colors border ${
                isAuthenticated
                  ? "border-[var(--success)]/30 bg-[rgba(95,118,93,0.08)] text-[var(--success)]"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--primary)]/40"
              }`}
            >
              <span className="flex items-center gap-2">
                {isAuthenticated ? <CheckCircle2 className="size-3.5" /> : <Lock className="size-3.5" />}
                {isAuthenticated ? "Đã xác thực" : "Chưa đăng nhập"}
              </span>
              <span className="text-[0.65rem] underline uppercase font-semibold">
                {isAuthenticated ? "Đổi pass" : "Đăng nhập"}
              </span>
            </button>

            <div className="rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="eyebrow">Target</p>
              <div className="mt-2 flex items-end justify-between">
                <strong className="text-3xl leading-none">650</strong>
                <span className="text-xs text-[var(--muted)]">L&amp;R</span>
              </div>
              <p className="mt-3 text-xs leading-5 text-[var(--muted)]">Logic first. Recall before explanation.</p>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 pb-24 md:pb-0">{children}</main>

        <nav aria-label="Điều hướng di động" className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-[var(--border)] bg-[var(--sidebar)]/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden">
          {mobileNav.map(({ href, label, shortLabel, icon: Icon }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[0.68rem] font-bold ${isActive ? "text-[var(--primary)]" : "text-[var(--muted)]"}`}>
                <Icon className="size-[1.15rem]" />
                <span>{shortLabel ?? label}</span>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={openLoginModal}
            className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[0.68rem] font-bold ${isAuthenticated ? "text-[var(--success)]" : "text-[var(--muted)]"}`}
          >
            {isAuthenticated ? <CheckCircle2 className="size-[1.15rem]" /> : <Lock className="size-[1.15rem]" />}
            <span>{isAuthenticated ? "Đã xác thực" : "Đăng nhập"}</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
