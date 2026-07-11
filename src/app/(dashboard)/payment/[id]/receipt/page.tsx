import { notFound } from "next/navigation";

import ReceiptCard from "@/features/payment/components/ReceiptCard";
import { getPaymentById } from "@/features/payment/services/payment.service";
import { getCompany } from "@/features/company/services/company.service";
import ExportReceiptPdfButton from "@/features/payment/components/ExportReceiptPdfButton";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ReceiptPage({
  params,
}: PageProps) {
  const { id } = await params;

  const [payment, company] = await Promise.all([
  getPaymentById(id),
  getCompany(),
]);

if (!payment) {
  notFound();
}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
  <div>
    <h1 className="text-3xl font-bold">
      Payment Receipt
    </h1>

    <p className="mt-2 text-slate-500">
      Receipt #{payment.receiptNo}
    </p>
  </div>

  <ExportReceiptPdfButton
    payment={payment}
    company={company}
  />
</div>

      <ReceiptCard
  payment={payment}
  company={company}
/>
    </div>
  );
}