import { getInvoices } from "@/features/invoice/services/invoice.service";

export default async function InvoicesPage() {
  const invoices = await getInvoices();

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Invoices
      </h1>

      <pre className="rounded bg-gray-100 p-4 text-sm overflow-auto">
        {JSON.stringify(invoices, null, 2)}
      </pre>
    </div>
  );
}