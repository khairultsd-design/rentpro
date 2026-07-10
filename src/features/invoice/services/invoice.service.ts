import { prisma } from "@/lib/prisma";
import {
  Prisma,
  InvoiceStatus,
  TenancyStatus,
} from "@prisma/client";

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
  data: CreateInvoiceInput,
  db: Prisma.TransactionClient | typeof prisma = prisma
) {
  const invoiceNumber = await generateInvoiceNumber();
    
  return db.invoice.create({
    data: {
  invoiceNumber,
  tenancyId: data.tenancyId,
  billingMonth: data.billingMonth,
  billingYear: data.billingYear,
  amount: data.amount,
  paidAmount: 0,
  balance: data.amount,
  dueDate: data.dueDate,
  remarks: data.remarks,
  status: InvoiceStatus.PENDING,
},
  });
}

export async function generateMonthlyInvoices() {
  const now = new Date();

  const billingMonth = now.getMonth() + 1;
  const billingYear = now.getFullYear();

  const dueDate = new Date(billingYear, billingMonth - 1, 7);

  const activeTenancies = await prisma.tenancy.findMany({
    where: {
      status: TenancyStatus.ACTIVE,
    },
  });

  let generated = 0;
  let skipped = 0;

  for (const tenancy of activeTenancies) {
    const existingInvoice = await prisma.invoice.findFirst({
      where: {
        tenancyId: tenancy.id,
        billingMonth,
        billingYear,
      },
    });

    if (existingInvoice) {
      skipped++;
      continue;
    }

    await createInvoice({
      tenancyId: tenancy.id,
      billingMonth,
      billingYear,
      amount: tenancy.monthlyRental,
      dueDate,
      remarks: `Monthly Rental ${billingMonth}/${billingYear}`,
    });

    generated++;
  }

  return {
    generated,
    skipped,
    total: activeTenancies.length,
  };
}

export async function getInvoices(
  search?: string
) {
  return prisma.invoice.findMany({
    where: search
      ? {
          OR: [
            {
              invoiceNumber: {
                contains: search,
              },
            },
            {
              tenancy: {
                tenant: {
                  fullName: {
                    contains: search,
                  },
                },
              },
            },
            {
              tenancy: {
                room: {
                  roomNumber: {
                    contains: search,
                  },
                },
              },
            },
            {
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
          ],
        }
      : undefined,

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