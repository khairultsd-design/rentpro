"use server";

import { revalidatePath } from "next/cache";
import { generateMonthlyInvoices } from "../services/monthly-invoice.service";

export async function generateInvoicesAction() {
  const result = await generateMonthlyInvoices();

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/invoices");

  return result;
}