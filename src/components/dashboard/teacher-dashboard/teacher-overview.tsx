import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  ClipboardList, 
  MessageSquare, 
  Calendar,
  ArrowRight
} from "lucide-react";

export default function TeacherOverview() {
  // State to store data from other modules
  const [classesData, setClassesData] = useState({
    totalClasses: 5,
    todayClasses: 3,
    classesWithData: [
      { 
        id: 1, 
        name: "Mathematics - Grade 8", 
        time: "8:00 AM - 9:30 AM", 
        room: "101", 
        status: "in-progress" 
      },
      { 
        id: 2, 
        name: "Mathematics - Grade 6", 
        time: "10:00 AM - 11:30 AM", 
        room: "103", 
        status: "upcoming" 
      },
      { 
        id: 3, 
        name: "Mathematics - Grade 7", 
        time: "1:00 PM - 2:30 PM", 
        room: "105", 
        status: "upcoming" 
      }
    ],
    averageAttendance: {
      "Grade 6": 82,
      "Grade 7": 78,
      "Grade 8": 85,
      "Advanced Math": 92,
      "Remedial Math": 68
    }
  });

  const [assignmentsData, setAssignmentsData] = useState({
    totalPending: 24,
    needsGrading: 8,
    upcomingAssignments: [
      { 
        id: 1, 
        title: "Algebra Quiz", 
        class: "Grade 8", 
        dueDate: "May 21, 2025", 
        daysRemaining: 1 
      },
      { 
        id: 2, 
        title: "Geometry Project", 
        class: "Grade 7", 
        dueDate: "May 25, 2025", 
        daysRemaining: 5 
      },
      { 
        id: 3, 
        title: "Fractions Worksheet", 
        class: "Grade 6", 
        dueDate: "May 28, 2025", 
        daysRemaining: 8 
      }
    ]
  });

  const [messagesData, setMessagesData] = useState({
    totalMessages: 7,
    unreadMessages: 3
  });

  // Get status badge for class
  const getStatusBadge = (status) => {
    switch (status) {
      case "in-progress":
        return <Badge className="bg-green-500">In Progress</Badge>;
      case "upcoming":
        return <Badge variant="outline">Upcoming</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">Completed</Badge>;
      default:
        return null;
    }
  };

  // Get due soon badge for assignment
  const getDueSoonBadge = (daysRemaining) => {
    if (daysRemaining <= 1) {
      return <Badge variant="outline" className="text-amber-500 border-amber-500">Due Tomorrow</Badge>;
    } else {
      return <Badge variant="outline">{daysRemaining} Days Left</Badge>;
    }
  };

  // Function to handle navigation to different sections
  const handleNavigate = (section) => {
    // Find the parent component and call setActiveTab
    const event = new CustomEvent('navigateToSection', { 
      detail: { section } 
    });
    window.dispatchEvent(event);
  };

  // Listen for navigation events from child components
  useEffect(() => {
    const handleSectionNavigation = (e) => {
      console.log("Navigation event received:", e.detail.section);
    };

    window.addEventListener('navigateToSection', handleSectionNavigation);
    
    return () => {
      window.removeEventListener('navigateToSection', handleSectionNavigation);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              My Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classesData.totalClasses}</div>
            <p className="text-xs text-muted-foreground">
              {classesData.todayClasses} classes today
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignmentsData.totalPending}</div>
            <p className="text-xs text-muted-foreground">
              {assignmentsData.needsGrading} need grading
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Parent Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messagesData.totalMessages}</div>
            <p className="text-xs text-muted-foreground">
              {messagesData.unreadMessages} unread messages
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Today's Classes</CardTitle>
              <CardDescription>
                Your teaching schedule for today
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1"
              onClick={() => handleNavigate('classes')}
            >
              <span className="hidden sm:inline">View All Classes</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classesData.classesWithData.map((cls, index) => (
                <div key={cls.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{cls.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {cls.time} • Room {cls.room}
                      </p>
                    </div>
                    {getStatusBadge(cls.status)}
                  </div>
                  {index < classesData.classesWithData.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Assignments Due Soon</CardTitle>
              <CardDescription>
                Upcoming assignment deadlines
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1"
              onClick={() => handleNavigate('assignments')}
            >
              <span className="hidden sm:inline">View All Assignments</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignmentsData.upcomingAssignments.map((assignment, index) => (
                <div key={assignment.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{assignment.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {assignment.class} • Due {assignment.dueDate}
                      </p>
                    </div>
                    {getDueSoonBadge(assignment.daysRemaining)}
                  </div>
                  {index < assignmentsData.upcomingAssignments.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Class Performance</CardTitle>
            <CardDescription>Average grades by class</CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1"
            onClick={() => handleNavigate('grades')}
          >
            <span className="hidden sm:inline">View Detailed Grades</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(classesData.averageAttendance).map(([className, average]) => (
              <div key={className}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{className}</span>
                  <span className="text-sm">{average}%</span>
                </div>
                <Progress value={average} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className="bg-white dark:bg-gray-800 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleNavigate('classes')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">Manage Classes</h3>
                <p className="text-sm text-muted-foreground">Add students, take attendance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className="bg-white dark:bg-gray-800 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleNavigate('assignments')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
                <ClipboardList className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">Create Assignments</h3>
                <p className="text-sm text-muted-foreground">Add new homework or quizzes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className="bg-white dark:bg-gray-800 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleNavigate('messages')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
                <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">Message Parents</h3>
                <p className="text-sm text-muted-foreground">Send updates to parents</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}