import { NextResponse } from "next/server";
import { getFirebaseApp, isFirebaseConfigured } from "@/lib/firebase";
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

  if (isFirebaseConfigured) {
    try {
      const app = getFirebaseApp();
      if (app) {
        const { addDoc, collection, getFirestore } = await import("firebase/firestore");
        await addDoc(collection(getFirestore(app), "inquiries"), {
          name,
          company,
          email,
          phone,
          location,
          requirement,
          message,
          source: "website-contact-form",
          createdAt: inquiry.createdAt,
        });
      }
    } catch (error) {
      console.error("Firestore enquiry write failed", error);
    }
  }

  return NextResponse.json({ ok: true, id: inquiry.id });
}
