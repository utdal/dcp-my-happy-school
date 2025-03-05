import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, FileText, CheckCircle, AlertCircle, HelpCircle, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ParentHomework() {
  const [activeChildTab, setActiveChildTab] = useState("emma");
  const [activeStatusTab, setActiveStatusTab] = useState("all");
  const { toast } = useToast();

  // Mock data for homework
  const [homeworkItems, setHomeworkItems] = useState({
    emma: [
      {
        id: 1,
        title: "Math Worksheet - Fractions",
        subject: "Mathematics",
        teacher: "Ms. Wilson",
        dueDate: "May 25, 2025",
        status: "pending",
        description: "Complete worksheet pages 32-33 on adding and subtracting fractions with different denominators.",
        attachment: "math_worksheet_fractions.pdf"
      },
      {
        id: 2,
        title: "Reading Comprehension",
        subject: "English",
        teacher: "Ms. Garcia",
        dueDate: "May 23, 2025",
        status: "completed",
        description: "Read chapter 5 of 'Charlotte's Web' and answer the questions on page 45.",
        attachment: "reading_questions.pdf"
      },
      {
        id: 3,
        title: "Science Project - Plants",
        subject: "Science",
        teacher: "Mr. Thompson",
        dueDate: "May 30, 2025",
        status: "pending",
        description: "Create a diagram showing the life cycle of a flowering plant. Include all stages and label each part.",
        attachment: "plant_lifecycle_instructions.pdf"
      }
    ],
    michael: [
      {
        id: 4,
        title: "History Essay",
        subject: "Social Studies",
        teacher: "Mr. Davis",
        dueDate: "May 24, 2025",
        status: "overdue",
        description: "Write a 500-word essay on the American Revolution. Focus on the causes and major events.",
        attachment: "history_essay_guidelines.pdf"
      },
      {
        id: 5,
        title: "Science Lab Report",
        subject: "Science",
        teacher: "Ms. Johnson",
        dueDate: "May 28, 2025",
        status: "pending",
        description: "Complete the lab report for the experiment on water filtration. Include your observations and conclusions.",
        attachment: "lab_report_template.pdf"
      },
      {
        id: 6,
        title: "Math Problems",
        subject: "Mathematics",
        teacher: "Mr. Roberts",
        dueDate: "May 22, 2025",
        status: "completed",
        description: "Solve problems 1-20 on page 78 of the textbook. Show all your work.",
        attachment: "math_problems.pdf"
      },
      {
        id: 7,
        title: "Book Report",
        subject: "English",
        teacher: "Ms. Adams",
        dueDate: "May 20, 2025",
        status: "overdue",
        description: "Write a book report on the novel you chose for independent reading. Include a summary and your personal reflection.",
        attachment: "book_report_template.pdf"
      }
    ]
  });

  const filteredHomework = (child, status) => {
    if (status === "all") return homeworkItems[child];
    return homeworkItems[child].filter(item => item.status === status);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-blue-500 border-blue-500">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-500">Overdue</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "overdue":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleMarkAsComplete = (childName, homeworkId) => {
    setHomeworkItems(prev => {
      const updatedHomework = { ...prev };
      const childHomework = [...updatedHomework[childName]];
      
      const index = childHomework.findIndex(item => item.id === homeworkId);
      if (index !== -1) {
        childHomework[index] = { ...childHomework[index], status: "completed" };
      }
      
      updatedHomework[childName] = childHomework;
      return updatedHomework;
    });
    
    toast({
      title: "Homework marked as complete",
      description: "The teacher will be notified of this update.",
    });
  };

  const handleDownloadAttachment = (attachment) => {
    toast({
      title: "Downloading attachment",
      description: `${attachment} is being downloaded.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Homework Tracker</CardTitle>
          <CardDescription>
            Monitor your children's homework assignments and due dates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeChildTab} onValueChange={setActiveChildTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="emma">Emma Johnson</TabsTrigger>
              <TabsTrigger value="michael">Michael Johnson</TabsTrigger>
            </TabsList>
            
            <div className="mb-6">
              <Tabs value={activeStatusTab} onValueChange={setActiveStatusTab}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="overdue">Overdue</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <TabsContent value="emma" className="space-y-4">
              {filteredHomework("emma", activeStatusTab).length > 0 ? (
                filteredHomework("emma", activeStatusTab).map(homework => (
                  <div key={homework.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">
                          {getStatusIcon(homework.status)}
                        </div>
                        <div>
                          <h3 className="font-medium">{homework.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {homework.subject} • {homework.teacher}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(homework.status)}
                    </div>
                    <p className="text-sm mb-3 ml-8">
                      {homework.description}
                    </p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground ml-8">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Due: {homework.dueDate}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownloadAttachment(homework.attachment)}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        {homework.status !== "completed" && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleMarkAsComplete("emma", homework.id)}
                          >
                            Mark as Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No homework found</h3>
                  <p className="text-muted-foreground">
                    There are no {activeStatusTab !== "all" ? activeStatusTab : ""} assignments for Emma at the moment.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="michael" className="space-y-4">
              {filteredHomework("michael", activeStatusTab).length > 0 ? (
                filteredHomework("michael", activeStatusTab).map(homework => (
                  <div key={homework.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">
                          {getStatusIcon(homework.status)}
                        </div>
                        <div>
                          <h3 className="font-medium">{homework.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {homework.subject} • {homework.teacher}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(homework.status)}
                    </div>
                    <p className="text-sm mb-3 ml-8">
                      {homework.description}
                    </p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground ml-8">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Due: {homework.dueDate}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownloadAttachment(homework.attachment)}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        {homework.status !== "completed" && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleMarkAsComplete("michael", homework.id)}
                          >
                            Mark as Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No homework found</h3>
                  <p className="text-muted-foreground">
                    There are no {activeStatusTab !== "all" ? activeStatusTab : ""} assignments for Michael at the moment.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Homework Calendar</CardTitle>
          <CardDescription>Upcoming homework deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                This Week
              </h3>
              <div className="space-y-3">
                {[...homeworkItems.emma, ...homeworkItems.michael]
                  .filter(hw => hw.status !== "completed")
                  .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                  .slice(0, 3)
                  .map(hw => (
                    <div key={hw.id} className="flex items-center justify-between border-l-4 border-rose-500 pl-3 py-2">
                      <div>
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarFallback>{hw.id <= 3 ? "EJ" : "MJ"}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{hw.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-8">
                          {hw.subject} • Due {hw.dueDate}
                        </p>
                      </div>
                      {getStatusBadge(hw.status)}
                    </div>
                  ))
                }
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Next Week
              </h3>
              <div className="space-y-3">
                {[...homeworkItems.emma, ...homeworkItems.michael]
                  .filter(hw => hw.status !== "completed")
                  .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                  .slice(3, 5)
                  .map(hw => (
                    <div key={hw.id} className="flex items-center justify-between border-l-4 border-blue-500 pl-3 py-2">
                      <div>
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarFallback>{hw.id <= 3 ? "EJ" : "MJ"}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{hw.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-8">
                          {hw.subject} • Due {hw.dueDate}
                        </p>
                      </div>
                      {getStatusBadge(hw.status)}
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}