import { getInvoices } from "@/features/invoice/services/invoice.service";
import InvoiceTable from "@/features/invoice/components/InvoiceTable";
import { generateInvoicesAction } from "@/features/invoice/actions/invoice.actions";
import PageHeader from "@/components/PageHeader";

export default async function InvoicesPage() {
  const invoices = await getInvoices();

  return (
    <div className="p-6">
      <PageHeader
        title="Invoices"
        description="Manage rental invoices"
        actions={
          <form action={generateInvoicesAction}>
            <button
              type="submit"
              className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
            >
              Generate Monthly Invoices
            </button>
          </form>
        }
      />

      <InvoiceTable invoices={invoices} />
    </div>
  );
}