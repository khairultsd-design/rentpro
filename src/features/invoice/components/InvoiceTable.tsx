import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import { InvoiceWithRelations } from "../types/invoice.types";

type InvoiceTableProps = {
  invoices: InvoiceWithRelations[];
};

export default function InvoiceTable({
  invoices,
}: InvoiceTableProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left">Invoice</th>
            <th className="p-4 text-left">Tenant</th>
            <th className="p-4 text-left">Property / Room</th>
            <th className="p-4 text-right">Amount</th>
            <th className="p-4 text-center">Due Date</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((invoice) => (
            <tr
              key={invoice.id}
              className="border-t hover:bg-slate-50"
            >
              <td className="p-4 font-semibold">
                {invoice.invoiceNumber}
              </td>

              <td className="p-4">
                {invoice.tenancy.tenant.fullName}
              </td>

              <td className="p-4">
                <div className="font-medium">
                  {invoice.tenancy.room.property.name}
                </div>
                <div className="text-sm text-gray-500">
                  Room {invoice.tenancy.room.roomNumber}
                </div>
              </td>

              <td className="p-4 text-right">
                RM {invoice.amount.toFixed(2)}
              </td>

         <td className="p-4 text-center">
  {new Date(invoice.dueDate).toLocaleDateString()}
</td>

              <td className="p-4 text-center">
  <StatusBadge status={invoice.status} />
</td>

              <td className="p-4">
                <div className="flex justify-center">
                  <Link
                    href={`/dashboard/invoices/${invoice.id}`}
                    className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                  >
                    View
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}