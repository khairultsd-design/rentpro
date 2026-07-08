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
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between border-b pb-2 last:border-0"
            >
              <div>
                <p className="font-medium">
                  {expense.title}
                </p>

                <p className="text-sm text-slate-500">
                  {expense.property.name}
                </p>
              </div>

              <p className="font-semibold">
                {formatCurrency(expense.amount)}
              </p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}