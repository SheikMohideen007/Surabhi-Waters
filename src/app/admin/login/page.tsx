import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-navy-950 px-5 py-16">
      <div className="w-full max-w-md rounded-[4px] bg-white p-8 shadow-lift sm:p-10">
        <Logo />
        <p className="mt-8 text-[0.6875rem] font-semibold tracking-[0.18em] text-brand-600 uppercase">
          Admin
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-navy-900">
          Sign in to the control room
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Enquiries and website analytics are only visible after sign-in.
        </p>
        <Suspense>
          <AdminLoginForm />
        </Suspense>
      </div>
    </main>
  );
}
