"use client";

import { markNotificationRead } from "../actions/notification.action";

type NotificationItemProps = {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
};

export default function NotificationItem({
  id,
  title,
  message,
  createdAt,
  isRead,
}: NotificationItemProps) {
  return (
    <form
      action={async () => {
        await markNotificationRead(id);
      }}
    >
      <button
        type="submit"
        className={`w-full border-b p-4 text-left transition hover:bg-slate-100 ${
          !isRead ? "bg-blue-50" : ""
        }`}
      >
        <p className="font-semibold">
          {title}
        </p>

        <p className="mt-1 text-sm text-slate-600">
          {message}
        </p>

        <p className="mt-2 text-xs text-slate-400">
          {createdAt}
        </p>
      </button>
    </form>
  );
}