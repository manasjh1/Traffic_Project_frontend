import { useState } from "react";
import { ArrowUpDown, Camera } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ViolationsTableProps {
  searchTerm: string;
}

interface Violation {
  id: string;
  timestamp: string;
  licensePlate: string;
  violationType: string;
  location: string;
  status: "pending" | "reviewed" | "resolved";
  imageUrl: string;
}

const mockViolations: Violation[] = [
  {
    id: "V-001",
    timestamp: "2024-01-20 14:32:15",
    licensePlate: "UP 32 AO 1234",
    violationType: "Speed Violation",
    location: "Gate 2 - Main Entry",
    status: "pending",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "V-002",
    timestamp: "2024-01-20 13:15:42",
    licensePlate: "UP 70 CU 5678",
    violationType: "Wrong Parking",
    location: "Parking Lot A",
    status: "reviewed",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "V-003",
    timestamp: "2024-01-20 12:08:33",
    licensePlate: "UP 14 EH 9012",
    violationType: "Red Light",
    location: "Intersection 1",
    status: "resolved",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "V-004",
    timestamp: "2024-01-20 11:45:21",
    licensePlate: "UP 78 GS 3456",
    violationType: "Speed Violation",
    location: "Campus Road",
    status: "pending",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "V-005",
    timestamp: "2024-01-20 10:22:18",
    licensePlate: "UP 15 JY 7890",
    violationType: "No Permit",
    location: "Faculty Parking",
    status: "reviewed",
    imageUrl: "/placeholder.svg",
  },
];
const ViolationsTable = ({ searchTerm }: ViolationsTableProps) => {
  const [sortField, setSortField] = useState<keyof Violation>("timestamp");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: keyof Violation) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredViolations = mockViolations.filter((violation) =>
    violation.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedViolations = [...filteredViolations].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const multiplier = sortDirection === "asc" ? 1 : -1;
    return aValue > bValue ? multiplier : -multiplier;
  });

  const getStatusBadge = (status: Violation["status"]) => {
    const variants = {
      pending: "bg-warning/20 text-warning border-warning/50",
      reviewed: "bg-primary/20 text-primary border-primary/50",
      resolved: "bg-success/20 text-success border-success/50",
    };
    return variants[status];
  };

  return (
    <Card className="border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="w-24">Snapshot</TableHead>
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
                onClick={() => handleSort("timestamp")}
                className="hover:bg-secondary"
              >
                Timestamp
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
            <TableHead>Violation Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedViolations.map((violation) => (
            <TableRow key={violation.id} className="hover:bg-secondary/50 border-border">
              <TableCell>
                <Avatar className="w-16 h-12 rounded-md">
                  <AvatarImage src={violation.imageUrl} alt="Violation snapshot" />
                  <AvatarFallback className="rounded-md bg-muted">
                    <Camera className="w-6 h-6 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{violation.id}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {violation.timestamp}
              </TableCell>
              <TableCell>
                <code className="px-2 py-1 bg-secondary rounded text-sm font-mono">
                  {violation.licensePlate}
                </code>
              </TableCell>
              <TableCell>{violation.violationType}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {violation.location}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusBadge(violation.status)}>
                  {violation.status.charAt(0).toUpperCase() + violation.status.slice(1)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ViolationsTable;
