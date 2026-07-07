import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow min-h-screen p-5">
      <h2 className="text-lg font-bold mb-6">
        Menu
      </h2>

      <ul className="space-y-3">

        <li>
          <Link href="/">🏠 Dashboard</Link>
        </li>

        <li>
          <Link href="/property">🏢 Properties</Link>
        </li>

        <li>
          <Link href="/room">🚪 Rooms</Link>
        </li>

        <li>
          <Link href="/tenant">👤 Tenants</Link>
        </li>

<li>
  <Link href="/dashboard/invoices">
    📄 Invoices
  </Link>
</li>

        <li>
          <Link href="/payment">💰 Payments</Link>
        </li>

        <li>
          <span className="cursor-not-allowed text-gray-400">
  📊 Reports (Coming Soon)
</span>

          <span className="cursor-not-allowed text-gray-400">
  ⚙️ Settings (Coming Soon)
  </span>
        </li>

<li>
  <Link href="/expense">
    💸 Expenses
  </Link>
</li>
      </ul>
    </aside>
  );
}