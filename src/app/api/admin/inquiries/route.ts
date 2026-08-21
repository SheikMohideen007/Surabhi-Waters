import { NextResponse } from "next/server";
import { listInquiries, markInquiryRead } from "@/lib/site-store";
import { requireAdmin } from "@/lib/require-admin";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const inquiries = await listInquiries();
  return NextResponse.json({ inquiries });
}

export async function PATCH(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const body = (await request.json()) as { id?: string };
  if (!body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const inquiry = await markInquiryRead(body.id);
  if (!inquiry) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ inquiry });
}
