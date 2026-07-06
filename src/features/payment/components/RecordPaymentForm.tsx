import TextInput from "@/components/form/TextInput";
import SelectInput from "@/components/form/SelectInput";
import { recordPayment } from "../actions/payment.actions";

type RecordPaymentFormProps = {
  invoiceId: string;
};

export default function RecordPaymentForm({
  invoiceId,
}: RecordPaymentFormProps) {
  return (
    <form
  action={recordPayment}
  className="rounded-xl bg-white p-6 shadow"
>
  <input
    type="hidden"
    name="invoiceId"
    value={invoiceId}
  />

  <h2 className="mb-6 text-lg font-semibold">
    Record Payment
  </h2>

  <TextInput
    name="amount"
    label="Payment Amount"
    type="number"
  />

  <TextInput
    name="paymentDate"
    label="Payment Date"
    type="date"
  />

  <SelectInput
  name="paymentMethod"
  label="Payment Method"
  options={[
    {
      label: "Cash",
      value: "CASH",
    },
    {
      label: "Online Transfer",
      value: "ONLINE_TRANSFER",
    },
    {
      label: "Touch 'n Go",
      value: "TNG",
    },
    {
      label: "Card",
      value: "CARD",
    },
  ]}
/>

  <TextInput
    name="referenceNo"
    label="Reference No"
    required={false}
  />

  <div className="mb-6">
    <label className="mb-2 block font-semibold">
      Remarks
    </label>

    <textarea
      name="remarks"
      rows={3}
      className="w-full rounded-lg border p-3"
    />
  </div>

  <button
    type="submit"
    className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
  >
    Record Payment
  </button>
</form>
  );
}