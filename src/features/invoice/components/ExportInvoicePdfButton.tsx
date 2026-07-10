"use client";

import { exportInvoicePdf } from "../utils/invoice-pdf";

type Props = {
  invoice: any;
  company: any;
};

export default function ExportInvoicePdfButton({
  invoice,
  company,
}: Props) {
  return (
    <button
      onClick={() =>
        exportInvoicePdf(invoice, company)
      }
      className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
    >
      Download PDF
    </button>
  );
}