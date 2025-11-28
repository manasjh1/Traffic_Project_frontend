import { useState } from "react";
import { ArrowUpDown, LogIn, LogOut, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EntryExitTableProps {
  searchTerm: string;
}

interface EntryExitRecord {
  id: string;
  licensePlate: string;
  vehicleType: string;
  entryTime: string;
  exitTime: string | null;
  gate: string;
  duration: string | null;
  status: "inside" | "exited";
}

const mockRecords: EntryExitRecord[] = [
  {
    id: "E-001",
    licensePlate: "UP 32 AO 1234",
    vehicleType: "Car",
    entryTime: "2025-11-25 14:32:15",
    exitTime: null,
    gate: "Gate 1 - Main Entry",
    duration: null,
    status: "inside",
  },
  {
    id: "E-002",
    licensePlate: "UP 70 CU 5678",
    vehicleType: "Bike",
    entryTime: "2025-11-25 13:15:42",
    exitTime: "2025-11-25 16:22:18",
    gate: "Gate 2 - South Entry",
    duration: "3h 6m",
    status: "exited",
  },
  {
    id: "E-003",
    licensePlate: "UP 14 EH 9012",
    vehicleType: "Car",
    entryTime: "2025-11-25 12:08:33",
    exitTime: "2025-11-25 14:45:21",
    gate: "Gate 1 - Main Entry",
    duration: "2h 37m",
    status: "exited",
  },
  {
    id: "E-004",
    licensePlate: "UP 78 GS 3456",
    vehicleType: "Bus",
    entryTime: "2025-11-25 11:45:21",
    exitTime: null,
    gate: "Gate 3 - Service Entry",
    duration: null,
    status: "inside",
  },
  {
    id: "E-005",
    licensePlate: "UP 15 JY 7890",
    vehicleType: "Car",
    entryTime: "2025-11-25 10:22:18",
    exitTime: "2025-11-25 15:10:33",
    gate: "Gate 1 - Main Entry",
    duration: "4h 48m",
    status: "exited",
  },
  {
    id: "E-006",
    licensePlate: "UP 80 PQ 1357",
    vehicleType: "Bike",
    entryTime: "2025-11-25 09:15:45",
    exitTime: "2025-11-25 17:30:12",
    gate: "Gate 2 - South Entry",
    duration: "8h 15m",
    status: "exited",
  },
  {
    id: "E-007",
    licensePlate: "UP 16 RW 8642",
    vehicleType: "Car",
    entryTime: "2025-11-25 08:45:30",
    exitTime: null,
    gate: "Gate 1 - Main Entry",
    duration: null,
    status: "inside",
  },
  {
    id: "E-008",
    licensePlate: "UP 32 AO 1234",
    vehicleType: "Bike",
    entryTime: "2025-11-25 08:30:15",
    exitTime: "2025-11-25 12:15:42",
    gate: "Gate 2 - South Entry",
    duration: "3h 45m",
    status: "exited",
  },
];
const EntryExitTable = ({ searchTerm }: EntryExitTableProps) => {
  const [sortField, setSortField] = useState<keyof EntryExitRecord>("entryTime");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: keyof EntryExitRecord) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredRecords = mockRecords.filter((record) =>
    record.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const multiplier = sortDirection === "asc" ? 1 : -1;
    
    if (aValue === null) return 1;
    if (bValue === null) return -1;
    
    return aValue > bValue ? multiplier : -multiplier;
  });

  return (
    <Card className="border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort("id")}
                className="hover:bg-secondary"
              >
                ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort("licensePlate")}
                className="hover:bg-secondary"
              >
                License Plate
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Vehicle Type</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort("entryTime")}
                className="hover:bg-secondary"
              >
                Entry Time
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort("exitTime")}
                className="hover:bg-secondary"
              >
                Exit Time
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Gate</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRecords.map((record) => (
            <TableRow key={record.id} className="hover:bg-secondary/50 border-border">
              <TableCell className="font-medium">{record.id}</TableCell>
              <TableCell>
                <code className="px-2 py-1 bg-secondary rounded text-sm font-mono">
                  {record.licensePlate}
                </code>
              </TableCell>
              <TableCell className="text-sm">{record.vehicleType}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm">
                  <LogIn className="w-4 h-4 text-success" />
                  <span className="text-muted-foreground">{record.entryTime}</span>
                </div>
              </TableCell>
              <TableCell>
                {record.exitTime ? (
                  <div className="flex items-center gap-2 text-sm">
                    <LogOut className="w-4 h-4 text-destructive" />
                    <span className="text-muted-foreground">{record.exitTime}</span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{record.gate}</TableCell>
              <TableCell>
                {record.duration ? (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span>{record.duration}</span>
                  </div>
                ) : (
                  <Badge variant="outline" className="bg-primary/20 text-primary border-primary/50 animate-pulse-slow">
                    Active
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    record.status === "inside"
                      ? "bg-success/20 text-success border-success/50"
                      : "bg-muted text-muted-foreground border-border"
                  }
                >
                  {record.status === "inside" ? "Inside Campus" : "Exited"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default EntryExitTable;
