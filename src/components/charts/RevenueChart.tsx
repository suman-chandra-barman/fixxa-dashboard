import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface RevenueData {
  period: string;
  value: number;
}

interface RevenueChartProps {
  onPeriodChange?: (period: "daily" | "weekly" | "annually") => void;
}

const RevenueChart = ({ onPeriodChange }: RevenueChartProps) => {
  const [activePeriod, setActivePeriod] = useState<
    "daily" | "weekly" | "annually"
  >("annually");
  const [data, setData] = useState<RevenueData[]>([
    { period: "JAN", value: 2800 },
    { period: "FEB", value: 3200 },
    { period: "MAR", value: 2400 },
    { period: "APR", value: 3800 },
    { period: "MAY", value: 3600 },
    { period: "JUN", value: 3000 },
    { period: "JUL", value: 3400 },
    { period: "AUG", value: 4200 },
    { period: "SEP", value: 3800 },
    { period: "OCT", value: 2800 },
    { period: "NOV", value: 3200 },
    { period: "DEC", value: 3600 },
  ]);

  const fetchRevenueData = async (period: "daily" | "weekly" | "annually") => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    let newData: RevenueData[] = [];

    switch (period) {
      case "daily":
        newData = [
          { period: "Mon", value: 1200 },
          { period: "Tue", value: 1800 },
          { period: "Wed", value: 1600 },
          { period: "Thu", value: 2200 },
          { period: "Fri", value: 2800 },
          { period: "Sat", value: 2400 },
          { period: "Sun", value: 1900 },
        ];
        break;
      case "weekly":
        newData = [
          { period: "W1", value: 8500 },
          { period: "W2", value: 9200 },
          { period: "W3", value: 7800 },
          { period: "W4", value: 10500 },
          { period: "W5", value: 11200 },
          { period: "W6", value: 9800 },
        ];
        break;
      case "annually":
        newData = [
          { period: "JAN", value: 2800 },
          { period: "FEB", value: 3200 },
          { period: "MAR", value: 2400 },
          { period: "APR", value: 3800 },
          { period: "MAY", value: 3600 },
          { period: "JUN", value: 3000 },
          { period: "JUL", value: 3400 },
          { period: "AUG", value: 4200 },
          { period: "SEP", value: 3800 },
          { period: "OCT", value: 2800 },
          { period: "NOV", value: 3200 },
          { period: "DEC", value: 3600 },
        ];
        break;
    }

    setData(newData);
  };

  const handlePeriodChange = async (
    period: "daily" | "weekly" | "annually"
  ) => {
    setActivePeriod(period);
    await fetchRevenueData(period);
    onPeriodChange?.(period);
  };

  const currentValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="lg:col-span-2 border border-gray-200 rounded-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-gray-900">
                ${(currentValue / 1000).toFixed(0)}K
              </span>
              <span className="text-sm font-medium text-green-600 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                1.3% LAST YEAR
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePeriodChange("daily")}
              className={`text-sm ${
                activePeriod === "daily"
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              Daily
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePeriodChange("weekly")}
              className={`text-sm ${
                activePeriod === "weekly"
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              Weekly
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePeriodChange("annually")}
              className={`text-sm ${
                activePeriod === "annually"
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              Annually
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <XAxis
                dataKey="period"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
