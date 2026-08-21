export const ADMIN_COOKIE = "sw_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 12;

export const adminCredentials = {
  email: process.env.ADMIN_EMAIL ?? "mohanbabu.admin@surabhiwaters.com",
  password: process.env.ADMIN_PASSWORD ?? "admin@1234",
};

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "surabhi-admin-session-change-in-production";
}

function bytesEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export function verifyAdminCredentials(email: string, password: string) {
  return (
    bytesEqual(email.trim().toLowerCase(), adminCredentials.email.toLowerCase()) &&
    bytesEqual(password, adminCredentials.password)
  );
}

function toHex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function hmac(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(sessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return toHex(signature);
}

export async function createAdminSessionToken() {
  const expires = Date.now() + ADMIN_SESSION_MAX_AGE * 1000;
  const payload = `${adminCredentials.email}|${expires}`;
  const signature = await hmac(payload);
  return `${payload}.${signature}`;
}

export async function isValidAdminSession(token: string | undefined | null) {
  if (!token) return false;
  const lastDot = token.lastIndexOf(".");
  if (lastDot <= 0) return false;
  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);
  const separator = payload.lastIndexOf("|");
  if (separator <= 0) return false;
  const email = payload.slice(0, separator);
  const expires = Number(payload.slice(separator + 1));
  if (!email || !expires || Number.isNaN(expires) || expires < Date.now()) return false;
  if (!bytesEqual(email.toLowerCase(), adminCredentials.email.toLowerCase())) return false;
  const expected = await hmac(payload);
  return bytesEqual(signature, expected);
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  };
}
