type MetricCardProps = {
  title: string;
  value: string | number;
};

export default function MetricCard({
  title,
  value,
}: MetricCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold text-slate-900">
        {value}
      </h2>
    </div>
  );
}