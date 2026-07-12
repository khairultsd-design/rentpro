import { getDashboardData } from "@/features/dashboard/services/dashboard.service";
import RecentPayments from "@/features/dashboard/components/RecentPayments";
import RecentExpenses from "@/features/dashboard/components/RecentExpenses";
import OutstandingInvoices from "@/features/dashboard/components/OutstandingInvoices";
import DashboardChart from "@/features/dashboard/components/DashboardChart";
import GenerateInvoicesButton from "@/features/invoice/components/GenerateInvoicesButton";
// Inline fallback component for RecentExpenses to avoid import errors

import MetricCard from "@/components/MetricCard";
import PageHeader from "@/components/PageHeader";
import { formatCurrency } from "@/lib/format";
import RecentActivity from "@/features/dashboard/components/RecentActivity";
import { getRecentActivities } from "@/features/dashboard/services/activity.service";

export default async function Home() {
  const dashboard = await getDashboardData();
const stats = dashboard.stats;
const recentPayments = dashboard.recentPayments;
const chartData = dashboard.chartData;
const activities = await getRecentActivities();
const cards = [
  {
    title: "🏢 Properties",
    value: stats.totalProperties,
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
    title: "🏠 Occupancy Rate",
    value: `${stats.occupancyRate}%`,
  },
  {
    title: "💰 Total Collection",
    value: formatCurrency(stats.collection),
  },
  {
    title: "💸 Expenses",
    value: formatCurrency(stats.expenses),
  },
  {
    title: "📈 Net Profit",
    value: formatCurrency(stats.profit),
  },
  {
    title: "⚠️ Overdue Invoices",
    value: stats.overdueInvoices,
  },
  {
    title: "💸 Outstanding",
    value: formatCurrency(stats.outstanding),
  },
];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
 <PageHeader
  title="Dashboard"
  description="Overview of your rental business"
/>
        </div>

        <GenerateInvoicesButton />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {cards.map((card) => (
          <MetricCard
            key={card.title}
            title={card.title}
            value={card.value}
          />
        ))}
      </div>

      <div className="mb-8">
  <DashboardChart data={chartData} />
</div>

<div className="grid gap-6 xl:grid-cols-2">
        <RecentPayments
          payments={dashboard.recentPayments.map((p: any) => ({
            ...p,
            paymentDate: p.paymentDate instanceof Date ? p.paymentDate.toISOString() : String(p.paymentDate),
          }))}
        />

        <RecentExpenses
          expenses={dashboard.recentExpenses}
        />

        <OutstandingInvoices
          invoices={dashboard.recentOutstandingInvoices}
        />
        <RecentActivity
  activities={activities}
/>
      </div>
    </div>
  );
}