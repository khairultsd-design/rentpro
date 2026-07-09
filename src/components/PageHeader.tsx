type PageHeaderProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
};

export default function PageHeader({
  title,
  description,
  children,
  actions,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-sm text-slate-500">
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {children}
        {actions}
      </div>
    </div>
  );
}