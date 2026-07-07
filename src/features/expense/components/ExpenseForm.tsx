import { ExpenseCategory } from "@prisma/client";

import { createExpense } from "../actions/expense.actions";

import TextInput from "@/components/form/TextInput";
import SelectInput from "@/components/form/SelectInput";

type ExpenseFormProps = {
  properties: {
    id: string;
    name: string;
  }[];
};

export default function ExpenseForm({
  properties,
}: ExpenseFormProps) {
  return (
    <>
      <h2 className="text-red-600 text-2xl">
        Expense Form Loaded
      </h2>

      <form action={createExpense} className="space-y-6">
      <SelectInput
        name="propertyId"
        label="Property"
        required
        options={properties.map((property) => ({
          value: property.id,
          label: property.name,
        }))}
      />

      <TextInput
        name="title"
        label="Expense Title"
        required
      />

      <SelectInput
        name="category"
        label="Category"
        required
        options={Object.values(ExpenseCategory).map(
          (category) => ({
            value: category,
            label: category,
          })
        )}
      />

      <TextInput
        name="amount"
        label="Amount"
        type="number"
        required
      />

      <TextInput
        name="expenseDate"
        label="Expense Date"
        type="date"
        required
      />

      <TextInput
        name="remarks"
        label="Remarks"
      />

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
      >
        Save Expense
      </button>
      </form>
    </>
  );
}