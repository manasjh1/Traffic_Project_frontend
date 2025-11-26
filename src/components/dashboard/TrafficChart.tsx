import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { time: "00:00", vehicles: 45 },
  { time: "02:00", vehicles: 32 },
  { time: "04:00", vehicles: 28 },
  { time: "06:00", vehicles: 89 },
  { time: "08:00", vehicles: 156 },
  { time: "10:00", vehicles: 178 },
  { time: "12:00", vehicles: 198 },
  { time: "14:00", vehicles: 165 },
  { time: "16:00", vehicles: 187 },
  { time: "18:00", vehicles: 145 },
  { time: "20:00", vehicles: 98 },
  { time: "22:00", vehicles: 67 },
];

const TrafficChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorVehicles" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="time"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
          labelStyle={{ color: "hsl(var(--foreground))" }}
        />
        <Area
          type="monotone"
          dataKey="vehicles"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorVehicles)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TrafficChart;
