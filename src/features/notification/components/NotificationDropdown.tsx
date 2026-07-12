import { getNotifications } from "../services/notification.service";
import { formatDate } from "@/lib/format";
import NotificationItem from "./NotificationItem";
import { markAllNotificationsRead } from "../actions/notification.action";

export default async function NotificationDropdown() {
  const notifications =
    await getNotifications(10);

  return (
    <div className="absolute right-0 top-14 z-50 w-96 rounded-xl border bg-white shadow-xl">
      <div className="flex items-center justify-between border-b p-4">
  <h2 className="font-bold">
    Notifications
  </h2>

  <form action={markAllNotificationsRead}>
    <button
      type="submit"
      className="text-sm font-medium text-blue-600 hover:underline"
    >
      Mark all
    </button>
  </form>
</div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-slate-500">
            No notifications
          </div>
        ) : (
          notifications.map((item) => (
            <NotificationItem
  key={item.id}
  id={item.id}
  title={item.title}
  message={item.message}
  createdAt={formatDate(item.createdAt)}
  isRead={item.isRead}
/>
          ))
        )}
      </div>
    </div>
  );
}