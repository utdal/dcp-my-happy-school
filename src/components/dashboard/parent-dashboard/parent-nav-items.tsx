import { Home, Shield as Child, Calendar, FileText, BookOpen, MessageSquare, Settings, LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ParentNavItemsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export default function ParentNavItems({ activeTab, setActiveTab, onLogout }: ParentNavItemsProps) {
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
        variant={activeTab === "children" ? "default" : "ghost"} 
        className="w-full justify-start" 
        onClick={() => setActiveTab("children")}
      >
        <Child className="mr-2 h-4 w-4" />
        My Children
      </Button>
      <Button 
        variant={activeTab === "attendance" ? "default" : "ghost"} 
        className="w-full justify-start" 
        onClick={() => setActiveTab("attendance")}
      >
        <Calendar className="mr-2 h-4 w-4" />
        Attendance
      </Button>
      <Button 
        variant={activeTab === "grades" ? "default" : "ghost"} 
        className="w-full justify-start" 
        onClick={() => setActiveTab("grades")}
      >
        <FileText className="mr-2 h-4 w-4" />
        Grades & Reports
      </Button>
      <Button 
        variant={activeTab === "homework" ? "default" : "ghost"} 
        className="w-full justify-start" 
        onClick={() => setActiveTab("homework")}
      >
        <BookOpen className="mr-2 h-4 w-4" />
        Homework
      </Button>
      <Button 
        variant={activeTab === "announcements" ? "default" : "ghost"} 
        className="w-full justify-start" 
        onClick={() => setActiveTab("announcements")}
      >
        <Bell className="mr-2 h-4 w-4" />
        Announcements
      </Button>
      <Button 
        variant={activeTab === "messages" ? "default" : "ghost"} 
        className="w-full justify-start" 
        onClick={() => setActiveTab("messages")}
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        Teacher Messages
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