"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { company } from "@/data/company";
import { navLinks } from "@/data/nav";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { ArrowRight, Close, Mail, Phone } from "@/components/ui/icons";
import { easeBrand } from "@/lib/motion";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    // Move focus into the panel so keyboard users are not left behind the overlay.
    panelRef.current?.querySelector<HTMLElement>("button, a")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const duration = reduceMotion ? 0 : 0.4;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-100 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration * 0.6 }}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-navy-950/60 backdrop-blur-sm"
            tabIndex={-1}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-2xl"
            initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration, ease: easeBrand }}
          >
            <div className="flex h-18 shrink-0 items-center justify-between border-b border-sand-200 px-5">
              <Link href="/" onClick={onClose} aria-label={`${company.name} home`}>
                <Logo />
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex size-11 items-center justify-center rounded-[3px] border border-sand-200 text-navy-900 transition-colors hover:bg-sand-50"
              >
                <Close className="size-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto overscroll-contain px-5 py-6">
              <ul className="flex flex-col">
                {navLinks.map((link, index) => {
                  const active =
                    pathname === link.href || pathname.startsWith(`${link.href}/`);
                  return (
                    <motion.li
                      key={link.href}
                      initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + index * 0.05, duration, ease: easeBrand }}
                      className="border-b border-sand-100 last:border-0"
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="flex items-center justify-between py-4 text-xl font-semibold tracking-tight text-navy-900"
                      >
                        <span className={active ? "text-brand-600" : undefined}>{link.label}</span>
                        <ArrowRight className="size-4 text-ink-muted" />
                      </Link>

                      {link.children ? (
                        <ul className="mb-4 flex flex-col gap-1 border-l border-sand-200 pl-4">
                          {link.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className="block py-2 text-sm text-ink-muted transition-colors hover:text-brand-600"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="shrink-0 space-y-3 border-t border-sand-200 bg-sand-50 px-5 py-5">
              <a
                href={`tel:${company.phones[1].tel}`}
                className="flex items-center gap-3 text-sm font-medium text-navy-900"
              >
                <Phone className="size-4 text-brand-600" />
                {company.phones[1].value}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-3 text-sm font-medium break-all text-navy-900"
              >
                <Mail className="size-4 text-brand-600" />
                {company.email}
              </a>
              <ButtonLink href="/contact" onClick={onClose} fullWidth withArrow variant="accent">
                Talk to an expert
              </ButtonLink>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
