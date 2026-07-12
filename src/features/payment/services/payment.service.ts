import { prisma } from "@/lib/prisma";

import {
  InvoiceStatus,
  PaymentMethod,
} from "@prisma/client";

import {
  AuditAction,
  AuditModule,
} from "@/lib/audit";

import { createAuditLog } from "@/features/audit/services/audit-log.service";

type CreatePaymentInput = {
  invoiceId: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: PaymentMethod;
  referenceNo?: string;
  remarks?: string;
};

function generateReceiptNo(sequence: number) {
  const today = new Date();

  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  return `RCPT-${yyyy}${mm}${dd}-${String(sequence).padStart(4, "0")}`;
}

export async function createPayment(
  data: CreatePaymentInput,
  auditUserId: string
) {
  const result = await prisma.$transaction(async (tx) => {
    const invoice = await tx.invoice.findUnique({
      where: {
        id: data.invoiceId,
      },
    });

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    const today = new Date();

    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const todayPaymentCount =
      await tx.payment.count({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

    const receiptNo = generateReceiptNo(
      todayPaymentCount + 1
    );

    const payment = await tx.payment.create({
      data: {
        invoiceId: data.invoiceId,
        receiptNo,
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

    const updatedInvoice =
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

    return {
      payment,
      invoice: updatedInvoice,
    };
  });

  await createAuditLog({
    userId: auditUserId,
    module: AuditModule.PAYMENT,
    action: AuditAction.CREATE,
    description: `Recorded payment ${result.payment.receiptNo} (${result.payment.amount})`,
  });

  return result.payment;
}

export async function recordPayment(
  data: CreatePaymentInput,
  auditUserId: string
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

    

const today = new Date();

const startOfDay = new Date(today);
startOfDay.setHours(0, 0, 0, 0);

const endOfDay = new Date(today);
endOfDay.setHours(23, 59, 59, 999);

const todayPaymentCount = await tx.payment.count({
  where: {
    createdAt: {
      gte: startOfDay,
      lte: endOfDay,
    },
  },
});

const receiptNo = generateReceiptNo(todayPaymentCount + 1);

    const payment = await tx.payment.create({
      data: {
        invoiceId: data.invoiceId,receiptNo,
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
    });return {
  payment,
  invoice,
};
  });
}
export async function getPaymentById(id: string) {
  return prisma.payment.findUnique({
    where: {
      id,
    },
    include: {
      invoice: {
        include: {
          tenancy: {
            include: {
              tenant: true,
              room: {
                include: {
                  property: true,
                },
              },
            },
          },
        },
      },
    },
  });
}
export async function getPayments(
  search?: string
) {
  return prisma.payment.findMany({
    where: search
      ? {
          OR: [
            {
              receiptNo: {
                contains: search,
              },
            },
            {
              invoice: {
                invoiceNumber: {
                  contains: search,
                },
              },
            },
            {
              invoice: {
                tenancy: {
                  tenant: {
                    fullName: {
                      contains: search,
                    },
                  },
                },
              },
            },
            {
              invoice: {
                tenancy: {
                  room: {
                    property: {
                      name: {
                        contains: search,
                      },
                    },
                  },
                },
              },
            },
            {
              invoice: {
                tenancy: {
                  room: {
                    roomNumber: {
                      contains: search,
                    },
                  },
                },
              },
            },
          ],
        }
      : undefined,

    include: {
      invoice: {
        include: {
          tenancy: {
            include: {
              tenant: true,
              room: {
                include: {
                  property: true,
                },
              },
            },
          },
        },
      },
    },

    orderBy: {
      paymentDate: "desc",
    },
  });
}