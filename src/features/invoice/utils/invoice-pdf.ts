import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export function exportInvoicePdf(
  invoice: any,
  company: any
) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(company.companyName, 14, 18);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  let y = 26;

  if (company.registrationNo) {
    doc.text(
      `Registration No: ${company.registrationNo}`,
      14,
      y
    );
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
    y += 8;
  }

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 150, 20);
doc.setFontSize(10);
doc.setFont("helvetica", "normal");

doc.text(
  `Invoice No : ${invoice.invoiceNumber}`,
  140,
  30
);

doc.text(
  `Issue Date : ${new Date(
    invoice.createdAt
  ).toLocaleDateString("en-MY")}`,
  140,
  36
);

doc.text(
  `Due Date : ${new Date(
    invoice.dueDate
  ).toLocaleDateString("en-MY")}`,
  140,
  42
);

doc.text(
  `Status : ${invoice.status}`,
  140,
  48
);
  const amount = new Intl.NumberFormat("en-MY", {
  style: "currency",
  currency: "MYR",
}).format(invoice.amount);

doc.setFontSize(12);
doc.setFont("helvetica", "bold");
doc.text("Bill To", 14, y + 8);

doc.setFont("helvetica", "normal");

doc.text(
  invoice.tenancy.tenant.fullName,
  14,
  y + 16
);

doc.text(
  `Room : ${invoice.tenancy.room.roomNumber}`,
  14,
  y + 22
);

doc.text(
  invoice.tenancy.room.property.name,
  14,
  y + 28
);

autoTable(doc, {
  startY: y + 38,

  head: [[
  "Description",
  "Qty",
  "Unit Price",
  "Amount",
]],

  body: [
  [
    `Monthly Rental (${invoice.billingMonth}/${invoice.billingYear})`,
    "1",
    amount,
    amount,
  ],
],

  styles: {
    fontSize: 10,
  },

  headStyles: {
    fillColor: [41, 128, 185],
  },
});

const finalY =
  (doc as any).lastAutoTable.finalY + 12;

doc.setFont("helvetica", "bold");

doc.text(
  `Total : ${amount}`,
  
  140,
  finalY
);
const paid = new Intl.NumberFormat("en-MY", {
  style: "currency",
  currency: "MYR",
}).format(invoice.paidAmount);

const balance = new Intl.NumberFormat("en-MY", {
  style: "currency",
  currency: "MYR",
}).format(invoice.balance);

doc.setFont("helvetica", "normal");

doc.text(
  `Paid : ${paid}`,
  140,
  finalY + 8
);

doc.text(
  `Balance : ${balance}`,
  140,
  finalY + 16
);
doc.setFontSize(10);

doc.setFont("helvetica", "italic");

doc.setFont("helvetica", "italic");

doc.text(
  "This invoice is computer generated.",
  14,
  finalY + 30
);

doc.text(
  "Thank you for your business.",
  14,
  finalY + 36
);

doc.setFont("helvetica", "bold");

doc.text(
  "Powered by RentPro",
  14,
  finalY + 46
);

doc.save(`${invoice.invoiceNumber}.pdf`);
}