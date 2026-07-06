"use server";

import { revalidatePath } from "next/cache";

import { createPayment } from "../services/payment.service";

export async function recordPayment(formData: FormData) {
  console.log("RECORD PAYMENT ACTION");

  await createPayment({
    invoiceId: formData.get("invoiceId") as string,
    amount: Number(formData.get("amount")),
    paymentDate: new Date(
      formData.get("paymentDate") as string
    ),
    paymentMethod: formData.get("paymentMethod") as any,
    referenceNo:
      (formData.get("referenceNo") as string) || undefined,
    remarks:
      (formData.get("remarks") as string) || undefined,
  });

  revalidatePath("/dashboard/invoices");
}