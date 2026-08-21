import { adminCredentials } from "@/lib/admin-auth";
import { getFirebaseRestConfig, isFirebaseConfigured } from "@/lib/firebase";
import type { Inquiry } from "@/lib/site-store";

type FirestoreValue = { stringValue?: string };
type FirestoreDocument = {
  name?: string;
  fields?: Record<string, FirestoreValue>;
};

let cachedToken: { value: string; expiresAt: number } | null = null;

function documentsUrl() {
  const { projectId } = getFirebaseRestConfig();
  return `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/inquiries`;
}

function fieldString(value: string): FirestoreValue {
  return { stringValue: value };
}

function readString(fields: Record<string, FirestoreValue> | undefined, key: string) {
  return fields?.[key]?.stringValue ?? "";
}

function documentToInquiry(doc: FirestoreDocument): Inquiry | null {
  if (!doc.name || !doc.fields) return null;
  const id = doc.name.split("/").pop();
  if (!id) return null;
  const status = readString(doc.fields, "status");
  return {
    id,
    name: readString(doc.fields, "name"),
    company: readString(doc.fields, "company"),
    email: readString(doc.fields, "email"),
    phone: readString(doc.fields, "phone"),
    location: readString(doc.fields, "location"),
    requirement: readString(doc.fields, "requirement"),
    message: readString(doc.fields, "message"),
    source: readString(doc.fields, "source") || "website-contact-form",
    createdAt: readString(doc.fields, "createdAt") || new Date().toISOString(),
    status: status === "read" ? "read" : "new",
  };
}

async function identityRequest(path: string, body: Record<string, string | boolean>) {
  const { apiKey } = getFirebaseRestConfig();
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/${path}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await response.json()) as { idToken?: string; expiresIn?: string; error?: { message?: string } };
  if (!response.ok || !data.idToken) {
    throw new Error(data.error?.message ?? `Auth request failed (${response.status})`);
  }
  return data;
}

async function getAdminIdToken() {
  if (!isFirebaseConfigured) return null;
  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) return cachedToken.value;

  const credentials = {
    email: adminCredentials.email,
    password: adminCredentials.password,
    returnSecureToken: true,
  };

  try {
    let data: { idToken: string; expiresIn?: string };
    try {
      data = await identityRequest("accounts:signInWithPassword", credentials);
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (!message.includes("EMAIL_NOT_FOUND")) throw error;
      data = await identityRequest("accounts:signUp", credentials);
    }
    const expiresInMs = Number(data.expiresIn ?? "3600") * 1000;
    cachedToken = { value: data.idToken, expiresAt: Date.now() + expiresInMs };
    return cachedToken.value;
  } catch (error) {
    console.error("Firebase Auth for admin Firestore access failed", error);
    return null;
  }
}

export async function createInquiryDocument(inquiry: Inquiry) {
  const { apiKey } = getFirebaseRestConfig();
  const response = await fetch(`${documentsUrl()}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: {
        name: fieldString(inquiry.name),
        company: fieldString(inquiry.company),
        email: fieldString(inquiry.email),
        phone: fieldString(inquiry.phone),
        location: fieldString(inquiry.location),
        requirement: fieldString(inquiry.requirement),
        message: fieldString(inquiry.message),
        source: fieldString(inquiry.source),
        createdAt: fieldString(inquiry.createdAt),
      },
    }),
  });

  const data = (await response.json()) as FirestoreDocument & { error?: { message?: string } };
  if (!response.ok) {
    throw new Error(data.error?.message ?? `Firestore create failed (${response.status})`);
  }
  const saved = documentToInquiry(data);
  return saved ?? inquiry;
}

export async function listInquiryDocuments(): Promise<Inquiry[]> {
  const token = await getAdminIdToken();
  const { apiKey } = getFirebaseRestConfig();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${documentsUrl()}?key=${apiKey}&pageSize=200`, { headers });
  const data = (await response.json()) as { documents?: FirestoreDocument[]; error?: { message?: string } };
  if (!response.ok) {
    console.error("Firestore list failed", data.error?.message ?? response.status);
    return [];
  }
  return (data.documents ?? [])
    .map(documentToInquiry)
    .filter((item): item is Inquiry => Boolean(item))
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export async function updateInquiryStatus(id: string, status: Inquiry["status"]) {
  const token = await getAdminIdToken();
  if (!token) return null;
  const { apiKey } = getFirebaseRestConfig();
  const response = await fetch(
    `${documentsUrl()}/${encodeURIComponent(id)}?key=${apiKey}&updateMask.fieldPaths=status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fields: { status: fieldString(status) },
      }),
    },
  );
  const data = (await response.json()) as FirestoreDocument;
  if (!response.ok) return null;
  return documentToInquiry(data);
}
