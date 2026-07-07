type ReceiptCardProps = {
  payment: any;
};

export default function ReceiptCard({
  payment,
}: ReceiptCardProps) {
  const invoice = payment.invoice;
  const tenancy = invoice.tenancy;
  const tenant = tenancy.tenant;
  const room = tenancy.room;
  const property = room.property;

  return (
    <div className="rounded-xl bg-white p-8 shadow">
      <div className="border-b pb-6">
        <h2 className="text-2xl font-bold">
          RENTPRO
        </h2>

        <p className="text-slate-500">
          Payment Receipt
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">

        <div>
          <p className="text-sm text-slate-500">
            Receipt No
          </p>

          <p className="font-semibold">
            {payment.receiptNo}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Invoice No
          </p>

          <p className="font-semibold">
            {invoice.invoiceNumber}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Payment Date
          </p>

          <p className="font-semibold">
            {payment.paymentDate.toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Payment Method
          </p>

          <p className="font-semibold">
            {payment.paymentMethod}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Tenant
          </p>

          <p className="font-semibold">
            {tenant.fullName}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Phone
          </p>

          <p className="font-semibold">
            {tenant.phone}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Property
          </p>

          <p className="font-semibold">
            {property.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Room
          </p>

          <p className="font-semibold">
            {room.roomNumber}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Amount Paid
          </p>

          <p className="text-xl font-bold text-green-600">
            RM {payment.amount.toFixed(2)}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Reference No
          </p>

          <p className="font-semibold">
            {payment.referenceNo || "-"}
          </p>
        </div>
      </div>

      {payment.remarks && (
        <div className="mt-6 border-t pt-6">
          <p className="text-sm text-slate-500">
            Remarks
          </p>

          <p>{payment.remarks}</p>
        </div>
      )}
    </div>
  );
}