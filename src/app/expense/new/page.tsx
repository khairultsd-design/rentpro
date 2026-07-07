import { getProperties } from "@/features/property/services/property.service";
import ExpenseForm from "@/features/expense/components/ExpenseForm";

export default async function NewExpensePage() {
  const properties = await getProperties();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Add Expense
      </h1>

      <ExpenseForm properties={properties} />
    </div>
  );
}