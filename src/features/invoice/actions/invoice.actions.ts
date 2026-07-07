"use server";

import { revalidatePath } from "next/cache";

import { generateMonthlyInvoices } from "../services/monthly-invoice.service";

export async function generateInvoicesAction() {
  console.log("=== Generate Monthly Invoices ===");

  const result = await generateMonthlyInvoices();

  console.log(result);

  revalidatePath("/dashboard/invoices");
}