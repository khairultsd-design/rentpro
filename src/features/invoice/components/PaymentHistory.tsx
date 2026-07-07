import Link from "next/link";
import { PaymentWithInvoice } from "../types/invoice.types";
import {
  formatCurrency,
  formatDate,
} from "@/lib/format";
import EmptyState from "@/components/EmptyState";

type PaymentHistoryProps = {
  payments: PaymentWithInvoice[];
};

export default function PaymentHistory({
  payments,
}: PaymentHistoryProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Payment History
        </h2>
      </div>

      {payments.length === 0 ? (
        <EmptyState message="No payment recorded." />
      ) : (
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="p-3 text-left">
                Receipt
              </th>

              <th className="p-3 text-left">
                Date
              </th>

              <th className="p-3 text-right">
                Amount
              </th>

              <th className="p-3 text-center">
                Method
              </th>

              <th className="p-3 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="p-3 font-medium">
                  {payment.receiptNo ?? "-"}
                </td>

                <td className="p-3">
                  {formatDate(payment.paymentDate)}
                </td>

                <td className="p-3 text-right font-semibold">
                  {formatCurrency(payment.amount)}
                </td>

                <td className="p-3 text-center">
                  {payment.paymentMethod}
                </td>

                <td className="p-3 text-center">
                  <Link
                    href={`/payment/${payment.id}/receipt`}
                    className="rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                  >
                    View Receipt
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}