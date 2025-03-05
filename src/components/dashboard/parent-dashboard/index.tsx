import { useState, useEffect } from "react";
import { LogOut, Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User as AppUser } from "@/App";

import ParentNavItems from "./parent-nav-items";
import ParentOverview from "./parent-overview";
import ParentChildren from "./parent-children";
import ParentHomework from "./parent-homework";
import ParentAttendance from "./parent-attendance";
import ParentGrades from "./parent-grades";
import ParentMessages from "./parent-messages";
import ParentSettings from "./parent-settings";
import ParentAnnouncements from "./parent-announcements";

interface ParentDashboardProps {
  user: AppUser;
  onLogout: () => void;
}

export default function ParentDashboard({ user, onLogout }: ParentDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Listen for navigation events from child components
  useEffect(() => {
    const handleSectionNavigation = (e) => {
      setActiveTab(e.detail.section);
    };

    window.addEventListener('navigateToSection', handleSectionNavigation);
    
    return () => {
      window.removeEventListener('navigateToSection', handleSectionNavigation);
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <ParentOverview />;
      case "children":
        return <ParentChildren />;
      case "homework":
        return <ParentHomework />;
      case "attendance":
        return <ParentAttendance />;
      case "grades":
        return <ParentGrades />;
      case "announcements":
        return <ParentAnnouncements />;
      case "messages":
        return <ParentMessages />;
      case "settings":
        return <ParentSettings />;
      default:
        return (
          <div className="flex items-center justify-center h-64 border rounded-lg bg-white dark:bg-gray-800">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module</h2>
              <p className="text-muted-foreground">This section is under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 border-b bg-rose-600 text-white">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-rose-700">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex items-center mb-6">
                <Heart className="h-6 w-6 mr-2 text-rose-600" />
                <h2 className="text-xl font-bold">Parent Portal</h2>
              </div>
              <ParentNavItems activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold ml-2">Parent Portal</h1>
        </div>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-rose-700">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>PR</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Parent Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("settings")}>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-500">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 border-r h-screen sticky top-0 p-4 overflow-auto bg-rose-50 dark:bg-rose-950/30">
          <div className="flex items-center mb-6">
            <Heart className="h-6 w-6 mr-2 text-rose-600 dark:text-rose-400" />
            <h2 className="text-xl font-bold">Parent Portal</h2>
          </div>
          <ParentNavItems activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="hidden lg:flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Parent Dashboard</h1>
            <div className="flex items-center space-x-4">
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>PR</AvatarFallback>
                    </Avatar>
                    <span className="ml-2 hidden md:inline-flex">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Parent Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("settings")}>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-500">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Dashboard Content */}
          {renderContent()}
        </main>
      </div>
    </div>
  );
}