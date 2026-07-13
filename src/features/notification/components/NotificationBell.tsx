"use client";

import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";

type Notification = {
  id: string;
  title: string;
  message: string;
  createdAt: Date;
  isRead: boolean;
};

type NotificationBellProps = {
  unreadCount: number;
  notifications: Notification[];
};

export default function NotificationBell({
  unreadCount,
  notifications,
}: NotificationBellProps) {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
    >
      <button
        type="button"
        onClick={() =>
          setOpen((prev) => !prev)
        }
        className="relative rounded-xl border border-slate-200 bg-white p-3 transition hover:bg-slate-100"
      >
        <Bell className="h-5 w-5 text-slate-700" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <NotificationDropdown
          notifications={notifications}
        />
      )}
    </div>
  );
}