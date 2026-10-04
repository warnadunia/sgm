import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "sgm_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 hari

function getSecret() {
  return process.env.SESSION_SECRET || "sgm-insecure-dev-secret";
}

function sign(payload: string) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function createSessionValue(email: string) {
  const payload = JSON.stringify({ email, exp: Date.now() + MAX_AGE * 1000 });
  const encoded = Buffer.from(payload).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function verifySessionValue(value?: string | null): string | null {
  if (!value) return null;
  const [encoded, sig] = value.split(".");
  if (!encoded || !sig) return null;
  const expected = sign(encoded);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString());
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload.email as string;
  } catch {
    return null;
  }
}

export async function getAdminEmail(): Promise<string | null> {
  const store = await cookies();
  return verifySessionValue(store.get(COOKIE_NAME)?.value);
}

export async function requireAdmin(): Promise<void> {
  const email = await getAdminEmail();
  if (!email) throw new Error("UNAUTHORIZED");
}

export const sessionCookie = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  },
};

// --- password hashing (scrypt, tanpa dependency tambahan) ---
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = crypto.scryptSync(password, salt, 64).toString("hex");
  const a = Buffer.from(candidate, "hex");
  const b = Buffer.from(hash, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
