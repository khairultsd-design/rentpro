type Props = {
  role: string;
};

export default function RoleBadge({
  role,
}: Props) {
  const styles: Record<string, string> = {
    ADMIN:
      "bg-purple-100 text-purple-700",

    STAFF:
      "bg-sky-100 text-sky-700",

    USER:
      "bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[role] ??
        "bg-slate-100 text-slate-700"
      }`}
    >
      {role}
    </span>
  );
}