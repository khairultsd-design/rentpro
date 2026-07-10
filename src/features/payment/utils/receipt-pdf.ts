import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export function exportReceiptPdf(
  payment: any,
  company: any
) {
  const doc = new jsPDF();

  const invoice = payment.invoice;
  const tenant = invoice.tenancy.tenant;
  const room = invoice.tenancy.room;
  const property = room.property;

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(company.companyName, 14, 18);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  let y = 26;

  if (company.registrationNo) {
    doc.text(`Registration No: ${company.registrationNo}`, 14, y);
    y += 6;
  }

  if (company.address) {
    doc.text(company.address, 14, y);
    y += 6;
  }

  if (company.phone) {
    doc.text(`Phone: ${company.phone}`, 14, y);
    y += 6;
  }

  if (company.email) {
    doc.text(`Email: ${company.email}`, 14, y);
  }

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("PAYMENT RECEIPT", 120, 20);

  autoTable(doc, {
    startY: 60,
    theme: "grid",
    head: [["Item", "Value"]],
    body: [
      ["Receipt No", payment.receiptNo],
      ["Invoice No", invoice.invoiceNumber],
      ["Payment Date", new Date(payment.paymentDate).toLocaleDateString("en-MY")],
      ["Tenant", tenant.fullName],
      ["Property", property.name],
      ["Room", room.roomNumber],
      ["Payment Method", payment.paymentMethod],
      ["Reference No", payment.referenceNo || "-"],
      [
        "Amount Paid",
        new Intl.NumberFormat("en-MY", {
          style: "currency",
          currency: "MYR",
        }).format(payment.amount),
      ],
      [
        "Outstanding Balance",
        new Intl.NumberFormat("en-MY", {
          style: "currency",
          currency: "MYR",
        }).format(invoice.balance),
      ],
    ],
  });

  const finalY = (doc as any).lastAutoTable.finalY + 15;

  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text("Thank you for your payment.", 14, finalY);

  doc.setFont("helvetica", "bold");
  doc.text("Powered by RentPro", 14, finalY + 10);

  doc.save(`${payment.receiptNo}.pdf`);
}