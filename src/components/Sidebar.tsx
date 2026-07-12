"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
} | null;

type MenuItem = {
  name: string;
  href: string;
  icon: string;
  roles: string[];
};

const menus: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: "🏠",
    roles: ["ADMIN", "MANAGER", "STAFF"],
  },
  {
    name: "Properties",
    href: "/property",
    icon: "🏢",
    roles: ["ADMIN", "MANAGER"],
  },
  {
    name: "Tenancies",
    href: "/dashboard/tenancies",
    icon: "🛏️",
    roles: ["ADMIN", "MANAGER", "STAFF"],
  },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: "📄",
    roles: ["ADMIN", "MANAGER", "STAFF"],
  },
  {
    name: "Payments",
    href: "/payment",
    icon: "💰",
    roles: ["ADMIN", "MANAGER", "STAFF"],
  },
  {
    name: "Expenses",
    href: "/expense",
    icon: "💸",
    roles: ["ADMIN", "MANAGER"],
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: "📊",
    roles: ["ADMIN", "MANAGER"],
  },
  {
  name: "Audit Logs",
  href: "/dashboard/audit",
  icon: "📝",
  roles: ["ADMIN"],
},
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: "⚙️",
    roles: ["ADMIN"],
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: "👤",
    roles: ["ADMIN"],
  },
];


type SidebarProps = {
  user: User;
};

export default function Sidebar({
  user,
}: SidebarProps) {
  const pathname = usePathname();

  const visibleMenus = menus.filter((menu) =>
    user ? menu.roles.includes(user.role) : false
  );

  return (
    <aside className="min-h-screen w-64 border-r border-slate-200 bg-white p-6">
      <h2 className="mb-8 text-xl font-bold text-slate-800">
        Menu
      </h2>

      <nav className="space-y-2">
        {visibleMenus.map((menu) => (
          <Link
            key={menu.name}
            href={menu.href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
              pathname === menu.href
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="text-lg">{menu.icon}</span>
            <span className="font-medium">
              {menu.name}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}