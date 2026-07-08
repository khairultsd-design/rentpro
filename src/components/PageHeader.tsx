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
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-slate-500">
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