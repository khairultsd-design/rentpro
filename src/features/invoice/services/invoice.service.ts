import { prisma } from "@/lib/prisma";
import { InvoiceStatus } from "@prisma/client";

export async function generateInvoiceNumber() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  const prefix = `INV-${year}${month}`;

  const latestInvoice = await prisma.invoice.findFirst({
    where: {
      invoiceNumber: {
        startsWith: prefix,
      },
    },
    orderBy: {
      invoiceNumber: "desc",
    },
  });

  let runningNumber = 1;

  if (latestInvoice) {
    const lastNumber = Number(
      latestInvoice.invoiceNumber.split("-")[2]
    );

    runningNumber = lastNumber + 1;
  }

  return `${prefix}-${String(runningNumber).padStart(4, "0")}`;
}

type CreateInvoiceInput = {
  tenancyId: string;
  billingMonth: number;
  billingYear: number;
  amount: number;
  dueDate: Date;
  remarks?: string;
};

export async function createInvoice(
  data: CreateInvoiceInput
) {
  console.log("CREATE INVOICE CALLED");

  const invoiceNumber =
    await generateInvoiceNumber();

  return prisma.invoice.create({
    data: {
      invoiceNumber,
      tenancyId: data.tenancyId,
      billingMonth: data.billingMonth,
      billingYear: data.billingYear,
      amount: data.amount,
      dueDate: data.dueDate,
      remarks: data.remarks,
      status: InvoiceStatus.PENDING,
    },
  });
}

export async function getInvoices() {
  return prisma.invoice.findMany({
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
      payments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getInvoiceById(id: string) {
  return prisma.invoice.findUnique({
    where: {
      id,
    },
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
      payments: true,
    },
  });
}