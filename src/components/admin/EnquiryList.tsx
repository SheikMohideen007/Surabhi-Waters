"use client";

import { useMemo, useState } from "react";
import type { Inquiry } from "@/lib/site-store";
import { cn } from "@/lib/utils";

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function EnquiryList({ initial }: { initial: Inquiry[] }) {
  const [items, setItems] = useState(initial);
  const [openId, setOpenId] = useState<string | null>(initial[0]?.id ?? null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      [item.name, item.email, item.company, item.requirement, item.message, item.phone, item.location]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [items, query]);

  const markRead = async (id: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: "read" } : item)));
    await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  };

  if (!items.length) {
    return (
      <p className="rounded-[4px] border border-sand-200 bg-white p-8 text-sm text-ink-muted">
        No enquiries yet. New messages from the contact form will appear here.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search name, email, requirement…"
        className="h-12 w-full max-w-md rounded-[3px] border border-sand-200 bg-white px-4 text-sm focus:border-brand-500 focus:outline-none"
      />

      <ul className="divide-y divide-sand-200 overflow-hidden rounded-[4px] border border-sand-200 bg-white">
        {filtered.map((item) => {
          const open = openId === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  setOpenId(open ? null : item.id);
                  if (item.status === "new") void markRead(item.id);
                }}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left hover:bg-sand-50"
              >
                <span>
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-navy-900">{item.name}</span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide uppercase",
                        item.status === "new" ? "bg-brand-100 text-brand-700" : "bg-sand-100 text-ink-muted",
                      )}
                    >
                      {item.status}
                    </span>
                  </span>
                  <span className="mt-1 block text-sm text-ink-muted">
                    {item.requirement} · {item.email}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-ink-muted">{formatWhen(item.createdAt)}</span>
              </button>
              {open ? (
                <div className="border-t border-sand-100 bg-sand-50 px-5 py-5 text-sm">
                  <dl className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <dt className="text-xs text-ink-muted">Phone</dt>
                      <dd className="font-medium text-navy-900">
                        <a href={`tel:${item.phone}`} className="hover:text-brand-600">
                          {item.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-ink-muted">Company</dt>
                      <dd className="font-medium text-navy-900">{item.company || "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-ink-muted">Location</dt>
                      <dd className="font-medium text-navy-900">{item.location || "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-ink-muted">Email</dt>
                      <dd className="font-medium break-all text-navy-900">
                        <a href={`mailto:${item.email}`} className="hover:text-brand-600">
                          {item.email}
                        </a>
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-4 whitespace-pre-wrap leading-relaxed text-navy-800">{item.message}</p>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
