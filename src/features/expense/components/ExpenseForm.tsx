import { ExpenseCategory } from "@prisma/client";
import TextInput from "@/components/form/TextInput";
import SelectInput from "@/components/form/SelectInput";

type ExpenseFormProps = {
  properties: {
    id: string;
    name: string;
  }[];
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: {
    propertyId: string;
    title: string;
    category: ExpenseCategory;
    amount: number;
    expenseDate: string;
    remarks: string;
  };
  submitLabel?: string;
};

export default function ExpenseForm({
  properties,
  action,
  defaultValues,
  submitLabel = "Save Expense",
}: ExpenseFormProps) {
  return (
    <>
    
      <form action={action} className="space-y-6">
      <SelectInput
  name="propertyId"
  label="Property"
  required
  defaultValue={defaultValues?.propertyId}
  options={properties.map((property) => ({
    value: property.id,
    label: property.name,
  }))}
/>

      <TextInput
        name="title"
        label="Expense Title"
        required
        defaultValue={defaultValues?.title}
      />

      <SelectInput
        name="category"
        label="Category"
        required
        defaultValue={defaultValues?.category}
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
  defaultValue={defaultValues?.amount}
/>

      <TextInput
        name="expenseDate"
        label="Expense Date"
        type="date"
        required
        defaultValue={defaultValues?.expenseDate}
      />

      <TextInput
        name="remarks"
        label="Remarks"
        defaultValue={defaultValues?.remarks}
      />

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
      >
        {submitLabel}
      </button>
      </form>
    </>
  );
}