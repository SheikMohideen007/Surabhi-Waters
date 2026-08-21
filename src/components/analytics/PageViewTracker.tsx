"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function PageViewTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    const controller = new AbortController();
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer,
      }),
      signal: controller.signal,
      keepalive: true,
    }).catch(() => undefined);

    void import("@/lib/firebase")
      .then(async ({ getFirebaseApp, isFirebaseConfigured }) => {
        if (!isFirebaseConfigured) return;
        const { getAnalytics, isSupported, logEvent } = await import("firebase/analytics");
        const supported = await isSupported();
        const app = getFirebaseApp();
        if (!supported || !app) return;
        logEvent(getAnalytics(app), "page_view", {
          page_path: pathname,
          page_location: window.location.href,
          page_title: document.title,
        });
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, [pathname]);

  return null;
}
