import { adminCredentials } from "@/lib/admin-auth";
import { getFirebaseRestConfig, isFirebaseConfigured } from "@/lib/firebase";
import type { Inquiry, PageView } from "@/lib/site-store";

type FirestoreValue = { stringValue?: string };
type FirestoreDocument = {
  name?: string;
  fields?: Record<string, FirestoreValue>;
};

let cachedToken: { value: string; expiresAt: number } | null = null;

function collectionUrl(collection: string) {
  const { projectId } = getFirebaseRestConfig();
  return `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collection}`;
}

function fieldString(value: string): FirestoreValue {
  return { stringValue: value };
}

function readString(fields: Record<string, FirestoreValue> | undefined, key: string) {
  return fields?.[key]?.stringValue ?? "";
}

function documentId(name: string) {
  return name.split("/").pop() ?? "";
}

function documentToInquiry(doc: FirestoreDocument): Inquiry | null {
  if (!doc.name || !doc.fields) return null;
  const id = documentId(doc.name);
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

function documentToPageView(doc: FirestoreDocument): PageView | null {
  if (!doc.name || !doc.fields) return null;
  const id = documentId(doc.name);
  if (!id) return null;
  return {
    id,
    path: readString(doc.fields, "path"),
    referrer: readString(doc.fields, "referrer"),
    createdAt: readString(doc.fields, "createdAt") || new Date().toISOString(),
  };
}

async function identityRequest(path: string, body: Record<string, string | boolean>) {
  const { apiKey } = getFirebaseRestConfig();
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/${path}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await response.json()) as { idToken?: string; expiresIn?: string; error?: { message?: string } };
  if (!response.ok || !data.idToken) {
    throw new Error(data.error?.message ?? `Auth request failed (${response.status})`);
  }
  return { idToken: data.idToken, expiresIn: data.expiresIn };
}

async function getAdminIdToken() {
  if (!isFirebaseConfigured) return null;
  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) return cachedToken.value;

  const email = adminCredentials.email.trim();
  const password = adminCredentials.password;

  try {
    let data: { idToken: string; expiresIn?: string };
    try {
      data = await identityRequest("accounts:signInWithPassword", {
        email,
        password,
        returnSecureToken: true,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (
        message.includes("EMAIL_NOT_FOUND") ||
        message.includes("INVALID_LOGIN_CREDENTIALS") ||
        message.includes("INVALID_PASSWORD")
      ) {
        try {
          data = await identityRequest("accounts:signUp", {
            email,
            password,
            returnSecureToken: true,
          });
        } catch {
          data = await identityRequest("accounts:signUp", { returnSecureToken: true });
        }
      } else if (message.includes("OPERATION_NOT_ALLOWED") || message.includes("ADMIN_ONLY_OPERATION")) {
        data = await identityRequest("accounts:signUp", { returnSecureToken: true });
      } else {
        throw error;
      }
    }
    const expiresInMs = Number(data.expiresIn ?? "3600") * 1000;
    cachedToken = { value: data.idToken, expiresAt: Date.now() + expiresInMs };
    return cachedToken.value;
  } catch (error) {
    console.error("Firebase Auth for admin Firestore access failed", error);
    return null;
  }
}

async function firestoreGet(url: string) {
  const token = await getAdminIdToken();
  if (!token) {
    throw new Error("No Firebase ID token for Firestore read");
  }
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = (await response.json()) as {
    documents?: FirestoreDocument[];
    error?: { message?: string; status?: string };
  };
  if (!response.ok) {
    throw new Error(data.error?.message ?? `Firestore read failed (${response.status})`);
  }
  return data.documents ?? [];
}

async function firestoreCreate(collection: string, fields: Record<string, FirestoreValue>) {
  const { apiKey } = getFirebaseRestConfig();
  const response = await fetch(`${collectionUrl(collection)}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  });
  const data = (await response.json()) as FirestoreDocument & { error?: { message?: string } };
  if (!response.ok) {
    throw new Error(data.error?.message ?? `Firestore create failed (${response.status})`);
  }
  return data;
}

export async function createInquiryDocument(inquiry: Inquiry) {
  const data = await firestoreCreate("inquiries", {
    name: fieldString(inquiry.name),
    company: fieldString(inquiry.company),
    email: fieldString(inquiry.email),
    phone: fieldString(inquiry.phone),
    location: fieldString(inquiry.location),
    requirement: fieldString(inquiry.requirement),
    message: fieldString(inquiry.message),
    source: fieldString(inquiry.source),
    createdAt: fieldString(inquiry.createdAt),
  });
  return documentToInquiry(data) ?? inquiry;
}

export async function listInquiryDocuments(): Promise<Inquiry[]> {
  try {
    const documents = await firestoreGet(`${collectionUrl("inquiries")}?pageSize=200`);
    return documents
      .map(documentToInquiry)
      .filter((item): item is Inquiry => Boolean(item))
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  } catch (error) {
    console.error("Firestore enquiry list failed", error);
    return [];
  }
}

export async function updateInquiryStatus(id: string, status: Inquiry["status"]) {
  const token = await getAdminIdToken();
  if (!token) return null;
  const response = await fetch(`${collectionUrl("inquiries")}/${encodeURIComponent(id)}?updateMask.fieldPaths=status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      fields: { status: fieldString(status) },
    }),
  });
  const data = (await response.json()) as FirestoreDocument;
  if (!response.ok) return null;
  return documentToInquiry(data);
}

export async function createPageViewDocument(view: PageView) {
  await firestoreCreate("pageViews", {
    path: fieldString(view.path),
    referrer: fieldString(view.referrer),
    createdAt: fieldString(view.createdAt),
  });
  return view;
}

export async function listPageViewDocuments(): Promise<PageView[]> {
  try {
    const documents = await firestoreGet(`${collectionUrl("pageViews")}?pageSize=1000`);
    return documents
      .map(documentToPageView)
      .filter((item): item is PageView => Boolean(item))
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  } catch (error) {
    console.error("Firestore page-view list failed", error);
    return [];
  }
}
