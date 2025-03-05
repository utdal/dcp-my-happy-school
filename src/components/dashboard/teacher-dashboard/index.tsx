import { useState, useEffect } from "react";
import { 
  Menu, 
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import type { User as AppUser } from "@/App";

import TeacherNavItems from "./teacher-nav-items";
import TeacherOverview from "./teacher-overview";
import TeacherClasses from "./teacher-classes";
import TeacherAssignments from "./teacher-assignments";
import TeacherGrades from "./teacher-grades";
import TeacherMessages from "./teacher-messages";
import TeacherSettings from "./teacher-settings";
import TeacherAnnouncements from "./teacher-announcements";

interface TeacherDashboardProps {
  user: AppUser;
  onLogout: () => void;
}

export default function TeacherDashboard({ user, onLogout }: TeacherDashboardProps) {
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
        return <TeacherOverview />;
      case "classes":
        return <TeacherClasses />;
      case "assignments":
        return <TeacherAssignments />;
      case "grades":
        return <TeacherGrades />;
      case "announcements":
        return <TeacherAnnouncements />;
      case "messages":
        return <TeacherMessages />;
      case "settings":
        return <TeacherSettings />;
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
      <header className="lg:hidden flex items-center justify-between p-4 border-b bg-green-600 text-white">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-green-700">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex items-center mb-6">
                <GraduationCap className="h-6 w-6 mr-2 text-green-600" />
                <h2 className="text-xl font-bold">Teacher Portal</h2>
              </div>
              <TeacherNavItems activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold ml-2">Teacher Portal</h1>
        </div>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-green-700">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>TC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Teacher Account</DropdownMenuLabel>
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
        <aside className="hidden lg:block w-64 border-r h-screen sticky top-0 p-4 overflow-auto bg-green-50 dark:bg-green-950/30">
          <div className="flex items-center mb-6">
            <GraduationCap className="h-6 w-6 mr-2 text-green-600 dark:text-green-400" />
            <h2 className="text-xl font-bold">Teacher Portal</h2>
          </div>
          <TeacherNavItems activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="hidden lg:flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
            <div className="flex items-center space-x-4">
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>TC</AvatarFallback>
                    </Avatar>
                    <span className="ml-2 hidden md:inline-flex">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Teacher Account</DropdownMenuLabel>
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