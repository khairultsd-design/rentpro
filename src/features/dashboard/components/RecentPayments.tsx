"use client";
import Card from "../../../components/Card";
import EmptyState from "../../../components/EmptyState";

type RecentPaymentsProps = {
  payments: {
    id: string;
    amount: number;
      paymentDate: string;
    paymentMethod: string;
    invoice: {
      tenancy: {
        tenant: {
          fullName: string;
        };
      };
    };
  }[];
};

export default function RecentPayments({
  payments,
}: RecentPaymentsProps) {
  return (
    <Card title="Recent Payments">
      {payments.length === 0 ? (
        <EmptyState message="No recent payments." />
      ) : (
        <div className="space-y-3">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between border-b pb-2 last:border-0"
            >
              <div>
                <p className="font-medium">
                  {payment.invoice.tenancy.tenant.fullName}
                </p>
                <p className="text-sm text-slate-500">
  {new Date(payment.paymentDate).toLocaleDateString("en-MY")}
  {" • "}
  {payment.paymentMethod.replaceAll("_", " ")}
</p>
              </div>

              <p className="font-semibold">
                RM {payment.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}