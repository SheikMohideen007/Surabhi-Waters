"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company } from "@/data/company";
import { ArrowRight, Phone } from "@/components/ui/icons";
import { easeBrand } from "@/lib/motion";

/**
 * Small-screen quick actions. Appears only after the visitor has engaged with
 * the page, and never on the contact page where it would be redundant.
 */
export function MobileContactBar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const show = visible && pathname !== "/contact";

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { y: "110%" }}
          animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { y: "110%" }}
          transition={{ duration: 0.4, ease: easeBrand }}
          className="fixed inset-x-0 bottom-0 z-80 border-t border-navy-900/10 bg-white/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md sm:hidden"
        >
          <div className="flex items-center gap-3">
            <a
              href={`tel:${company.phones[1].tel}`}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-[3px] border border-navy-900/15 text-sm font-semibold text-navy-900"
            >
              <Phone className="size-4 text-brand-600" />
              Call
            </a>
            <Link
              href="/contact"
              className="flex h-12 flex-[1.4] items-center justify-center gap-2 rounded-[3px] bg-brand-500 text-sm font-semibold text-white"
            >
              Send an enquiry
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
