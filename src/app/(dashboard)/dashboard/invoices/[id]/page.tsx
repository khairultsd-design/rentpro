import { notFound } from "next/navigation";
import { getInvoices } from "@/features/invoice/services/invoice.service";
import InvoiceDetailCard from "@/features/invoice/components/InvoiceDetailCard";
import PaymentHistory from "@/features/invoice/components/PaymentHistory";
import RecordPaymentForm from "@/features/payment/components/RecordPaymentForm";
import { getCompany } from "@/features/company/services/company.service";
import ExportInvoicePdfButton from "@/features/invoice/components/ExportInvoicePdfButton";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function InvoiceDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const [invoices, company] = await Promise.all([
    getInvoices(),
    getCompany(),
  ]);

  const invoice = invoices?.find((inv) => inv.id === id);

  if (!invoice) notFound();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
  <h1 className="text-2xl font-bold">
    Invoice Details
  </h1>

  <ExportInvoicePdfButton
    invoice={invoice}
    company={company}
  />
</div>

      <InvoiceDetailCard
  invoice={invoice}
  company={company}
/>
      <PaymentHistory payments={invoice.payments} />
      <RecordPaymentForm invoiceId={invoice.id} />
    </div>
  );
}