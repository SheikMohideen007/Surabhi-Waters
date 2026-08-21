import { NextResponse } from "next/server";
import { saveInquiry } from "@/lib/site-store";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, string>;

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const requirement = (body.requirement ?? "").trim();
  const message = (body.message ?? "").trim();
  const company = body.company ?? "";
  const location = body.location ?? "";

  if (name.length < 2 || !emailPattern.test(email) || phone.length < 7 || !requirement || message.length < 15) {
    return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
  }

  try {
    const inquiry = await saveInquiry({
      name,
      company,
      email,
      phone,
      location,
      requirement,
      message,
      source: "website-contact-form",
    });
    return NextResponse.json({ ok: true, id: inquiry.id });
  } catch (error) {
    console.error("Enquiry submit failed", error);
    return NextResponse.json({ error: "Could not save enquiry." }, { status: 500 });
  }
}
