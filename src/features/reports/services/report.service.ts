import { prisma } from "@/lib/prisma";
import { InvoiceStatus } from "@prisma/client";

export async function getFinancialReport(
  month: number,
  year: number
) {
  const startDate = new Date(year, month - 1, 1);

  const endDate = new Date(year, month, 1);

  const [
  income,
  expenses,
  outstanding,
  activeRooms,
  totalRooms,
  payments,
  expenseList,
] = await Promise.all([
    prisma.payment.aggregate({
      where: {
        paymentDate: {
          gte: startDate,
          lt: endDate,
        },
      },
      _sum: {
        amount: true,
      },
    }),

    prisma.expense.aggregate({
      where: {
        expenseDate: {
          gte: startDate,
          lt: endDate,
        },
      },
      _sum: {
        amount: true,
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

    prisma.room.count({
      where: {
        status: "OCCUPIED",
      },
    }),

    prisma.room.count(),

    prisma.payment.findMany({
      where: {
        paymentDate: {
          gte: startDate,
          lt: endDate,
        },
      },
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
      orderBy: {
        paymentDate: "desc",
      },
    }),

    prisma.expense.findMany({
      where: {
        expenseDate: {
          gte: startDate,
          lt: endDate,
        },
      },
      include: {
        property: true,
      },
      orderBy: {
        expenseDate: "desc",
      },
    }),
  ]);

  const totalIncome =
    income._sum.amount ?? 0;

  const totalExpense =
    expenses._sum.amount ?? 0;

  return {
    income: totalIncome,
    expenses: totalExpense,
    profit: totalIncome - totalExpense,
    outstanding:
      outstanding._sum.balance ?? 0,

    occupancy:
      totalRooms === 0
        ? 0
        : Number(
            (
              (activeRooms / totalRooms) *
              100
            ).toFixed(1)
          ),
    payments,
    expensesList: expenseList,
  };
}