"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createExpense as createExpenseService,
  deleteExpense as deleteExpenseService,
  updateExpense as updateExpenseService,
} from "../services/expense.service";
import { requireManager } from "@/lib/auth";

export async function createExpense(
  formData: FormData
) {
  await requireManager();
  await createExpenseService({
    propertyId: String(formData.get("propertyId")),
    title: String(formData.get("title")),
    category: formData.get("category") as any,
    amount: Number(formData.get("amount")),
    expenseDate: new Date(
      String(formData.get("expenseDate"))
    ),
    remarks: String(formData.get("remarks") || ""),
  });

  revalidatePath("/expense");
  redirect("/expense");
}

export async function deleteExpense(id: string) {
  await deleteExpenseService(id);
await requireManager();
  revalidatePath("/expense");
}

export async function updateExpense(
  id: string,
  formData: FormData
) {
  await requireManager();
  await updateExpenseService(id, {
    propertyId: String(formData.get("propertyId")),
    title: String(formData.get("title")),
    category: formData.get("category") as any,
    amount: Number(formData.get("amount")),
    expenseDate: new Date(
      String(formData.get("expenseDate"))
    ),
    remarks: String(formData.get("remarks") || ""),
  });

  revalidatePath("/expense");
  redirect("/expense");
}