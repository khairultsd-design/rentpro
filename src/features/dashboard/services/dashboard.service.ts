import { prisma } from "@/lib/prisma";
import { InvoiceStatus, TenancyStatus } from "@prisma/client";

export async function getDashboardStats() {
  const [
    totalProperties,
    totalRooms,
    availableRooms,
    activeTenants,
    activeTenancies,
    outstandingInvoices,
    totalCollection,
    totalExpenses,
    overdueInvoices,
  ] = await Promise.all([
    prisma.property.count(),

    prisma.room.count(),

    prisma.room.count({
      where: {
        status: "AVAILABLE",
      },
    }),

    prisma.tenant.count({
      where: {
        status: "ACTIVE",
      },
    }),

    prisma.tenancy.count({
      where: {
        status: TenancyStatus.ACTIVE,
      },
    }),

    prisma.invoice.aggregate({
      where: {
        status: {
          in: [
            InvoiceStatus.PENDING,
            InvoiceStatus.PARTIAL,
          ],
        },
      },
      _sum: {
        balance: true,
      },
    }),

    prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
    }),

    prisma.expense.aggregate({
  _sum: {
    amount: true,
  },
}),

    prisma.invoice.count({
      where: {
        dueDate: {
          lt: new Date(),
        },
        status: {
          in: [
            InvoiceStatus.PENDING,
            InvoiceStatus.PARTIAL,
          ],
        },
      },
    }),
  ]);

  return {
    totalProperties,
    totalRooms,
    availableRooms,
    occupiedRooms: totalRooms - availableRooms,
    activeTenants,
    activeTenancies,
    outstanding:
      outstandingInvoices._sum.balance ?? 0,
    collection:
      totalCollection._sum.amount ?? 0,
    overdueInvoices,expenses:
  totalExpenses._sum.amount ?? 0,
  outstandingInvoices: outstandingInvoices._sum.balance ?? 0,

profit:
  (totalCollection._sum.amount ?? 0) -
  (totalExpenses._sum.amount ?? 0),
  };
}
const outstandingInvoices =
  await prisma.invoice.findMany({
    where: {
      status: {
        not: "PAID",
      },
    },
    include: {
      tenancy: {
        include: {
          tenant: true,
          room: true,
        },
      },
    },
    orderBy: {
      dueDate: "asc",
    },
    take: 5,
  });