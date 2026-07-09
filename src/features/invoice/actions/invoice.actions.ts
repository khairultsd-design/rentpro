"use server";

import { revalidatePath } from "next/cache";
import { generateMonthlyInvoices } from "../services/monthly-invoice.service";

export async function generateInvoicesAction() {
  await generateMonthlyInvoices();

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/invoices");
}