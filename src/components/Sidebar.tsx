"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {
    name: "Dashboard",
    href: "/",
    icon: "🏠",
  },
  {
    name: "Properties",
    href: "/property",
    icon: "🏢",
  },
  {
    name: "Tenancies",
    href: "/dashboard/tenancies",
    icon: "🛏️",
  },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: "📄",
  },
  {
    name: "Payments",
    href: "/payment",
    icon: "💰",
  },
  {
    name: "Expenses",
    href: "/expense",
    icon: "💸",
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: "📊",
  },
  {
  name: "Settings",
  href: "/dashboard/settings",
  icon: "⚙️",
}
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="min-h-screen w-64 border-r border-slate-200 bg-white p-6">
      <h2 className="mb-8 text-xl font-bold text-slate-800">
        Menu
      </h2>

      <nav className="space-y-2">
        {menus.map((menu) => (
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
            <span className="font-medium">{menu.name}</span>
          </Link>
        ))}

        <div className="mt-6 border-t pt-6">
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-400">
            <span className="text-lg">⚙️</span>

            <div>
              <p className="font-medium">
                Settings
              </p>

              <p className="text-xs">
                Coming Soon
              </p>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}