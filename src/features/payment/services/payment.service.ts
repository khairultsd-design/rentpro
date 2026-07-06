import { prisma } from "@/lib/prisma";
import { InvoiceStatus, PaymentMethod } from "@prisma/client";

type CreatePaymentInput = {
  invoiceId: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: PaymentMethod;
  referenceNo?: string;
  remarks?: string;
};

export async function createPayment(
  data: CreatePaymentInput
) {
  console.log("CREATE PAYMENT");

  return prisma.payment.create({
    data: {
      invoiceId: data.invoiceId,
      amount: data.amount,
      paymentDate: data.paymentDate,
      paymentMethod: data.paymentMethod,
      referenceNo: data.referenceNo,
      remarks: data.remarks,
    },
  });
}