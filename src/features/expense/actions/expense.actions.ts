"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createExpense as createExpenseService } from "../services/expense.service";

export async function createExpense(
  formData: FormData
) {
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