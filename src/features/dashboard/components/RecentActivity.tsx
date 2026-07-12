import { formatDate } from "@/lib/format";

type Activity = {
  id: string;
  module: string;
  action: string;
  description: string;
  createdAt: Date;
  user: {
    name: string;
    role: string;
  };
};

export default function RecentActivity({
  activities,
}: {
  activities: Activity[];
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-bold">
        📝 Recent Activity
      </h2>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-sm text-slate-500">
            No recent activity.
          </p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="border-b pb-3 last:border-none"
            >
              <p className="font-medium">
                {activity.description}
              </p>

              <p className="text-sm text-slate-500">
                {activity.user.name} ({activity.user.role})
              </p>

              <p className="text-xs text-slate-400">
                {activity.module} • {activity.action} •{" "}
                {formatDate(activity.createdAt)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}