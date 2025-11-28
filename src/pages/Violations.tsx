import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ViolationsTable from "@/components/violations/ViolationsTable";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Violations = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Violation Logs</h1>
            <p className="text-muted-foreground">Comprehensive violation records and analysis</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search license plates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
        </div>

        <ViolationsTable searchTerm={searchTerm} />
      </div>
    </DashboardLayout>
  );
};

export default Violations;
