import { getFinancialReport } from "@/features/reports/services/report.service";
import { formatCurrency } from "@/lib/format";
import ReportFilter from "@/features/reports/components/ReportFilter";
import ReportTransactions from "@/features/reports/components/ReportTransactions";
import PageHeader from "@/components/PageHeader";
import MetricCard from "@/components/MetricCard";
import ExportPdfButton from "@/features/reports/components/ExportPdfButton";
import { requireRole } from "@/lib/auth";

type ReportsPageProps = {
  searchParams: Promise<{
    month?: string;
    year?: string;
  }>;
};

export default async function ReportsPage({
  searchParams,
}: ReportsPageProps) {
  const params = await searchParams;
await requireRole(["ADMIN", "MANAGER"]);
const today = new Date();

const month = Number(
  params.month ?? today.getMonth() + 1
);

const year = Number(
  params.year ?? today.getFullYear()
);

const report = await getFinancialReport(
  month,
  year
);

  return (
    <div className="space-y-6 p-6">
      <PageHeader
  title="Financial Reports"
  description={`Report for ${month}/${year}`}
  actions={<ExportPdfButton report={report} />}
/>
<ReportFilter
  month={month}
  year={year}
/>

      
        <MetricCard
          title="Income"
          value={formatCurrency(report.income)}
        />

        <MetricCard
          title="Expenses"
          value={formatCurrency(report.expenses)}
        />

        <MetricCard
          title="Net Profit"
          value={formatCurrency(report.profit)}
        />

        <MetricCard
          title="Outstanding"
          value={formatCurrency(report.outstanding)}
        />

        <MetricCard
          title="Occupancy"
          value={`${report.occupancy}%`}
        />
        <ReportTransactions
  payments={report.payments}
  expenses={report.expensesList}
/>
      </div>
  );
}