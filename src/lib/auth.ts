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
export async function requireAdmin() {
  return requireRole(["ADMIN"]);
}

export async function requireManager() {
  return requireRole(["ADMIN", "MANAGER"]);
}

export async function requireStaff() {
  return requireRole([
    "ADMIN",
    "MANAGER",
    "STAFF",
  ]);
}