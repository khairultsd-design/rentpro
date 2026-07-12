"use server";

import { revalidatePath } from "next/cache";
import { UserRole } from "@prisma/client";

import { requireAdmin } from "@/lib/auth";

import {
  createUser,
  updateUser,
  setUserStatus,
} from "../services/user.service";

export async function createUserAction(
  formData: FormData
) {
  const admin = await requireAdmin();

  await createUser(
    {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role:
        (formData.get("role") as UserRole) ??
        UserRole.STAFF,
    },
    admin.id
  );

  revalidatePath("/dashboard/users");
}

export async function updateUserAction(
  id: string,
  formData: FormData
) {
  const admin = await requireAdmin();

  await updateUser(
    id,
    {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as UserRole,
    },
    admin.id
  );

  revalidatePath("/dashboard/users");
}

export async function toggleUserStatusAction(
  id: string,
  isActive: boolean
) {
  const admin = await requireAdmin();

  await setUserStatus(
    id,
    !isActive,
    admin.id
  );

  revalidatePath("/dashboard/users");
}