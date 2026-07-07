import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/format";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";

import { getExpenses } from "@/features/expense/services/expense.service";

export default async function ExpensePage() {
  const expenses = await getExpenses();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expenses"
        description="Manage property expenses"
        actions={
          <Link
            href="/expense/new"
            className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            + Add Expense
          </Link>
        }
      />

      {expenses.length === 0 ? (
        <EmptyState message="No expenses found." />
      ) : (
        <div className="overflow-hidden rounded-xl bg-white shadow">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Property</th>
                <th className="p-4 text-center">Category</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-center">Date</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-4">
                    {expense.title}
                  </td>

                  <td className="p-4">
                    {expense.property.name}
                  </td>

                  <td className="p-4 text-center">
                    {expense.category}
                  </td>

                  <td className="p-4 text-right">
                    {formatCurrency(expense.amount)}
                  </td>

                  <td className="p-4 text-center">
                    {formatDate(expense.expenseDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}