import { useState } from "react";
import { 
  BookOpen, Calendar, ChevronLeft, ChevronRight, 
  ClipboardList, FileText, Home, LogOut, Menu, 
  MessageSquare, School, Settings, User, Users, X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const NavItems = () => (
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
        Classes
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
        <FileText className="mr-2 h-4 w-4" />
        Grades
      </Button>
      <Button 
        variant={activeTab === "calendar" ? "default" : "ghost"} 
        className="w-full justify-start" 
        onClick={() => setActiveTab("calendar")}
      >
        <Calendar className="mr-2 h-4 w-4" />
        Calendar
      </Button>
      <Button 
        variant={activeTab === "messages" ? "default" : "ghost"} 
        className="w-full justify-start" 
        onClick={() => setActiveTab("messages")}
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        Messages
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

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex items-center mb-6">
                <School className="h-6 w-6 mr-2 text-primary" />
                <h2 className="text-xl font-bold">My School APP</h2>
              </div>
              <NavItems />
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold ml-2">My School APP</h1>
        </div>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
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
        <aside className="hidden lg:block w-64 border-r h-screen sticky top-0 p-4 overflow-auto">
          <div className="flex items-center mb-6">
            <School className="h-6 w-6 mr-2 text-primary" />
            <h2 className="text-xl font-bold">My School APP</h2>
          </div>
          <NavItems />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="hidden lg:flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="ml-2 hidden md:inline-flex">John Doe</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-500">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Dashboard Content */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Upcoming Classes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">
                      +2 compared to last week
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Assignments Due
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">
                      -1 compared to last week
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Average Grade
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">87%</div>
                    <p className="text-xs text-muted-foreground">
                      +2% compared to last semester
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Assignments</CardTitle>
                    <CardDescription>
                      Your most recent assignment submissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Math Homework #12</h4>
                          <p className="text-sm text-muted-foreground">
                            Submitted on May 15, 2025
                          </p>
                        </div>
                        <Badge>92%</Badge>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Science Lab Report</h4>
                          <p className="text-sm text-muted-foreground">
                            Submitted on May 12, 2025
                          </p>
                        </div>
                        <Badge>88%</Badge>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">History Essay</h4>
                          <p className="text-sm text-muted-foreground">
                            Submitted on May 10, 2025
                          </p>
                        </div>
                        <Badge>95%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Course Progress</CardTitle>
                    <CardDescription>
                      Your progress in current courses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Mathematics</span>
                          <span className="text-sm">75%</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Science</span>
                          <span className="text-sm">60%</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">History</span>
                          <span className="text-sm">90%</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">English</span>
                          <span className="text-sm">82%</span>
                        </div>
                        <Progress value={82} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Schedule</CardTitle>
                  <CardDescription>Your classes for the next few days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Monday, May 20, 2025
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-3">
                          <div className="text-sm text-muted-foreground">8:00 AM - 9:30 AM</div>
                          <div className="font-medium">Mathematics</div>
                          <div className="text-sm">Room 101 • Mr. Johnson</div>
                        </div>
                        <div className="border rounded-lg p-3">
                          <div className="text-sm text-muted-foreground">10:00 AM - 11:30 AM</div>
                          <div className="font-medium">Science</div>
                          <div className="text-sm">Room 203 • Ms. Smith</div>
                        </div>
                        <div className="border rounded-lg p-3">
                          <div className="text-sm text-muted-foreground">1:00 PM - 2:30 PM</div>
                          <div className="font-medium">History</div>
                          <div className="text-sm">Room 105 • Mr. Davis</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Tuesday, May 21, 2025
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-3">
                          <div className="text-sm text-muted-foreground">8:00 AM - 9:30 AM</div>
                          <div className="font-medium">English</div>
                          <div className="text-sm">Room 202 • Ms. Wilson</div>
                        </div>
                        <div className="border rounded-lg p-3">
                          <div className="text-sm text-muted-foreground">10:00 AM - 11:30 AM</div>
                          <div className="font-medium">Physical Education</div>
                          <div className="text-sm">Gymnasium • Coach Brown</div>
                        </div>
                        <div className="border rounded-lg p-3">
                          <div className="text-sm text-muted-foreground">1:00 PM - 2:30 PM</div>
                          <div className="font-medium">Art</div>
                          <div className="text-sm">Room 302 • Ms. Garcia</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab !== "overview" && (
            <div className="flex items-center justify-center h-64 border rounded-lg">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Page</h2>
                <p className="text-muted-foreground">This section is under development.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}