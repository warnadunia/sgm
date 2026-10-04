import crypto from "crypto";

/** ID unik URL-safe (16 byte → base64url), dipakai semua tabel. */
export function createId() {
  return crypto.randomBytes(16).toString("base64url");
}
