import type { DashboardStats } from "@/lib/site-store";

function formatDay(isoDate: string) {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export function AnalyticsDashboard({ stats }: { stats: DashboardStats }) {
  const maxTraffic = Math.max(1, ...stats.trafficByDay.map((day) => Math.max(day.views, day.inquiries)));
  const maxPage = Math.max(1, ...stats.topPages.map((page) => page.views));
  const maxReq = Math.max(1, ...stats.requirementBreakdown.map((item) => item.count));

  const cards = [
    { label: "Page views today", value: stats.pageViewsToday },
    { label: "Page views this week", value: stats.pageViewsThisWeek },
    { label: "Total page views", value: stats.totalPageViews },
    { label: "New enquiries", value: stats.newInquiries },
    { label: "Enquiries this week", value: stats.inquiriesThisWeek },
    { label: "Total enquiries", value: stats.totalInquiries },
  ];

  return (
    <div className="space-y-8">
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <li key={card.label} className="rounded-[4px] border border-sand-200 bg-white p-5">
            <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-brand-600 uppercase">
              {card.label}
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-navy-900">{card.value}</p>
          </li>
        ))}
      </ul>

      <section className="rounded-[4px] border border-sand-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-navy-900">Traffic — last 14 days</h2>
        <p className="mt-1 text-sm text-ink-muted">Page views and enquiries recorded from this website.</p>
        <div className="mt-8 flex h-48 items-end gap-2">
          {stats.trafficByDay.map((day) => (
            <div key={day.date} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div className="flex h-36 w-full items-end justify-center gap-0.5">
                <span
                  className="w-1/2 rounded-t-[2px] bg-navy-900"
                  style={{ height: `${Math.max(4, (day.views / maxTraffic) * 100)}%` }}
                  title={`${day.views} views`}
                />
                <span
                  className="w-1/2 rounded-t-[2px] bg-brand-500"
                  style={{ height: `${Math.max(4, (day.inquiries / maxTraffic) * 100)}%` }}
                  title={`${day.inquiries} enquiries`}
                />
              </div>
              <span className="text-[0.65rem] text-ink-muted">{formatDay(day.date)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-6 text-xs text-ink-muted">
          <span className="flex items-center gap-2">
            <span className="size-2.5 bg-navy-900" /> Page views
          </span>
          <span className="flex items-center gap-2">
            <span className="size-2.5 bg-brand-500" /> Enquiries
          </span>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-[4px] border border-sand-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-navy-900">Top pages</h2>
          {stats.topPages.length ? (
            <ul className="mt-5 space-y-3">
              {stats.topPages.map((page) => (
                <li key={page.path}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate font-medium text-navy-900">{page.path}</span>
                    <span className="text-ink-muted">{page.views}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-sand-100">
                    <div
                      className="h-full bg-brand-500"
                      style={{ width: `${(page.views / maxPage) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm text-ink-muted">No page views recorded yet.</p>
          )}
        </section>

        <section className="rounded-[4px] border border-sand-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-navy-900">Enquiry types</h2>
          {stats.requirementBreakdown.length ? (
            <ul className="mt-5 space-y-3">
              {stats.requirementBreakdown.map((item) => (
                <li key={item.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate font-medium text-navy-900">{item.label}</span>
                    <span className="text-ink-muted">{item.count}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-sand-100">
                    <div
                      className="h-full bg-navy-900"
                      style={{ width: `${(item.count / maxReq) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm text-ink-muted">No enquiries yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}
