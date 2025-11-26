import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, LogOut, Shield, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const navItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { title: "Violations", icon: FileText, path: "/violations" },
    { title: "Entry/Exit", icon: ArrowLeftRight, path: "/entry-exit" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Traffic Command</h1>
              <p className="text-xs text-muted-foreground">Monitoring System</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-secondary"
                activeClassName="bg-secondary text-primary"
              >
                <item.icon className="w-4 h-4 inline mr-2" />
                {item.title}
              </NavLink>
            ))}
          </nav>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="border-border hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border py-2 px-4">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg text-xs font-medium transition-colors"
              activeClassName="text-primary bg-secondary"
            >
              <item.icon className="w-5 h-5" />
              {item.title}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default DashboardLayout;
