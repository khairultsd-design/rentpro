import { getDashboardData } from "@/features/dashboard/services/dashboard.service";
import RecentPayments from "@/features/dashboard/components/RecentPayments";
import OutstandingInvoices from "@/features/dashboard/components/OutstandingInvoices";
import DashboardChart from "@/features/dashboard/components/DashboardChart";
// Inline fallback component for RecentExpenses to avoid import errors
function RecentExpenses({ expenses }: { expenses?: any[] }) {
  return (
    <div>
      <h2 className="text-lg font-medium">Recent Expenses</h2>
      <div className="mt-4 space-y-2">
        {expenses && expenses.length > 0 ? (
          expenses.map((exp, idx) => (
            <div key={idx} className="p-3 border rounded">
              <div className="text-sm font-semibold">{exp.title || `Expense ${idx + 1}`}</div>
              <div className="text-sm text-muted-foreground">{exp.date}</div>
              <div className="text-sm">{typeof exp.amount === 'number' ? `RM ${exp.amount.toFixed(2)}` : exp.amount}</div>
            </div>
          ))
        ) : (
          <div className="text-sm text-muted-foreground">No recent expenses</div>
        )}
      </div>
    </div>
  );
}
import MetricCard from "@/components/MetricCard";
import PageHeader from "@/components/PageHeader";
import { formatCurrency } from "@/lib/format";

export default async function Home() {
  const dashboard = await getDashboardData();
const stats = dashboard.stats;
const recentPayments = dashboard.recentPayments;
const chartData = dashboard.chartData;

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
{
  title: "🏠 Occupancy Rate",
  value: `${stats.occupancyRate}%`,
},
{
  title: "💳 Collection Rate",
  value: `${stats.collectionRate}%`,
},
{
  title: "📉 Expense Ratio",
  value: `${stats.expenseRatio}%`,
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

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <MetricCard
            key={card.title}
            title={card.title}
            value={card.value}
          />
        ))}
      </div>
<DashboardChart data={chartData} />
<div className="grid gap-6 xl:grid-cols-3">
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
</div>
    </div>
  );
}