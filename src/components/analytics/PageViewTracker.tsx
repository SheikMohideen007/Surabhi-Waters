"use client";

import { getAnalytics, isSupported, logEvent, type Analytics } from "firebase/analytics";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { getFirebaseApp, isFirebaseConfigured } from "@/lib/firebase";

let analytics: Analytics | null = null;
let analyticsPromise: Promise<Analytics | null> | null = null;

function loadAnalytics() {
  if (!isFirebaseConfigured) return Promise.resolve(null);
  if (analytics) return Promise.resolve(analytics);
  if (!analyticsPromise) {
    analyticsPromise = isSupported()
      .then((supported) => {
        const app = getFirebaseApp();
        if (!supported || !app) return null;
        analytics = getAnalytics(app);
        return analytics;
      })
      .catch(() => null);
  }
  return analyticsPromise;
}

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

    void loadAnalytics().then((instance) => {
      if (!instance) return;
      logEvent(instance, "page_view", {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    });

    return () => controller.abort();
  }, [pathname]);

  return null;
}
