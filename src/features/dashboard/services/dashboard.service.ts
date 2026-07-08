import { prisma } from "@/lib/prisma";
import { InvoiceStatus, TenancyStatus } from "@prisma/client";

export async function getRecentPayments() {
  return prisma.payment.findMany({
    orderBy: {
      paymentDate: "desc",
    },
    take: 5,
    include: {
      invoice: {
        include: {
          tenancy: {
            include: {
              tenant: true,
              room: true,
            },
          },
        },
      },
    },
  });
}

export async function getRecentExpenses() {
  return prisma.expense.findMany({
    orderBy: {
      expenseDate: "desc",
    },
    take: 5,
    include: {
      property: true,
    },
  });
}

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
    occupancyRate:
  totalRooms === 0
    ? 0
    : Number(
        (
          ((totalRooms - availableRooms) /
            totalRooms) *
          100
        ).toFixed(1)
      ),
      expenseRatio:
  (totalCollection._sum.amount ?? 0) === 0
    ? 0
    : Number(
        (
          ((totalExpenses._sum.amount ?? 0) /
            (totalCollection._sum.amount ?? 0)) *
          100
        ).toFixed(1)
      ),
      collectionRate:
  ((totalCollection._sum.amount ?? 0) +
    (outstandingInvoices._sum.balance ?? 0)) === 0
    ? 0
    : Number(
        (
          ((totalCollection._sum.amount ?? 0) /
            (
              (totalCollection._sum.amount ?? 0) +
              (outstandingInvoices._sum.balance ?? 0)
            )) *
          100
        ).toFixed(1)
      ),
    activeTenants,
    activeTenancies,
    outstanding:outstandingInvoices._sum.balance ?? 0,
    collection:
      totalCollection._sum.amount ?? 0,
    overdueInvoices,
    
    expenses:
      totalExpenses._sum.amount ?? 0,

profit:
  (totalCollection._sum.amount ?? 0) -
  (totalExpenses._sum.amount ?? 0),
  };
}
export async function getRecentOutstandingInvoices() {
  return prisma.invoice.findMany({
    where: {
      status: {
        not: InvoiceStatus.PAID,
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
}
export async function getDashboardData() {
  const [
    stats,
    recentPayments,
    recentExpenses,
    recentOutstandingInvoices,
  ] = await Promise.all([
    getDashboardStats(),
    getRecentPayments(),
    getRecentExpenses(),
    getRecentOutstandingInvoices(),
  ]);

  return {
    stats,
    recentPayments,
    recentExpenses,
    recentOutstandingInvoices,
  };
}