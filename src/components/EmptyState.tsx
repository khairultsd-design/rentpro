type EmptyStateProps = {
  title?: string;
  message: string;
};

export default function EmptyState({
  title = "No Data",
  message,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <h3 className="text-lg font-semibold text-slate-700">
        {title}
      </h3>

      <p className="mt-2 text-slate-500">
        {message}
      </p>
    </div>
  );
}