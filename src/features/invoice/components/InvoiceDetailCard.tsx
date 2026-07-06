type InvoiceDetailCardProps = {
  invoice: any;
};

export default function InvoiceDetailCard({
  invoice,
}: InvoiceDetailCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-lg font-semibold">
        Invoice Information
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <p className="text-sm text-gray-500">
            Invoice Number
          </p>

          <p className="font-semibold">
            {invoice.invoiceNumber}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Status
          </p>

          <p className="font-semibold">
            {invoice.status}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Tenant
          </p>

          <p className="font-semibold">
            {invoice.tenancy.tenant.fullName}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Property
          </p>

          <p className="font-semibold">
            {invoice.tenancy.room.property.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Room
          </p>

          <p className="font-semibold">
            {invoice.tenancy.room.roomNumber}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Monthly Rental
          </p>

          <p className="font-semibold">
            RM {invoice.amount.toFixed(2)}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Due Date
          </p>

          <p className="font-semibold">
            {new Date(invoice.dueDate).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Billing Period
          </p>

          <p className="font-semibold">
            {invoice.billingMonth}/{invoice.billingYear}
          </p>
        </div>

      </div>

      {invoice.remarks && (
        <div className="mt-6 border-t pt-6">
          <p className="text-sm text-gray-500">
            Remarks
          </p>

          <p className="mt-1">
            {invoice.remarks}
          </p>
        </div>
      )}
    </div>
  );
}