type RoleBadgeProps = {
  role: string;
};

export default function RoleBadge({
  role,
}: RoleBadgeProps) {
  const styles: Record<string, string> = {
    ADMIN:
      "bg-red-100 text-red-700",
    MANAGER:
      "bg-yellow-100 text-yellow-700",
    STAFF:
      "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[role] ??
        "bg-gray-100 text-gray-700"
      }`}
    >
      {role}
    </span>
  );
}