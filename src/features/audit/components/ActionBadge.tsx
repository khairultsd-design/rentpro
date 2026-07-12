type Props = {
  action: string;
};

export default function ActionBadge({
  action,
}: Props) {
  const styles: Record<string, string> = {
    CREATE:
      "bg-green-100 text-green-700",

    UPDATE:
      "bg-amber-100 text-amber-700",

    DELETE:
      "bg-red-100 text-red-700",

    LOGIN:
      "bg-blue-100 text-blue-700",

    LOGOUT:
      "bg-slate-200 text-slate-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[action] ??
        "bg-slate-100 text-slate-700"
      }`}
    >
      {action}
    </span>
  );
}