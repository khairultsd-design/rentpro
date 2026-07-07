import { notFound } from "next/navigation";

import ReceiptCard from "@/features/payment/components/ReceiptCard";
import { getPaymentById } from "@/features/payment/services/payment.service";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ReceiptPage({
  params,
}: PageProps) {
  const { id } = await params;

  const payment = await getPaymentById(id);

  if (!payment) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Payment Receipt
        </h1>

        <p className="mt-2 text-slate-500">
          Receipt #{payment.receiptNo}
        </p>
      </div>

      <ReceiptCard payment={payment} />
    </div>
  );
}