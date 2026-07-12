"use server";

import { revalidatePath } from "next/cache";
import { UserRole } from "@prisma/client";
import {
  createUser,
  updateUser,
  setUserStatus,
} from "../services/user.service";
import { requireAdmin } from "@/lib/auth";

export async function createUserAction(
  formData: FormData
) {
  await requireAdmin();
  await createUser({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    role: (formData.get("role") as UserRole) ?? UserRole.STAFF,
  });

  revalidatePath("/dashboard/users");
}
export async function updateUserAction(
  id: string,
  formData: FormData
) {
  await requireAdmin();
  await updateUser(id, {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    role: formData.get("role") as UserRole,
  });

  revalidatePath("/dashboard/users");
}
export async function toggleUserStatusAction(
  id: string,
  isActive: boolean
) {
  await requireAdmin();
  await setUserStatus(id, !isActive);

  revalidatePath("/dashboard/users");
}