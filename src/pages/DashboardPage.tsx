import StatsCard from "../components/cards/StatsCard";
import RevenueChart from "../components/charts/RevenueChart";
import UserActivity from "../components/charts/UserActivity";

const DashboardPage = () => {
  const handleRevenueChartPeriodChange = (
    period: "daily" | "weekly" | "annually"
  ) => {
    console.log("Revenue chart period changed to:", period);
    // Handle backend API call here
  };

  const handleUserActivityPeriodChange = (
    period: "daily" | "weekly" | "monthly"
  ) => {
    console.log("User activity period changed to:", period);
    // Handle backend API call here
  };

  // Sample data for the area chart
  const areaData = [
    { month: "JAN", value: 2800 },
    { month: "FEB", value: 3200 },
    { month: "MAR", value: 2400 },
    { month: "APR", value: 3800 },
    { month: "MAY", value: 3600 },
    { month: "JUN", value: 3000 },
    { month: "JUL", value: 3400 },
    { month: "AUG", value: 4200 },
    { month: "SEP", value: 3800 },
    { month: "OCT", value: 2800 },
    { month: "NOV", value: 3200 },
    { month: "DEC", value: 3600 },
  ];

  // Sample data for the pie chart
  const pieData = [
    { name: "Active", value: 52.1, color: "#10B981" },
    { name: "Inactive", value: 10.8, color: "#F97316" },
    { name: "Trial", value: 22.8, color: "#EAB308" },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Show all Information</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Users" value="15,420" change="+8.2%" />
        <StatsCard title="Active Subscriptions" value="298" change="+18.2%" />
        <StatsCard title="Monthly Revenue" value="$1250K" change="+18.2%" />
        <StatsCard title="Total Transactions" value="1,250" change="+18.2%" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart onPeriodChange={handleRevenueChartPeriodChange} />
        <UserActivity onPeriodChange={handleUserActivityPeriodChange} />
      </div>
    </div>
  );
};

export default DashboardPage;
