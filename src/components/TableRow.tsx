type TableRowProps = {
  children: React.ReactNode;
};

export default function TableRow({
  children,
}: TableRowProps) {
  return (
    <tr className="border-t hover:bg-slate-50">
      {children}
    </tr>
  );
}