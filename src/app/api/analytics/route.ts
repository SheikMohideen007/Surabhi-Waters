import { NextResponse } from "next/server";
import { savePageView } from "@/lib/site-store";

export async function POST(request: Request) {
  const body = (await request.json()) as { path?: string; referrer?: string };
  const pathName = body.path ?? "";
  if (!pathName.startsWith("/")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }
  await savePageView(pathName, body.referrer ?? "");
  return NextResponse.json({ ok: true });
}
