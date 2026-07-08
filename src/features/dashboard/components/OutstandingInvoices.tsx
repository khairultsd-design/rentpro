import Card from "@/components/Card";
import EmptyState from "@/components/EmptyState";
import { formatCurrency } from "@/lib/format";

type OutstandingInvoicesProps = {
  invoices: {
    id: string;
    balance: number;
    dueDate: Date;
    tenancy: {
      tenant: {
        fullName: string;
      };
      room: {
        roomNumber: string;
      };
    };
  }[];
};

export default function OutstandingInvoices({
  invoices,
}: OutstandingInvoicesProps) {
  return (
    <Card title="Outstanding Invoices">
      {invoices.length === 0 ? (
        <EmptyState message="No outstanding invoices." />
      ) : (
        <div className="space-y-3">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between border-b pb-2 last:border-0"
            >
              <div>
                <p className="font-medium">
                  {invoice.tenancy.tenant.fullName}
                </p>

                <p className="text-sm text-slate-500">
                  Room {invoice.tenancy.room.roomNumber}
                </p>
              </div>

              <p className="font-semibold text-red-600">
                {formatCurrency(invoice.balance)}
              </p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}