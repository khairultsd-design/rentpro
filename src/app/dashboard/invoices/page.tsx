import { getInvoices } from "@/features/invoice/services/invoice.service";
import InvoiceTable from "@/features/invoice/components/InvoiceTable";

export default async function InvoicesPage() {
  const invoices = await getInvoices();

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Invoices
      </h1>

      <InvoiceTable invoices={invoices} />
    </div>
  );
}