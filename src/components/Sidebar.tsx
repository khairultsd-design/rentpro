import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-64 border-r border-slate-200 bg-white p-6">
      <h2 className="mb-6 text-lg font-bold">
        Menu
      </h2>

      <ul className="space-y-2">
        <li>
          <Link
            href="/"
            className="block rounded-lg px-3 py-2 transition hover:bg-slate-100"
          >
            🏠 Dashboard
          </Link>
        </li>

        <li>
          <Link
            href="/property"
            className="block rounded-lg px-3 py-2 transition hover:bg-slate-100"
          >
            🏢 Properties
          </Link>
        </li>

        <li>
          <Link
            href="/room"
            className="block rounded-lg px-3 py-2 transition hover:bg-slate-100"
          >
            🚪 Rooms
          </Link>
        </li>

        <li>
          <Link
            href="/tenant"
            className="block rounded-lg px-3 py-2 transition hover:bg-slate-100"
          >
            👤 Tenants
          </Link>
        </li>

        <li>
          <Link
            href="/dashboard/tenancies"
            className="block rounded-lg px-3 py-2 transition hover:bg-slate-100"
          >
            🏠 Tenancies
          </Link>
        </li>

        <li>
          <Link
            href="/dashboard/invoices"
            className="block rounded-lg px-3 py-2 transition hover:bg-slate-100"
          >
            📄 Invoices
          </Link>
        </li>

        <li>
          <Link
            href="/payment"
            className="block rounded-lg px-3 py-2 transition hover:bg-slate-100"
          >
            💰 Payments
          </Link>
        </li>

        <li>
          <Link
            href="/expense"
            className="block rounded-lg px-3 py-2 transition hover:bg-slate-100"
          >
            💸 Expenses
          </Link>
        </li>

        <li>
          <Link
            href="/dashboard/reports"
            className="block rounded-lg px-3 py-2 transition hover:bg-slate-100"
          >
            📊 Reports
          </Link>
        </li>

        <li>
          <span className="block rounded-lg px-3 py-2 text-gray-400">
            ⚙️ Settings (Coming Soon)
          </span>
        </li>
      </ul>
    </aside>
  );
}