type TableCellProps = {
  children: React.ReactNode;
  className?: string;
};

export default function TableCell({
  children,
  className = "",
}: TableCellProps) {
  return (
    <td className={`p-4 ${className}`}>
      {children}
    </td>
  );
}