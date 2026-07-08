import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/format";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import DeleteExpenseButton from "@/features/expense/components/DeleteExpenseButton";
import SearchBox from "@/components/SearchBox";
// Local lightweight Table wrapper in case the shared Table component is missing
const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="min-w-full">{children}</table>
    </div>
  );
};
// Local lightweight TableHeader wrapper in case the shared TableHeader component is missing
const TableHeader = ({ children }: { children: React.ReactNode }) => {
  return <thead>{children}</thead>;
};

// Local lightweight TableBody wrapper in case the shared TableBody component is missing
const TableBody = ({ children }: { children: React.ReactNode }) => {
  return <tbody>{children}</tbody>;
};

// Local lightweight TableRow wrapper in case the shared TableRow component is missing
const TableRow = ({ children }: { children: React.ReactNode }) => {
  return <tr>{children}</tr>;
};

// Local lightweight TableCell in case the shared TableCell component is missing
const TableCell = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <td className={className}>{children}</td>;
};


import { getExpenses } from "@/features/expense/services/expense.service";

type ExpensePageProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function ExpensePage({
  searchParams,
}: ExpensePageProps) {
  const { search } = await searchParams;

  const expenses = await getExpenses(search);

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
>
  <SearchBox
    placeholder="Search expense..."
    defaultValue={search}
  />
</PageHeader>

      {expenses.length === 0 ? (
        <EmptyState message="No expenses found." />
      ) : (
        <Table>
            <TableHeader>
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Property</th>
                <th className="p-4 text-center">Category</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-center">Date</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </TableHeader>

            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <td className="p-4">
                    {expense.title}
                  </td>

                  <td className="p-4">
                    {expense.property.name}
                  </td>

                  <td className="p-4 text-center">
                    {expense.category}
                  </td>

                  <TableCell className="text-right">
                    {formatCurrency(expense.amount)}
                  </TableCell>

                  <td className="p-4 text-center">
                    {formatDate(expense.expenseDate)}
                  </td>
                  <TableCell>
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        href={`/expense/${expense.id}/edit`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <DeleteExpenseButton id={expense.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      )}
    </div>
  );
}