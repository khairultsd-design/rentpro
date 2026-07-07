import { notFound } from "next/navigation";

import ExpenseForm from "@/features/expense/components/ExpenseForm";
import { updateExpense } from "@/features/expense/actions/expense.actions";
import { getExpenseById } from "@/features/expense/services/expense.service";
import { getProperties } from "@/features/property/services/property.service";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditExpensePage({
  params,
}: Props) {
  const { id } = await params;

  const [expense, properties] = await Promise.all([
    getExpenseById(id),
    getProperties(),
  ]);

  if (!expense) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Edit Expense
      </h1>

      <ExpenseForm
        properties={properties}
        action={updateExpense.bind(null, expense.id)}
        defaultValues={{
          propertyId: expense.propertyId,
          title: expense.title,
          category: expense.category,
          amount: expense.amount,
          expenseDate: expense.expenseDate
            .toISOString()
            .split("T")[0],
          remarks: expense.remarks ?? "",
        }}
        submitLabel="Update Expense"
      />
    </div>
  );
}