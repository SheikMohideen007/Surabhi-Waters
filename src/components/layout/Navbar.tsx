"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { company } from "@/data/company";
import { navLinks } from "@/data/nav";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ArrowUpRight, Menu, Phone } from "@/components/ui/icons";
import { easeBrand } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The homepage hero is dark, so the header starts transparent there only.
  const overlayHero = pathname === "/";
  const solid = scrolled || !overlayHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:rounded-[3px] focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-90 transition-[background-color,border-color,box-shadow] duration-500 ease-[var(--ease-brand)]",
          solid
            ? "border-b border-sand-200 bg-white/92 backdrop-blur-md"
            : "border-b border-white/10 bg-transparent",
        )}
      >
        <Container className="flex h-18 items-center justify-between gap-6 lg:h-20">
          <Link
            href="/"
            aria-label={`${company.name} — home`}
            className="shrink-0"
            onFocus={() => setOpenDropdown(null)}
          >
            <Logo tone={solid ? "dark" : "light"} />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                const isOpen = openDropdown === link.href;

                return (
                  <li
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => {
                      cancelClose();
                      if (link.children) setOpenDropdown(link.href);
                    }}
                    onMouseLeave={scheduleClose}
                  >
                    <Link
                      href={link.href}
                      aria-expanded={link.children ? isOpen : undefined}
                      onFocus={() => setOpenDropdown(link.children ? link.href : null)}
                      onClick={() => setOpenDropdown(null)}
                      className={cn(
                        "relative flex items-center gap-1.5 px-3.5 py-2 text-[0.9375rem] font-medium transition-colors",
                        solid
                          ? active
                            ? "text-navy-900"
                            : "text-ink-muted hover:text-navy-900"
                          : active
                            ? "text-white"
                            : "text-white/75 hover:text-white",
                      )}
                    >
                      {link.label}
                      {link.children ? (
                        <svg
                          viewBox="0 0 12 12"
                          className={cn(
                            "size-2.5 transition-transform duration-300",
                            isOpen && "rotate-180",
                          )}
                          aria-hidden
                        >
                          <path
                            d="M2 4.5 6 8.5l4-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : null}
                      {active ? (
                        <span
                          aria-hidden
                          className={cn(
                            "absolute inset-x-3.5 -bottom-px h-0.5",
                            solid ? "bg-brand-500" : "bg-brand-300",
                          )}
                        />
                      ) : null}
                    </Link>

                    <AnimatePresence>
                      {link.children && isOpen ? (
                        <motion.div
                          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                          transition={{ duration: 0.24, ease: easeBrand }}
                          className="absolute top-full left-0 pt-3"
                          onMouseEnter={cancelClose}
                          onMouseLeave={scheduleClose}
                        >
                          <div className="w-[24rem] overflow-hidden rounded-[4px] border border-sand-200 bg-white shadow-lift">
                            <ul className="p-2">
                              {link.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onBlur={scheduleClose}
                                    onClick={() => setOpenDropdown(null)}
                                    className="group/item flex items-start gap-3 rounded-[3px] px-3 py-3 transition-colors hover:bg-sand-50"
                                  >
                                    <span className="mt-1.5 h-px w-4 shrink-0 bg-brand-400 transition-all duration-300 group-hover/item:w-6" />
                                    <span className="min-w-0">
                                      <span className="block text-sm font-semibold text-navy-900">
                                        {child.label}
                                      </span>
                                      <span className="mt-0.5 block text-xs leading-relaxed text-ink-muted">
                                        {child.description}
                                      </span>
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <Link
                              href="/solutions"
                              onClick={() => setOpenDropdown(null)}
                              className="flex items-center justify-between border-t border-sand-200 bg-sand-50 px-5 py-3 text-xs font-semibold tracking-wide text-navy-900 uppercase transition-colors hover:text-brand-600"
                            >
                              All solutions
                              <ArrowUpRight className="size-3.5" />
                            </Link>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${company.phones[1].tel}`}
              className={cn(
                "hidden items-center gap-2 text-sm font-semibold transition-colors xl:flex",
                solid ? "text-navy-900 hover:text-brand-600" : "text-white/85 hover:text-white",
              )}
            >
              <Phone className="size-4" />
              {company.phones[1].value}
            </a>

            <ButtonLink
              href="/contact"
              size="sm"
              variant={solid ? "primary" : "light"}
              className="hidden sm:inline-flex"
              withArrow
            >
              Talk to an expert
            </ButtonLink>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className={cn(
                "flex size-11 items-center justify-center rounded-[3px] border transition-colors lg:hidden",
                solid
                  ? "border-sand-200 text-navy-900 hover:bg-sand-50"
                  : "border-white/25 text-white hover:bg-white/10",
              )}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </>
  );
}
