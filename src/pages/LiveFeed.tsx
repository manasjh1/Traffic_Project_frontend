import { useEffect, useState } from "react";
import { Radio, Car, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface LiveVehicle {
  id: string;
  licensePlate: string;
  vehicleType: string;
  timestamp: string;
  gate: string;
  type: "entry" | "exit";
  image?: string;
}

const LiveFeed = () => {
  const [vehicles, setVehicles] = useState<LiveVehicle[]>([
    {
      id: "L-001",
      licensePlate: "ABC-1234",
      vehicleType: "Car",
      timestamp: new Date().toISOString(),
      gate: "Gate 1 - Main Entry",
      type: "entry",
    },
    {
      id: "L-002",
      licensePlate: "XYZ-5678",
      vehicleType: "Bike",
      timestamp: new Date(Date.now() - 30000).toISOString(),
      gate: "Gate 2 - South Entry",
      type: "exit",
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const vehicleTypes = ["Car", "Bike", "Bus", "Truck"];
      const gates = ["Gate 1 - Main Entry", "Gate 2 - South Entry", "Gate 3 - Service Entry"];
      const types: ("entry" | "exit")[] = ["entry", "exit"];
      
      const newVehicle: LiveVehicle = {
        id: `L-${Date.now()}`,
        licensePlate: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(1000 + Math.random() * 9000)}`,
        vehicleType: vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)],
        timestamp: new Date().toISOString(),
        gate: gates[Math.floor(Math.random() * gates.length)],
        type: types[Math.floor(Math.random() * types.length)],
      };

      setVehicles((prev) => [newVehicle, ...prev].slice(0, 20));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getTimeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <Radio className="w-8 h-8 text-primary animate-pulse" />
              Live Vehicle Traffic Feed
            </h1>
            <p className="text-muted-foreground">Real-time monitoring of all vehicle movements</p>
          </div>
          <Badge variant="outline" className="bg-success/20 text-success border-success/50 animate-pulse px-4 py-2 text-sm">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            Live
          </Badge>
        </div>

        <div className="grid gap-4">
          {vehicles.map((vehicle, index) => (
            <Card 
              key={vehicle.id}
              className="border-border bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-3 rounded-lg ${
                      vehicle.type === "entry" 
                        ? "bg-success/20 text-success" 
                        : "bg-destructive/20 text-destructive"
                    }`}>
                      <Car className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <code className="px-3 py-1.5 bg-secondary rounded-lg text-base font-mono font-semibold">
                          {vehicle.licensePlate}
                        </code>
                        <Badge 
                          variant="outline"
                          className={vehicle.type === "entry" 
                            ? "bg-success/20 text-success border-success/50" 
                            : "bg-destructive/20 text-destructive border-destructive/50"
                          }
                        >
                          {vehicle.type === "entry" ? "Entry" : "Exit"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {vehicle.vehicleType}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{vehicle.gate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{formatTime(vehicle.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">
                      {getTimeAgo(vehicle.timestamp)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {vehicles.length === 0 && (
          <Card className="border-border bg-card">
            <CardContent className="p-12 text-center">
              <Radio className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Waiting for vehicle activity...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LiveFeed;
