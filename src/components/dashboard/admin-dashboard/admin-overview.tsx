import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Database, 
  Bell, 
  BarChart,
  ArrowRight
} from "lucide-react";

export default function AdminOverview() {
  // State to store data from other modules
  const [studentsData, setStudentsData] = useState({
    totalStudents: 1248,
    newEnrollments: 12,
    enrollmentByGrade: {
      "Grade 1-3": { count: 312, percentage: 75 },
      "Grade 4-6": { count: 428, percentage: 85 },
      "Grade 7-9": { count: 356, percentage: 70 },
      "Grade 10-12": { count: 152, percentage: 45 }
    }
  });

  const [teachersData, setTeachersData] = useState({
    totalTeachers: 86,
    newHires: 3
  });

  const [classesData, setClassesData] = useState({
    totalClasses: 124
  });

  const [registrationsData, setRegistrationsData] = useState([
    {
      id: 1,
      name: "Sarah Miller",
      avatar: "SM",
      role: "Teacher",
      department: "Mathematics"
    },
    {
      id: 2,
      name: "James Davis",
      avatar: "JD",
      role: "Parent",
      department: ""
    },
    {
      id: 3,
      name: "Rebecca Wilson",
      avatar: "RW",
      role: "Teacher",
      department: "Science"
    }
  ]);

  const [announcementsData, setAnnouncementsData] = useState([
    {
      id: 1,
      title: "School Closure - Weather Advisory",
      content: "Due to the severe weather warning, the school will remain closed tomorrow. All classes will be conducted online. Please check your email for further instructions.",
      audience: "All Teachers, All Parents",
      date: "May 18, 2025",
      priority: "urgent"
    },
    {
      id: 2,
      title: "Annual Sports Day - Schedule Change",
      content: "The Annual Sports Day has been rescheduled to June 15th due to venue availability. All previously arranged activities will proceed as planned.",
      audience: "All Teachers, All Parents",
      date: "May 15, 2025",
      priority: "general"
    },
    {
      id: 3,
      title: "Teacher Professional Development Day",
      content: "Reminder: The professional development workshop will be held on May 25th. All teaching staff are required to attend. The session will focus on new educational technologies.",
      audience: "All Teachers",
      date: "May 10, 2025",
      priority: "staff"
    }
  ]);

  // Function to handle navigation to different sections
  const handleNavigate = (section) => {
    // Find the parent component and call setActiveTab
    const event = new CustomEvent('navigateToSection', { 
      detail: { section } 
    });
    window.dispatchEvent(event);
  };

  // Handle registration approval
  const handleApproveRegistration = (id) => {
    setRegistrationsData(prev => prev.filter(reg => reg.id !== id));
  };

  // Handle registration rejection
  const handleRejectRegistration = (id) => {
    setRegistrationsData(prev => prev.filter(reg => reg.id !== id));
  };

  // Get priority badge for announcement
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "urgent":
        return <Badge>Urgent</Badge>;
      case "staff":
        return <Badge variant="outline">Staff Only</Badge>;
      default:
        return <Badge variant="outline">General</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentsData.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              +{studentsData.newEnrollments} enrolled this week
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Teachers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachersData.totalTeachers}</div>
            <p className="text-xs text-muted-foreground">
              +{teachersData.newHires} hired this month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classesData.totalClasses}</div>
            <p className="text-xs text-muted-foreground">
              Across all grade levels
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Registrations</CardTitle>
              <CardDescription>
                New user registrations requiring approval
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1"
              onClick={() => handleNavigate('users')}
            >
              <span className="hidden sm:inline">View All Users</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {registrationsData.map((registration, index) => (
                <div key={registration.id}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback>{registration.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{registration.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {registration.role}{registration.department ? ` - ${registration.department}` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8"
                        onClick={() => handleRejectRegistration(registration.id)}
                      >
                        Reject
                      </Button>
                      <Button 
                        size="sm" 
                        className="h-8 bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => handleApproveRegistration(registration.id)}
                      >
                        Approve
                      </Button>
                    </div>
                  </div>
                  {index < registrationsData.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Enrollment Statistics</CardTitle>
              <CardDescription>
                Student enrollment by grade level
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1"
              onClick={() => handleNavigate('enrollment')}
            >
              <span className="hidden sm:inline">View Enrollment Details</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(studentsData.enrollmentByGrade).map(([grade, data]) => (
                <div key={grade}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{grade}</span>
                    <span className="text-sm">{data.count} students</span>
                  </div>
                  <Progress value={data.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Announcements</CardTitle>
            <CardDescription>
              School-wide announcements sent to teachers and parents
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1"
              onClick={() => handleNavigate('announcements')}
            >
              <span className="hidden sm:inline">View All</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() => handleNavigate('announcements')}
            >
              New Announcement
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {announcementsData.map((announcement) => (
              <div key={announcement.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{announcement.title}</h3>
                  {getPriorityBadge(announcement.priority)}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {announcement.content}
                </p>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Sent to: {announcement.audience}</span>
                  <span>{announcement.date}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card 
          className="bg-white dark:bg-gray-800 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleNavigate('users')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900/20 p-3 rounded-full">
                <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-medium">Manage Users</h3>
                <p className="text-sm text-muted-foreground">Add, edit, or remove users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className="bg-white dark:bg-gray-800 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleNavigate('enrollment')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900/20 p-3 rounded-full">
                <Database className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-medium">Enrollment</h3>
                <p className="text-sm text-muted-foreground">Manage student enrollment</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className="bg-white dark:bg-gray-800 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleNavigate('announcements')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900/20 p-3 rounded-full">
                <Bell className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-medium">Announcements</h3>
                <p className="text-sm text-muted-foreground">Create school announcements</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className="bg-white dark:bg-gray-800 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleNavigate('analytics')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900/20 p-3 rounded-full">
                <BarChart className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-medium">Analytics</h3>
                <p className="text-sm text-muted-foreground">View school performance data</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}