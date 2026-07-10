import StatusBadge from "@/components/StatusBadge";

type InvoiceDetailCardProps = {
  invoice: any;
  company: any;
};

export default function InvoiceDetailCard({
  invoice,
  company,
}: InvoiceDetailCardProps) {
  return (
    <div className="rounded-xl bg-white shadow">
<div className="border-b p-6">
  <h2 className="text-2xl font-bold">
    {company.companyName}
  </h2>

  {company.registrationNo && (
    <p>Registration No: {company.registrationNo}</p>
  )}

  {company.address && (
    <p>{company.address}</p>
  )}

  {company.phone && (
    <p>Phone: {company.phone}</p>
  )}

  {company.email && (
    <p>Email: {company.email}</p>
  )}
</div>
      <div className="flex items-center justify-between border-b p-6">
        <div>
          <h2 className="text-2xl font-bold">
            INVOICE
          </h2>

          <p className="mt-1 text-gray-500">
            {invoice.invoiceNumber}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">
            Status
          </p>

          <StatusBadge status={invoice.status} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 p-6">

        <div>
          <h3 className="mb-4 border-b pb-2 text-lg font-semibold">
            Tenant Information
          </h3>

          <div className="space-y-3">

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
                Phone
              </p>

              <p className="font-semibold">
                {invoice.tenancy.tenant.phone}
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
                Property
              </p>

              <p className="font-semibold">
                {invoice.tenancy.room.property.name}
              </p>
            </div>

          </div>
        </div>

        <div>

          <h3 className="mb-4 border-b pb-2 text-lg font-semibold">
            Invoice Information
          </h3>

          <div className="space-y-3">

            <div>
              <p className="text-sm text-gray-500">
                Billing Period
              </p>

              <p className="font-semibold">
                {invoice.billingMonth}/{invoice.billingYear}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Due Date
              </p>

              <p className="font-semibold">
                {new Date(invoice.dueDate).toLocaleDateString("en-MY", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Monthly Rental
              </p>

              <p className="text-xl font-bold text-green-600">
                {new Intl.NumberFormat("en-MY", {
  style: "currency",
  currency: "MYR",
}).format(invoice.amount)}
              </p>
            </div>

          </div>

        </div>

      </div>

      {invoice.remarks && (
        <div className="border-t p-6">
          <p className="mb-2 text-sm text-gray-500">
            Remarks
          </p>

          <p>{invoice.remarks}</p>
        </div>
      )}
    </div>
  );
}