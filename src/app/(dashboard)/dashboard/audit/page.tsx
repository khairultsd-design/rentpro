import { requireAdmin } from "@/lib/auth";
import { formatDate } from "@/lib/format";
import { getAuditLogs } from "@/features/audit/services/audit-log.service";

export default async function AuditPage() {
  await requireAdmin();

  const logs = await getAuditLogs();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Audit Logs
      </h1>

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
                  {formatDate(log.createdAt)}
                </td>

                <td className="p-4">
                  {log.user.name}
                </td>

                <td className="p-4">
                  {log.user.role}
                </td>

                <td className="p-4">
                  {log.module}
                </td>

                <td className="p-4">
                  {log.action}
                </td>

                <td className="p-4">
                  {log.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}