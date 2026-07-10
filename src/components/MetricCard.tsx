type MetricCardProps = {
  title: string;
  value: string | number;
};

export default function MetricCard({
  title,
  value,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        {title}
      </p>

      <div className="mt-3">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </h2>
      </div>
    </div>
  );
}