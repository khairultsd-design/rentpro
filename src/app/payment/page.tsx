import { getPayments } from "@/features/payment/services/payment.service";
import PageHeader from "@/components/PageHeader";

export default async function PaymentsPage() {
  const payments = await getPayments();

  return (
    <div className="space-y-6">
      <PageHeader
  title="Payments"
  description="View all payment transactions"
/>

      <div className="rounded-xl bg-white shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Receipt</th>
              <th className="p-4 text-left">Tenant</th>
              <th className="p-4 text-left">Property</th>
              <th className="p-4 text-right">Amount</th>
              <th className="p-4 text-center">Method</th>
              <th className="p-4 text-center">Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="p-4">
                  {payment.receiptNo}
                </td>

                <td className="p-4">
                  {payment.invoice.tenancy.tenant.fullName}
                </td>

                <td className="p-4">
                  {payment.invoice.tenancy.room.property.name}
                </td>

                <td className="p-4 text-right">
                  RM {payment.amount.toFixed(2)}
                </td>

                <td className="p-4 text-center">
                  {payment.paymentMethod}
                </td>

                <td className="p-4 text-center">
                  {new Date(
                    payment.paymentDate
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}