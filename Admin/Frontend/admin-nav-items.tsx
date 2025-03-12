import { 
  Home, 
  Users, 
  Database, 
  Bell, 
  BarChart, 
  Settings, 
  LogOut 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface AdminNavItemsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export default function AdminNavItems({ activeTab, setActiveTab, onLogout }: AdminNavItemsProps) {
  return (
    <div className="space-y-1">
      <Button 
        variant={activeTab === "overview" ? "default" : "ghost"} 
        className="w-full justify-start" 
        onClick={() => setActiveTab("overview")}
      >
        <Home className="mr-2 h-4 w-4" />
        Overview
      </Button>
      <Button 
        variant={activeTab === "users" ? "default" : "ghost"} 
        className="w-full justify-start" 
        onClick={() => setActiveTab("users")}
      >
        <Users className="mr-2 h-4 w-4" />
        User Management
      </Button>
      <Button 
        variant={activeTab === "enrollment" ? "default" : "ghost"} 
        className="w-full justify-start" 
        onClick={() => setActiveTab("enrollment")}
      >
        <Database className="mr-2 h-4 w-4" />
        Enrollment Management
      </Button>
      <Button 
        variant={activeTab === "announcements" ? "default" : "ghost"} 
        className="w-full justify-start" 
        onClick={() => setActiveTab("announcements")}
      >
        <Bell className="mr-2 h-4 w-4" />
        Announcements
      </Button>
      <Separator className="my-4" />
      <Button 
        variant={activeTab === "settings" ? "default" : "ghost"} 
        className="w-full justify-start" 
        onClick={() => setActiveTab("settings")}
      >
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </Button>
      <Button 
        variant="ghost" 
        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
        onClick={onLogout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  );
}