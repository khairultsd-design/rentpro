type PaymentHistoryProps = {
  payments: any[];
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

        <button className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
          Record Payment
        </button>
      </div>

      {payments.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-gray-500">
          No payment recorded.
        </div>
      ) : (
        <p>Payment list coming soon...</p>
      )}
    </div>
  );
}