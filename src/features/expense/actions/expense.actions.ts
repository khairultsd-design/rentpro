"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireManager } from "@/lib/auth";

import {
  createExpense as createExpenseService,
  deleteExpense as deleteExpenseService,
  updateExpense as updateExpenseService,
} from "../services/expense.service";

export async function createExpense(
  formData: FormData
) {
  const manager = await requireManager();

  await createExpenseService(
    {
      propertyId: String(formData.get("propertyId")),
      title: String(formData.get("title")),
      category: formData.get("category") as any,
      amount: Number(formData.get("amount")),
      expenseDate: new Date(
        String(formData.get("expenseDate"))
      ),
      remarks: String(formData.get("remarks") || ""),
    },
    manager.id
  );

  revalidatePath("/expense");
  redirect("/expense");
}

export async function deleteExpense(id: string) {
  const manager = await requireManager();

  await deleteExpenseService(
    id,
    manager.id
  );

  revalidatePath("/expense");
}

export async function updateExpense(
  id: string,
  formData: FormData
) {
  const manager = await requireManager();

  await updateExpenseService(
    id,
    {
      propertyId: String(formData.get("propertyId")),
      title: String(formData.get("title")),
      category: formData.get("category") as any,
      amount: Number(formData.get("amount")),
      expenseDate: new Date(
        String(formData.get("expenseDate"))
      ),
      remarks: String(formData.get("remarks") || ""),
    },
    manager.id
  );

  revalidatePath("/expense");
  redirect("/expense");
}