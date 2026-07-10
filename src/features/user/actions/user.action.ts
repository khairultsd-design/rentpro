"use server";

import { revalidatePath } from "next/cache";
import { UserRole } from "@prisma/client";
import { createUser } from "../services/user.service";

export async function createUserAction(
  formData: FormData
) {
  await createUser({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    role: (formData.get("role") as UserRole) ?? UserRole.STAFF,
  });

  revalidatePath("/dashboard/users");
}