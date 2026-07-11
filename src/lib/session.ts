"use server";

import { cookies } from "next/headers";

const SESSION_NAME = "rentpro_session";

export async function createSession(user: {
  id: string;
  name: string;
  email: string;
  role: string;
}) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_NAME, JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
  });
}

export async function getSession() {
  const cookieStore = await cookies();

  const session =
    cookieStore.get(SESSION_NAME);

  if (!session) return null;

  return JSON.parse(session.value);
}

export async function destroySession() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_NAME);
}