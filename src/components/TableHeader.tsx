type TableHeaderProps = {
  children: React.ReactNode;
};

export default function TableHeader({
  children,
}: TableHeaderProps) {
  return (
    <thead className="bg-slate-100">
      {children}
    </thead>
  );
}