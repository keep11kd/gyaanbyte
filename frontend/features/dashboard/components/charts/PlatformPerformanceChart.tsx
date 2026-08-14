"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui";

export interface ChartDataPoint {
  month: string;
  students: number;
  engagement: number;
  [key: string]: string | number;
}

export interface PlatformPerformanceChartProps {
  title?: string;
  subtitle?: string;
  data?: ChartDataPoint[];
  className?: string;
}

const defaultPerformanceData: ChartDataPoint[] = [
  { month: "Jan", students: 820, engagement: 68 },
  { month: "Feb", students: 890, engagement: 72 },
  { month: "Mar", students: 960, engagement: 75 },
  { month: "Apr", students: 1040, engagement: 78 },
  { month: "May", students: 1120, engagement: 82 },
  { month: "Jun", students: 1180, engagement: 86 },
  { month: "Jul", students: 1248, engagement: 91 },
];

export default function PlatformPerformanceChart({
  title = "Platform Progress & Performance",
  subtitle = "Monthly student activity & course engagement metrics",
  data = defaultPerformanceData,
  className,
}: Readonly<PlatformPerformanceChartProps>) {
  return (
    <Card className={`border-slate-200/80 bg-white shadow-xs ${className ?? ""}`.trim()}>
      <CardHeader className="flex-row items-start justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>

        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          Last {data.length} Months
        </span>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -10,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 11 }}
              />

              {/* Left Y-Axis for Students */}
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 11 }}
              />

              {/* Right Y-Axis for Engagement Percentage */}
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 11 }}
                unit="%"
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
                }}
              />

              <Line
                yAxisId="left"
                type="monotone"
                dataKey="students"
                name="Students"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5 }}
              />

              <Line
                yAxisId="right"
                type="monotone"
                dataKey="engagement"
                name="Engagement"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex items-center gap-6 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
            Students
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Engagement %
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
