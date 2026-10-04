"use server";

import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db/client";
import { adminUsers } from "@/db/schema";
import { createSessionValue, sessionCookie, verifyPassword } from "@/lib/session";

export type LoginState = { error?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  const rows = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
  const user = rows[0];
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { error: "Email atau kata sandi salah." };
  }

  const store = await cookies();
  store.set(sessionCookie.name, createSessionValue(user.email), sessionCookie.options);
  redirect("/admin");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(sessionCookie.name);
  redirect("/admin/login");
}
