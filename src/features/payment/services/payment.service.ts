import { prisma } from "@/lib/prisma";
import {
  InvoiceStatus,
  PaymentMethod,
} from "@prisma/client";

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
  return prisma.$transaction(async (tx) => {
    const invoice = await tx.invoice.findUnique({
      where: {
        id: data.invoiceId,
      },
    });

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    await tx.payment.create({
      data: {
        invoiceId: data.invoiceId,
        amount: data.amount,
        paymentDate: data.paymentDate,
        paymentMethod: data.paymentMethod,
        referenceNo: data.referenceNo,
        remarks: data.remarks,
      },
    });

    const paidAmount =
      invoice.paidAmount + data.amount;

    const balance =
      invoice.amount - paidAmount;

    let status: InvoiceStatus =
      InvoiceStatus.PENDING;

    if (balance <= 0) {
      status = InvoiceStatus.PAID;
    } else if (paidAmount > 0) {
      status = InvoiceStatus.PARTIAL;
    }

    await tx.invoice.update({
      where: {
        id: invoice.id,
      },
      data: {
        paidAmount,
        balance,
        status,
      },
    });
  });
}