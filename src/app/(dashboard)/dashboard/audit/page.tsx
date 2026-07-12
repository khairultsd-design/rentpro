import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { formatDate } from "@/lib/format";
import {
  getAuditLogs,
  getAuditModules,
} from "@/features/audit/services/audit-log.service";
import ActionBadge from "@/features/audit/components/ActionBadge";
import RoleBadge from "@/features/audit/components/RoleBadge";
import RelativeTime from "@/features/audit/components/RelativeTime";
type Props = {
  searchParams: Promise<{
    search?: string;
    module?: string;
    page?: string;
  }>;
};

export default async function AuditPage({
  searchParams,
}: Props) {
  await requireAdmin();

  const params = await searchParams;

  const search = params.search ?? "";
  const module = params.module ?? "";
  const page = Number(params.page ?? "1");

  const {
    logs,
    totalPages,
  } = await getAuditLogs({
    search,
    module,
    page,
  });

  const modules = await getAuditModules();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Audit Logs
      </h1>

      <form className="flex flex-wrap gap-3">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search..."
          className="rounded-lg border px-3 py-2"
        />

        <select
          name="module"
          defaultValue={module}
          className="rounded-lg border px-3 py-2"
        >
          <option value="">
            All Modules
          </option>

          {modules.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        <button
          className="rounded-lg bg-slate-900 px-4 py-2 text-white"
        >
          Filter
        </button>
      </form>

      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Module</th>
              <th className="p-4 text-left">Action</th>
              <th className="p-4 text-left">Description</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr
                key={log.id}
                className="border-t"
              >
                <td className="p-4">
  <div className="flex flex-col">
    <span>{formatDate(log.createdAt)}</span>

    <span className="text-xs text-slate-500">
      <RelativeTime
        date={log.createdAt}
      />
    </span>
  </div>
</td>

                <td className="p-4">
  <RoleBadge
    role={log.user.role}
  />
</td>

                <td className="p-4">
                  {log.user.role}
                </td>

                <td className="p-4">
                  {log.module}
                </td>

                <td className="p-4">
  <ActionBadge
    action={log.action}
  />
</td>

                <td className="p-4">
                  {log.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex gap-2">
          {Array.from({
            length: totalPages,
          }).map((_, index) => {
            const p = index + 1;

            return (
              <Link
                key={p}
                href={`?search=${search}&module=${module}&page=${p}`}
                className={`rounded border px-3 py-2 ${
                  p === page
                    ? "bg-slate-900 text-white"
                    : "bg-white"
                }`}
              >
                {p}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}