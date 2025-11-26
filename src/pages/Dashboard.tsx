import { Activity, AlertTriangle, Car, Clock, TrendingUp, Gauge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/dashboard/StatsCard";
import AlertsSidebar from "@/components/dashboard/AlertsSidebar";
import TrafficChart from "@/components/dashboard/TrafficChart";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Vehicles",
      value: "1,284",
      change: "+12%",
      trend: "up" as const,
      icon: Car,
    },
    {
      title: "Average Speed",
      value: "32 km/h",
      change: "-3%",
      trend: "down" as const,
      icon: Gauge,
    },
    {
      title: "Active Violations",
      value: "23",
      change: "+8%",
      trend: "up" as const,
      icon: AlertTriangle,
    },
    {
      title: "System Uptime",
      value: "99.8%",
      change: "+0.2%",
      trend: "up" as const,
      icon: Activity,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Traffic Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring and analytics</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Traffic Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TrafficChart />
            </CardContent>
          </Card>

          <AlertsSidebar />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
