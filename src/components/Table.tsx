type TableProps = {
  children: React.ReactNode;
};

export default function Table({
  children,
}: TableProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <table className="w-full">
        {children}
      </table>
    </div>
  );
}