import {
  Bell,
  Building2,
  ChevronDown,
} from "lucide-react";

import LogoutButton from "../features/user/components/LogoutButton";
import NotificationDropdown from "@/features/notification/components/NotificationDropdown";

import { getSession } from "@/lib/session";
import { getUnreadCount } from "@/features/notification/services/notification.service";

export default async function Header() {
  const user = await getSession();

  const unreadCount =
    await getUnreadCount();

  const initial =
    user?.name?.charAt(0).toUpperCase() ?? "?";

  return (
    <header className="border-b border-slate-200 bg-white px-8 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-blue-600" />

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              RentPro
            </h1>

            <p className="text-sm text-slate-500">
              Property Management System
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="relative rounded-xl border border-slate-200 bg-white p-3 transition hover:bg-slate-100">
              <Bell className="h-5 w-5 text-slate-700" />

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            <NotificationDropdown />
          </div>

          <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 transition hover:bg-slate-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
              {initial}
            </div>

            <div className="text-left">
              <p className="font-semibold text-slate-800">
                {user?.name}
              </p>

              <p className="text-xs text-slate-500">
                {user?.role}
              </p>
            </div>

            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>

          <LogoutButton />
        </div>
      </div>
    </header>
  );
}