"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

type ChartData = {
  month: string;
  income: number;
  expense: number;
};

type Props = {
  data: ChartData[];
};

export default function DashboardChart({
  data,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        Monthly Income vs Expense
      </h2>

      <ResponsiveContainer width="100%" height={420}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis
  tickFormatter={(value) => `RM ${value}`}
/>
          <Tooltip
  formatter={(value) => {
    const amount = typeof value === "number" ? value : Number(value || 0);
    return [`RM ${amount.toFixed(2)}`, ""];
  }}
/>
          <Legend
  verticalAlign="top"
  height={36}
/>

          <Bar
            dataKey="income"
            name="Income"
            fill="#22c55e"
            radius={[6, 6, 0, 0]}
          />

          <Bar
            dataKey="expense"
            name="Expense"
            fill="#ef4444"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}