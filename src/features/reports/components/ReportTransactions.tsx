import { formatCurrency } from "@/lib/format";

type Payment = {
  id: string;
  amount: number;
  paymentDate: Date;
  invoice: {
    tenancy: {
      tenant: {
        fullName: string;
      };
      room: {
        roomNumber: string;
      };
    };
  };
};

type Expense = {
  id: string;
  title: string;
  amount: number;
  expenseDate: Date;
  property: {
    name: string;
  };
};

type Props = {
  payments: Payment[];
  expenses: Expense[];
};

export default function ReportTransactions({
  payments,
  expenses,
}: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Payments */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Recent Payments
        </h2>

        {payments.length === 0 ? (
          <p className="text-slate-500">
            No payments found.
          </p>
        ) : (
          <div className="space-y-3">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="font-medium">
                    {payment.invoice.tenancy.tenant.fullName}
                  </p>

                  <p className="text-sm text-slate-500">
                    Room {payment.invoice.tenancy.room.roomNumber}
                  </p>
                </div>

                <p className="font-semibold">
                  {formatCurrency(payment.amount)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Expenses */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Recent Expenses
        </h2>

        {expenses.length === 0 ? (
          <p className="text-slate-500">
            No expenses found.
          </p>
        ) : (
          <div className="space-y-3">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between border-b pb-2"
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
      </div>
    </div>
  );
}