import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  FileText, 
  BookOpen, 
  MessageSquare, 
  Shield,
  ArrowRight
} from "lucide-react";

export default function ParentOverview() {
  // State to store data from other modules
  const [childrenData, setChildrenData] = useState({
    totalChildren: 2,
    childrenInfo: [
      {
        id: 1,
        name: "Emma Johnson",
        grade: "Grade 3",
        teacher: "Ms. Wilson",
        status: "good"
      },
      {
        id: 2,
        name: "Michael Johnson",
        grade: "Grade 5",
        teacher: "Mr. Davis",
        status: "attention"
      }
    ]
  });

  const [eventsData, setEventsData] = useState({
    totalEvents: 3,
    upcomingEvents: [
      {
        id: 1,
        title: "Parent-Teacher Conference",
        date: "May 22, 2025",
        time: "4:00 PM - 6:00 PM",
        priority: "important"
      },
      {
        id: 2,
        title: "Science Fair",
        date: "May 24, 2025",
        time: "10:00 AM - 2:00 PM",
        priority: "normal"
      },
      {
        id: 3,
        title: "Field Trip Permission Due",
        date: "May 25, 2025",
        priority: "action"
      }
    ]
  });

  const [messagesData, setMessagesData] = useState({
    totalMessages: 5,
    unreadMessages: 3
  });

  const [academicUpdates, setAcademicUpdates] = useState([
    {
      id: 1,
      child: "Emma Johnson",
      childId: 1,
      title: "Math Quiz",
      description: "Emma received a 92% on her recent math quiz on fractions. This is an improvement from her previous quiz score.",
      teacher: "Ms. Wilson",
      subject: "Mathematics",
      date: "May 18, 2025"
    },
    {
      id: 2,
      child: "Michael Johnson",
      childId: 2,
      title: "Missing Assignment",
      description: "Michael has not turned in his science project that was due yesterday. Please remind him to complete and submit it as soon as possible.",
      teacher: "Mr. Davis",
      subject: "Science",
      date: "May 17, 2025",
      status: "attention"
    },
    {
      id: 3,
      child: "Michael Johnson",
      childId: 2,
      title: "Reading Assessment",
      description: "Michael scored in the 85th percentile on his reading comprehension assessment. He shows strong skills in understanding main ideas and themes.",
      teacher: "Ms. Garcia",
      subject: "English",
      date: "May 15, 2025"
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

  // Get status badge for child
  const getStatusBadge = (status) => {
    switch (status) {
      case "good":
        return <Badge className="bg-green-500">Good Standing</Badge>;
      case "attention":
        return <Badge className="bg-amber-500">Needs Attention</Badge>;
      default:
        return null;
    }
  };

  // Get priority badge for event
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "important":
        return <Badge variant="outline" className="text-rose-500 border-rose-500">Important</Badge>;
      case "action":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Action Required</Badge>;
      default:
        return <Badge variant="outline">School Event</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Children Enrolled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{childrenData.totalChildren}</div>
            <p className="text-xs text-muted-foreground">
              In grades 3 and 5
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventsData.totalEvents}</div>
            <p className="text-xs text-muted-foreground">
              In the next 7 days
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Unread Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messagesData.unreadMessages}</div>
            <p className="text-xs text-muted-foreground">
              From 3 different teachers
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Children</CardTitle>
              <CardDescription>
                Quick overview of your children's performance
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1"
              onClick={() => handleNavigate('children')}
            >
              <span className="hidden sm:inline">View Details</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {childrenData.childrenInfo.map((child, index) => (
                <div key={child.id}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback>{child.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{child.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {child.grade} • {child.teacher}'s Class
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(child.status)}
                  </div>
                  {index < childrenData.childrenInfo.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                School events in the next 7 days
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1"
              onClick={() => handleNavigate('attendance')}
            >
              <span className="hidden sm:inline">View Calendar</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventsData.upcomingEvents.map((event, index) => (
                <div key={event.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.date}{event.time ? ` • ${event.time}` : ''}
                      </p>
                    </div>
                    {getPriorityBadge(event.priority)}
                  </div>
                  {index < eventsData.upcomingEvents.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Academic Updates</CardTitle>
            <CardDescription>Latest grades and assignments</CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1"
            onClick={() => handleNavigate('grades')}
          >
            <span className="hidden sm:inline">View All Updates</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {academicUpdates.map((update) => (
              <div key={update.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarFallback>{update.child.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium">{update.child}</h3>
                  </div>
                  <Badge className={update.status === "attention" ? "bg-amber-500" : ""}>{update.title}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {update.description}
                </p>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{update.teacher} • {update.subject}</span>
                  <span>{update.date}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className="bg-white dark:bg-gray-800 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleNavigate('homework')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-rose-100 dark:bg-rose-900/20 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h3 className="font-medium">Track Homework</h3>
                <p className="text-sm text-muted-foreground">View assignments and due dates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className="bg-white dark:bg-gray-800 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleNavigate('grades')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-rose-100 dark:bg-rose-900/20 p-3 rounded-full">
                <FileText className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h3 className="font-medium">Check Grades</h3>
                <p className="text-sm text-muted-foreground">View academic performance</p>
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
              <div className="bg-rose-100 dark:bg-rose-900/20 p-3 rounded-full">
                <MessageSquare className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h3 className="font-medium">Message Teachers</h3>
                <p className="text-sm text-muted-foreground">Communicate with staff</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}