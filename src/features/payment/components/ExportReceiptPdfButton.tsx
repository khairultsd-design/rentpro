"use client";

import { exportReceiptPdf } from "../utils/receipt-pdf";

type Props = {
  payment: any;
  company: any;
};

export default function ExportReceiptPdfButton({
  payment,
  company,
}: Props) {
  return (
    <button
      onClick={() => exportReceiptPdf(payment, company)}
      className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
    >
      Download PDF
    </button>
  );
}