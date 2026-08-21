"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/enquiries", label: "Enquiries" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex min-h-dvh bg-sand-50">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sand-200 bg-navy-950 text-white lg:flex">
        <div className="border-b border-white/10 px-6 py-6">
          <Logo tone="light" />
          <p className="mt-4 text-[0.6875rem] font-semibold tracking-[0.18em] text-brand-300 uppercase">
            Admin
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-[3px] px-3 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/5 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={() => void logout()}
            className="w-full rounded-[3px] px-3 py-2.5 text-left text-sm font-medium text-white/65 transition-colors hover:bg-white/5 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-sand-200 bg-white px-4 py-4 lg:px-8">
          <div className="flex items-center gap-4 lg:hidden">
            <Logo />
            <span className="text-[0.6875rem] font-semibold tracking-[0.18em] text-brand-600 uppercase">
              Admin
            </span>
          </div>
          <nav className="flex gap-2 lg:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-[3px] px-3 py-2 text-sm font-medium",
                  pathname === link.href ? "bg-navy-900 text-white" : "text-navy-900",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="hidden text-sm text-ink-muted lg:block">Surabhi Waters control room</p>
          <button
            type="button"
            onClick={() => void logout()}
            className="text-sm font-semibold text-navy-900 lg:hidden"
          >
            Sign out
          </button>
        </header>
        <div className="flex-1 px-4 py-8 lg:px-10 lg:py-10">{children}</div>
      </div>
    </div>
  );
}
