import { getDashboardStats } from "@/features/dashboard/services/dashboard.service";
import StatCard from "@/components/StatCard";
import PageHeader from "@/components/PageHeader";
import { formatCurrency } from "@/lib/format";

export default async function Home() {
  const stats = await getDashboardStats();

  const cards = [
    {
      title: "🏢 Properties",
      value: stats.totalProperties,
    },
    {
      title: "🚪 Rooms",
      value: stats.totalRooms,
    },
    {
      title: "🟢 Available Rooms",
      value: stats.availableRooms,
    },
    {
      title: "👤 Active Tenants",
      value: stats.activeTenants,
    },
    {
      title: "📄 Active Tenancies",
      value: stats.activeTenancies,
    },
    {
      title: "💰 Total Collection",
      value: `RM ${stats.collection.toFixed(2)}`,
    },
    {
      title: "💸 Outstanding",
      value: `RM ${stats.outstanding.toFixed(2)}`,
    },
    {
      title: "⚠️ Overdue Invoices",
      value: stats.overdueInvoices,
    },
    {
  title: "💸 Expenses",
  value: formatCurrency(stats.expenses),
},
{
  title: "📈 Net Profit",
  value: formatCurrency(stats.profit),
},
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <PageHeader
  title="Dashboard"
  description="Welcome to RentPro Management System"
/>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
  <StatCard
    key={card.title}
    title={card.title}
    value={card.value}
  />
))}
      </div>
    </div>
  );
}