import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { getDashboardStats } from "@/lib/site-store";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const stats = await getDashboardStats();
  return NextResponse.json(stats);
}
