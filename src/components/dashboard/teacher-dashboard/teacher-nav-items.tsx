import { 
  Home, 
  BookOpen, 
  ClipboardList, 
  PenTool, 
  MessageSquare, 
  Settings, 
  LogOut,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface TeacherNavItemsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export default function TeacherNavItems({ activeTab, setActiveTab, onLogout }: TeacherNavItemsProps) {
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
        variant={activeTab === "classes" ? "default" : "ghost"} 
        className="w-full justify-start" 
        onClick={() => setActiveTab("classes")}
      >
        <BookOpen className="mr-2 h-4 w-4" />
        Class Management
      </Button>
      <Button 
        variant={activeTab === "assignments" ? "default" : "ghost"} 
        className="w-full justify-start" 
        onClick={() => setActiveTab("assignments")}
      >
        <ClipboardList className="mr-2 h-4 w-4" />
        Assignments
      </Button>
      <Button 
        variant={activeTab === "grades" ? "default" : "ghost"} 
        className="w-full justify-start" 
        onClick={() => setActiveTab("grades")}
      >
        <PenTool className="mr-2 h-4 w-4" />
        Grade Tracking
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
        Parent Communication
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