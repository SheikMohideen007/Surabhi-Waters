import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import { getDashboardStats } from "@/lib/site-store";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <AdminShell>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-brand-600 uppercase">
            Overview
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-navy-900">
            Analytics dashboard
          </h1>
        </div>
        <Link
          href="/admin/enquiries"
          className="text-sm font-semibold text-brand-600 underline decoration-brand-600/25 underline-offset-4"
        >
          View all enquiries
        </Link>
      </div>
      <AnalyticsDashboard stats={stats} />

      {stats.recentInquiries.length ? (
        <section className="mt-8 rounded-[4px] border border-sand-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-navy-900">Latest enquiries</h2>
          <ul className="mt-5 divide-y divide-sand-100">
            {stats.recentInquiries.map((item) => (
              <li key={item.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-navy-900">{item.name}</p>
                  <p className="text-sm text-ink-muted">
                    {item.requirement} · {item.email}
                  </p>
                </div>
                <p className="text-xs text-ink-muted">
                  {new Date(item.createdAt).toLocaleString("en-IN")}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </AdminShell>
  );
}
