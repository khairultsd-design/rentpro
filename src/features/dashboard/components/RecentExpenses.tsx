import Card from "@/components/Card";
import EmptyState from "@/components/EmptyState";
import { formatCurrency } from "@/lib/format";

type RecentExpensesProps = {
  expenses: {
    id: string;
    title: string;
    amount: number;
    property: {
      name: string;
    };
  }[];
};

export default function RecentExpenses({
  expenses,
}: RecentExpensesProps) {
  return (
    <Card title="Recent Expenses">
      {expenses.length === 0 ? (
        <EmptyState message="No recent expenses." />
      ) : (
        <div className="space-y-4">
  {expenses.map((expense) => (
    <div
      key={expense.id}
      className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
    >
      <div>
        <p className="font-semibold text-slate-800">
          {expense.title}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {expense.property.name}
        </p>
      </div>

      <div className="text-right">
        <p className="text-lg font-bold text-red-600">
          {formatCurrency(expense.amount)}
        </p>

        <p className="text-xs text-slate-400">
          Expense
        </p>
      </div>
    </div>
  ))}
</div>
      )}
    </Card>
  );
}