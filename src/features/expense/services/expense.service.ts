import { prisma } from "@/lib/prisma";
import { ExpenseCategory } from "@prisma/client";

type CreateExpenseInput = {
  propertyId: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  expenseDate: Date;
  remarks?: string;
};

export async function createExpense(
  data: CreateExpenseInput
) {
  return prisma.expense.create({
    data,
  });
}

export async function getExpenses() {
  return prisma.expense.findMany({
    include: {
      property: true,
    },
    orderBy: {
      expenseDate: "desc",
    },
  });
}

export async function getExpenseById(id: string) {
  return prisma.expense.findUnique({
    where: {
      id,
    },
    include: {
      property: true,
    },
  });
}

export async function deleteExpense(id: string) {
  return prisma.expense.delete({
    where: { id },
  });
}

type UpdateExpenseInput = {
  propertyId: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  expenseDate: Date;
  remarks?: string;
};

export async function updateExpense(
  id: string,
  data: UpdateExpenseInput
) {
  return prisma.expense.update({
    where: {
      id,
    },
    data,
  });
}