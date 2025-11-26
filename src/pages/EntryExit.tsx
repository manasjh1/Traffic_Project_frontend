import { useState } from "react";
import { Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EntryExitTable from "@/components/entry-exit/EntryExitTable";
import DashboardLayout from "@/components/layout/DashboardLayout";

const EntryExit = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Vehicle Entry/Exit Logs</h1>
            <p className="text-muted-foreground">Track all vehicle movements across campus gates</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search license plates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
            <Button variant="outline" size="icon" className="border-border">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <EntryExitTable searchTerm={searchTerm} />
      </div>
    </DashboardLayout>
  );
};

export default EntryExit;
