type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  return (
    <span className="rounded bg-gray-200 px-2 py-1">
      {status}
    </span>
  );
}