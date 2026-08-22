import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { isFirebaseConfigured } from "@/lib/firebase";
import {
  createInquiryDocument,
  createPageViewDocument,
  listInquiryDocuments,
  listPageViewDocuments,
  updateInquiryStatus,
} from "@/lib/firestore-rest";

export type Inquiry = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  requirement: string;
  message: string;
  source: string;
  createdAt: string;
  status: "new" | "read";
};

export type PageView = {
  id: string;
  path: string;
  referrer: string;
  createdAt: string;
};

type StoreFile = {
  inquiries: Inquiry[];
  pageViews: PageView[];
};

const FILE = path.join(process.cwd(), ".data", "site-store.json");
const MAX_PAGE_VIEWS = 5000;

let queue: Promise<unknown> = Promise.resolve();

function enqueue<T>(work: () => Promise<T>) {
  const run = queue.then(work, work);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function readStore(): Promise<StoreFile> {
  try {
    const raw = await readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<StoreFile>;
    return {
      inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : [],
      pageViews: Array.isArray(parsed.pageViews) ? parsed.pageViews : [],
    };
  } catch {
    return { inquiries: [], pageViews: [] };
  }
}

async function writeStore(store: StoreFile) {
  try {
    await mkdir(path.dirname(FILE), { recursive: true });
    await writeFile(FILE, JSON.stringify(store, null, 2), "utf8");
  } catch (error) {
    console.error("Local site-store write skipped", error);
  }
}

function buildInquiry(
  input: Omit<Inquiry, "id" | "createdAt" | "status" | "source"> & { source?: string },
): Inquiry {
  return {
    id: randomUUID(),
    name: input.name.trim(),
    company: input.company.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    location: input.location.trim(),
    requirement: input.requirement.trim(),
    message: input.message.trim(),
    source: input.source ?? "website-contact-form",
    createdAt: new Date().toISOString(),
    status: "new",
  };
}

export function saveInquiry(input: Omit<Inquiry, "id" | "createdAt" | "status" | "source"> & { source?: string }) {
  return enqueue(async () => {
    const inquiry = buildInquiry(input);
    if (isFirebaseConfigured) {
      return createInquiryDocument(inquiry);
    }
    const store = await readStore();
    store.inquiries.unshift(inquiry);
    await writeStore(store);
    return inquiry;
  });
}

export function listInquiries() {
  return enqueue(async () => {
    if (isFirebaseConfigured) {
      return listInquiryDocuments();
    }
    const store = await readStore();
    return store.inquiries;
  });
}

export function markInquiryRead(id: string) {
  return enqueue(async () => {
    if (isFirebaseConfigured) {
      return updateInquiryStatus(id, "read");
    }
    const store = await readStore();
    const inquiry = store.inquiries.find((item) => item.id === id);
    if (inquiry) inquiry.status = "read";
    await writeStore(store);
    return inquiry ?? null;
  });
}

export function savePageView(pathName: string, referrer: string) {
  if (pathName.startsWith("/admin") || pathName.startsWith("/api")) return Promise.resolve(null);

  return enqueue(async () => {
    const view: PageView = {
      id: randomUUID(),
      path: pathName,
      referrer,
      createdAt: new Date().toISOString(),
    };
    if (isFirebaseConfigured) {
      return createPageViewDocument(view);
    }
    const store = await readStore();
    store.pageViews.unshift(view);
    if (store.pageViews.length > MAX_PAGE_VIEWS) {
      store.pageViews.length = MAX_PAGE_VIEWS;
    }
    await writeStore(store);
    return view;
  });
}

export type DashboardStats = {
  totalInquiries: number;
  newInquiries: number;
  inquiriesThisWeek: number;
  totalPageViews: number;
  pageViewsToday: number;
  pageViewsThisWeek: number;
  topPages: { path: string; views: number }[];
  requirementBreakdown: { label: string; count: number }[];
  trafficByDay: { date: string; views: number; inquiries: number }[];
  recentInquiries: Inquiry[];
};

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function getDashboardStats(): Promise<DashboardStats> {
  return enqueue(async () => {
    const store = isFirebaseConfigured
      ? {
          inquiries: await listInquiryDocuments(),
          pageViews: await listPageViewDocuments(),
        }
      : await readStore();
    const now = Date.now();
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
    const today = startOfDay(new Date());

    const pageCounts = new Map<string, number>();
    for (const view of store.pageViews) {
      pageCounts.set(view.path, (pageCounts.get(view.path) ?? 0) + 1);
    }

    const requirementCounts = new Map<string, number>();
    for (const inquiry of store.inquiries) {
      const label = inquiry.requirement || "Other";
      requirementCounts.set(label, (requirementCounts.get(label) ?? 0) + 1);
    }

    const trafficByDay = Array.from({ length: 14 }, (_, index) => {
      const day = new Date();
      day.setHours(0, 0, 0, 0);
      day.setDate(day.getDate() - (13 - index));
      const start = day.getTime();
      const end = start + 24 * 60 * 60 * 1000;
      return {
        date: day.toISOString().slice(0, 10),
        views: store.pageViews.filter((item) => {
          const t = Date.parse(item.createdAt);
          return t >= start && t < end;
        }).length,
        inquiries: store.inquiries.filter((item) => {
          const t = Date.parse(item.createdAt);
          return t >= start && t < end;
        }).length,
      };
    });

    return {
      totalInquiries: store.inquiries.length,
      newInquiries: store.inquiries.filter((item) => item.status === "new").length,
      inquiriesThisWeek: store.inquiries.filter((item) => Date.parse(item.createdAt) >= weekAgo).length,
      totalPageViews: store.pageViews.length,
      pageViewsToday: store.pageViews.filter((item) => Date.parse(item.createdAt) >= today).length,
      pageViewsThisWeek: store.pageViews.filter((item) => Date.parse(item.createdAt) >= weekAgo).length,
      topPages: [...pageCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([pathName, views]) => ({ path: pathName, views })),
      requirementBreakdown: [...requirementCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([label, count]) => ({ label, count })),
      trafficByDay,
      recentInquiries: store.inquiries.slice(0, 6),
    };
  });
}
