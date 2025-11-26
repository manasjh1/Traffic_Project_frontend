import { AlertTriangle, AlertCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const alerts = [
  {
    id: 1,
    type: "accident" as const,
    message: "Vehicle collision detected at Gate 2",
    time: "2 mins ago",
    severity: "high",
  },
  {
    id: 2,
    type: "warning" as const,
    message: "Speed violation: ABC-1234 exceeding limit",
    time: "5 mins ago",
    severity: "medium",
  },
  {
    id: 3,
    type: "warning" as const,
    message: "Unauthorized parking detected",
    time: "12 mins ago",
    severity: "medium",
  },
  {
    id: 4,
    type: "accident" as const,
    message: "Emergency vehicle access required",
    time: "15 mins ago",
    severity: "high",
  },
  {
    id: 5,
    type: "warning" as const,
    message: "Traffic congestion at Main Entry",
    time: "18 mins ago",
    severity: "low",
  },
  {
    id: 6,
    type: "warning" as const,
    message: "Wrong-way vehicle detected",
    time: "22 mins ago",
    severity: "medium",
  },
];

const AlertsSidebar = () => {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-warning" />
          Live Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="space-y-2 p-4 pt-0">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border transition-all hover:scale-[1.02] ${
                  alert.type === "accident"
                    ? "bg-destructive/10 border-destructive/50"
                    : "bg-warning/10 border-warning/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  {alert.type === "accident" ? (
                    <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-tight">{alert.message}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{alert.time}</span>
                    </div>
                  </div>
                  <Badge
                    variant={alert.type === "accident" ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {alert.type === "accident" ? "Critical" : "Alert"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AlertsSidebar;
