import { prisma } from "@/lib/prisma";
import { ExpenseCategory } from "@prisma/client";

import {
  AuditAction,
  AuditModule,
} from "@/lib/audit";

import { createAuditLog } from "@/features/audit/services/audit-log.service";

type CreateExpenseInput = {
  propertyId: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  expenseDate: Date;
  remarks?: string;
};

export async function createExpense(
  data: CreateExpenseInput,
  auditUserId: string
) {
  const expense = await prisma.expense.create({
    data,
  });

  await createAuditLog({
    userId: auditUserId,
    module: AuditModule.EXPENSE,
    action: AuditAction.CREATE,
    description: `Created expense "${expense.title}"`,
  });

  return expense;
}

export async function getExpenses(
  search?: string
) {
  return prisma.expense.findMany({
    where: search
      ? {
          OR: [
            {
              title: {
                contains: search,
              },
            },
            {
              property: {
                name: {
                  contains: search,
                },
              },
            },
          ],
        }
      : undefined,

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

export async function deleteExpense(
  id: string,
  auditUserId: string
) {
  const expense = await prisma.expense.delete({
    where: {
      id,
    },
  });

  await createAuditLog({
    userId: auditUserId,
    module: AuditModule.EXPENSE,
    action: AuditAction.DELETE,
    description: `Deleted expense "${expense.title}"`,
  });

  return expense;
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
  data: UpdateExpenseInput,
  auditUserId: string
) {
  const expense = await prisma.expense.update({
    where: {
      id,
    },
    data,
  });

  await createAuditLog({
    userId: auditUserId,
    module: AuditModule.EXPENSE,
    action: AuditAction.UPDATE,
    description: `Updated expense "${expense.title}"`,
  });

  return expense;
}