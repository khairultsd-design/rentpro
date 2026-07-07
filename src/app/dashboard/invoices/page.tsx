import { getInvoices } from "@/features/invoice/services/invoice.service";
import InvoiceTable from "@/features/invoice/components/InvoiceTable";
import { generateInvoicesAction } from "@/features/invoice/actions/invoice.actions";

export default async function InvoicesPage() {
  const invoices = await getInvoices();

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Invoices
        </h1>

        <form action={generateInvoicesAction}>
          <button
            type="submit"
            className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
          >
            Generate Monthly Invoices
          </button>
        </form>
      </div>

      <InvoiceTable invoices={invoices} />
    </div>
  );
}