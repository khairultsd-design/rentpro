"use client";

import { jsPDF } from "jspdf";

type Props = {
  report: {
    income: number;
    expenses: number;
    profit: number;
    outstanding: number;
    occupancy: number;
  };
};

export default function ExportPdfButton({
  report,
}: Props) {
  const exportPdf = async () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("RentPro Financial Report", 14, 20);

    doc.setFontSize(11);

    doc.text(
      `Generated : ${new Date().toLocaleString()}`,
      14,
      30
    );

    doc.text(
      `Income : RM ${report.income.toFixed(2)}`,
      14,
      45
    );

    doc.text(
      `Expenses : RM ${report.expenses.toFixed(2)}`,
      14,
      55
    );

    doc.text(
      `Net Profit : RM ${report.profit.toFixed(2)}`,
      14,
      65
    );

    doc.text(
      `Outstanding : RM ${report.outstanding.toFixed(2)}`,
      14,
      75
    );

    doc.text(
      `Occupancy : ${report.occupancy}%`,
      14,
      85
    );

    doc.save("RentPro-Financial-Report.pdf");
  };

  return (
    <button
      onClick={exportPdf}
      className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
    >
      Export PDF
    </button>
  );
}