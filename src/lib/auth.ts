import { redirect } from "next/navigation";
import { getSession } from "./session";

export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}

export async function requireRole(
  roles: string[]
) {
  const session = await requireAuth();

  if (!roles.includes(session.role)) {
    redirect("/403");
  }

  return session;
}