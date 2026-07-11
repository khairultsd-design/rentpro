"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession } from "@/lib/session";
import { loginUser } from "../services/auth.service";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await loginUser(email, password);

  await createSession(user);

  redirect("/dashboard");
}

export async function logoutAction() {
  await destroySession();

  redirect("/login");
}