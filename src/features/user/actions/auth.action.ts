"use server";

import { redirect } from "next/navigation";

import { createSession, destroySession, getSession } from "@/lib/session";

import {
  AuditAction,
  AuditModule,
} from "@/lib/audit";

import {
  createAuditLog,
} from "@/features/audit/services/audit-log.service";

import { loginUser } from "../services/auth.service";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await loginUser(email, password);

  await createSession(user);

  await createAuditLog({
    userId: user.id,
    module: AuditModule.AUTH,
    action: AuditAction.LOGIN,
    description: `${user.name} (${user.email}) logged in`,
  });

  redirect("/dashboard");
}

export async function logoutAction() {
  const user = await getSession();

  if (user) {
    await createAuditLog({
      userId: user.id,
      module: AuditModule.AUTH,
      action: AuditAction.LOGOUT,
      description: `${user.name} (${user.email}) logged out`,
    });
  }

  await destroySession();

  redirect("/login");
}