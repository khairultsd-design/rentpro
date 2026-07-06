import { notFound } from "next/navigation";
import { getInvoiceById } from "@/features/invoice/services/invoice.service";
import InvoiceDetailCard from "@/features/invoice/components/InvoiceDetailCard";
import PaymentHistory from "@/features/invoice/components/PaymentHistory";
import RecordPaymentForm from "@/features/payment/components/RecordPaymentForm";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function InvoiceDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const invoice = await getInvoiceById(id);

  if (!invoice) {
    notFound();
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">
        Invoice Details
      </h1>

      <InvoiceDetailCard invoice={invoice} />
      <PaymentHistory payments={invoice.payments} />
      <RecordPaymentForm invoiceId={invoice.id} />
    </div>
  );
}