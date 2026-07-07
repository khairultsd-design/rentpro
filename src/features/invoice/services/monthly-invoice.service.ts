import { prisma } from "@/lib/prisma";
import { createInvoice } from "./invoice.service";

export async function generateMonthlyInvoices() {
  const today = new Date();

  const billingMonth = today.getMonth() + 1;
  const billingYear = today.getFullYear();

  const activeTenancies = await prisma.tenancy.findMany({
    where: {
      status: "ACTIVE",
    },
  });

  let created = 0;
  let skipped = 0;

  for (const tenancy of activeTenancies) {
    const existingInvoice =
      await prisma.invoice.findFirst({
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
      dueDate: new Date(
        billingYear,
        billingMonth - 1,
        5
      ),
    });

    created++;
  }

  return {
    created,
    skipped,
  };
}