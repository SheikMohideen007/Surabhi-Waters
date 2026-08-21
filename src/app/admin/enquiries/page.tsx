import { AdminShell } from "@/components/admin/AdminShell";
import { EnquiryList } from "@/components/admin/EnquiryList";
import { listInquiries } from "@/lib/site-store";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  const inquiries = await listInquiries();

  return (
    <AdminShell>
      <div className="mb-8">
        <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-brand-600 uppercase">
          Inbox
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-navy-900">Enquiries</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
          Messages submitted through the website contact form. Opening a new enquiry marks it as
          read.
        </p>
      </div>
      <EnquiryList initial={inquiries} />
    </AdminShell>
  );
}
