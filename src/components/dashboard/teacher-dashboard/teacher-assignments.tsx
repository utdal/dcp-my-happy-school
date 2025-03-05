import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Download,
  Upload,
  Pencil,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TeacherAssignments() {
  const { toast } = useToast();
  const [activeClass, setActiveClass] = useState("grade6Math");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  
  // New assignment state
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
    type: "homework"
  });
  
  // Mock data for classes
  const classes = [
    { id: "grade6Math", name: "Grade 6 - Math" },
    { id: "grade7Math", name: "Grade 7 - Math" },
    { id: "grade8Math", name: "Grade 8 - Math" }
  ];
  
  // Mock data for assignments
  const [assignmentsData, setAssignmentsData] = useState({
    grade6Math: {
      upcoming: [
        { 
          id: 1, 
          title: "Fractions Worksheet", 
          description: "Complete problems 1-20 on fractions addition and subtraction.",
          type: "homework",
          dueDate: "2025-05-25",
          createdAt: "2025-05-15",
          submissions: 18,
          totalStudents: 28
        },
        { 
          id: 2, 
          title: "Multiplication Quiz", 
          description: "Quiz covering multiplication of multi-digit numbers.",
          type: "quiz",
          dueDate: "2025-05-28",
          createdAt: "2025-05-18",
          submissions: 0,
          totalStudents: 28
        }
      ],
      past: [
        { 
          id: 3, 
          title: "Geometry Basics", 
          description: "Worksheet on basic geometric shapes and their properties.",
          type: "homework",
          dueDate: "2025-05-10",
          createdAt: "2025-05-03",
          submissions: 25,
          totalStudents: 28,
          graded: true
        },
        { 
          id: 4, 
          title: "Addition and Subtraction Test", 
          description: "Test covering addition and subtraction of large numbers.",
          type: "test",
          dueDate: "2025-05-05",
          createdAt: "2025-04-25",
          submissions: 28,
          totalStudents: 28,
          graded: true
        }
      ]
    },
    grade7Math: {
      upcoming: [
        { 
          id: 5, 
          title: "Algebra Equations", 
          description: "Solve the algebra equations on page 45 of the textbook.",
          type: "homework",
          dueDate: "2025-05-26",
          createdAt: "2025-05-19",
          submissions: 10,
          totalStudents: 32
        }
      ],
      past: [
        { 
          id: 6, 
          title: "Decimals Quiz", 
          description: "Quiz on decimal operations including addition, subtraction, multiplication, and division.",
          type: "quiz",
          dueDate: "2025-05-12",
          createdAt: "2025-05-05",
          submissions: 30,
          totalStudents: 32,
          graded: true
        }
      ]
    },
    grade8Math: {
      upcoming: [
        { 
          id: 7, 
          title: "Pre-Algebra Concepts", 
          description: "Complete the worksheet on pre-algebra concepts.",
          type: "homework",
          dueDate: "2025-05-27",
          createdAt: "2025-05-20",
          submissions: 5,
          totalStudents: 30
        },
        { 
          id: 8, 
          title: "End of Unit Test", 
          description: "Comprehensive test covering all material from Unit 3.",
          type: "test",
          dueDate: "2025-05-30",
          createdAt: "2025-05-15",
          submissions: 0,
          totalStudents: 30
        }
      ],
      past: [
        { 
          id: 9, 
          title: "Linear Equations", 
          description: "Worksheet on solving linear equations.",
          type: "homework",
          dueDate: "2025-05-15",
          createdAt: "2025-05-08",
          submissions: 28,
          totalStudents: 30,
          graded: true
        }
      ]
    }
  });

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get days remaining until due date
  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get status badge for assignment
  const getStatusBadge = (assignment) => {
    if (activeTab === "past") {
      return assignment.graded ? 
        <Badge className="bg-green-500">Graded</Badge> : 
        <Badge className="bg-amber-500">Needs Grading</Badge>;
    }
    
    const daysRemaining = getDaysRemaining(assignment.dueDate);
    
    if (daysRemaining < 0) {
      return <Badge className="bg-red-500">Overdue</Badge>;
    } else if (daysRemaining === 0) {
      return <Badge className="bg-amber-500">Due Today</Badge>;
    } else if (daysRemaining <= 2) {
      return <Badge className="bg-amber-500">Due Soon</Badge>;
    } else {
      return <Badge variant="outline">Upcoming</Badge>;
    }
  };

  // Get type badge for assignment
  const getTypeBadge = (type) => {
    switch (type) {
      case "homework":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-400">Homework</Badge>;
      case "quiz":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-purple-400">Quiz</Badge>;
      case "test":
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-400">Test</Badge>;
      case "project":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-400">Project</Badge>;
      default:
        return <Badge variant="outline">Other</Badge>;
    }
  };

  // Handle creating a new assignment
  const handleCreateAssignment = () => {
    // Validate form
    if (!newAssignment.title.trim()) {
      toast({
        title: "Missing title",
        description: "Please enter a title for the assignment.",
        variant: "destructive"
      });
      return;
    }

    if (!newAssignment.dueDate) {
      toast({
        title: "Missing due date",
        description: "Please select a due date for the assignment.",
        variant: "destructive"
      });
      return;
    }

    // Create new assignment
    const assignment = {
      id: Date.now(),
      title: newAssignment.title,
      description: newAssignment.description,
      type: newAssignment.type,
      dueDate: newAssignment.dueDate,
      createdAt: new Date().toISOString().split('T')[0],
      submissions: 0,
      totalStudents: assignmentsData[activeClass].upcoming[0]?.totalStudents || 30
    };

    // Add to assignments data
    setAssignmentsData(prev => {
      const updated = { ...prev };
      updated[activeClass].upcoming = [assignment, ...updated[activeClass].upcoming];
      return updated;
    });

    // Reset form
    setNewAssignment({
      title: "",
      description: "",
      dueDate: "",
      type: "homework"
    });

    // Show success message
    toast({
      title: "Assignment created",
      description: "The assignment has been created successfully."
    });
  };

  // Handle deleting an assignment
  const handleDeleteAssignment = (assignmentId) => {
    setAssignmentsData(prev => {
      const updated = { ...prev };
      const section = activeTab === "upcoming" ? "upcoming" : "past";
      
      updated[activeClass][section] = updated[activeClass][section].filter(
        assignment => assignment.id !== assignmentId
      );
      
      return updated;
    });
    
    setSelectedAssignment(null);
    
    toast({
      title: "Assignment deleted",
      description: "The assignment has been deleted successfully."
    });
  };

  // Handle downloading assignments
  const handleDownloadAssignments = () => {
    toast({
      title: "Downloading assignments",
      description: "The assignments are being downloaded as a CSV file."
    });
  };

  // Handle downloading submissions
  const handleDownloadSubmissions = (assignmentId) => {
    toast({
      title: "Downloading submissions",
      description: "The student submissions are being downloaded as a ZIP file."
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Assignments</CardTitle>
            <CardDescription>
              Create and manage assignments for your classes
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleDownloadAssignments}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Assignment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Assignment</DialogTitle>
                  <DialogDescription>
                    Add a new assignment for your students
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={newAssignment.title}
                      onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                      className="col-span-3"
                      placeholder="Enter assignment title"
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select 
                      value={newAssignment.type} 
                      onValueChange={(value) => setNewAssignment({...newAssignment, type: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select assignment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="homework">Homework</SelectItem>
                        <SelectItem value="quiz">Quiz</SelectItem>
                        <SelectItem value="test">Test</SelectItem>
                        <SelectItem value="project">Project</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dueDate" className="text-right">
                      Due Date
                    </Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newAssignment.dueDate}
                      onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right pt-2">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newAssignment.description}
                      onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                      className="col-span-3 min-h-[100px]"
                      placeholder="Enter assignment description"
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button 
                    onClick={handleCreateAssignment}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Create Assignment
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeClass} onValueChange={setActiveClass}>
            <TabsList className="mb-4">
              {classes.map(cls => (
                <TabsTrigger key={cls.id} value={cls.id}>
                  {cls.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/3">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4 grid grid-cols-2">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upcoming" className="m-0">
                    <div className="border rounded-md overflow-hidden">
                      {assignmentsData[activeClass].upcoming.length > 0 ? (
                        <div className="divide-y">
                          {assignmentsData[activeClass].upcoming.map((assignment) => (
                            <div 
                              key={assignment.id}
                              className={`p-3 cursor-pointer hover:bg-muted ${
                                selectedAssignment?.id === assignment.id ? 'bg-muted' : ''
                              }`}
                              onClick={() => setSelectedAssignment(assignment)}
                            >
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="font-medium">{assignment.title}</h4>
                                {getStatusBadge(assignment)}
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground mb-2">
                                {getTypeBadge(assignment.type)}
                                <span className="ml-2 flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  Due: {formatDate(assignment.dueDate)}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground truncate">
                                {assignment.description}
                              </p>
                              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                                <span>Created: {formatDate(assignment.createdAt)}</span>
                                <span>{assignment.submissions} / {assignment.totalStudents} submitted</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center">
                          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                          <h3 className="text-lg font-medium">No upcoming assignments</h3>
                          <p className="text-muted-foreground">
                            Create a new assignment to get started
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="past" className="m-0">
                    <div className="border rounded-md overflow-hidden">
                      {assignmentsData[activeClass].past.length > 0 ? (
                        <div className="divide-y">
                          {assignmentsData[activeClass].past.map((assignment) => (
                            <div 
                              key={assignment.id}
                              className={`p-3 cursor-pointer hover:bg-muted ${
                                selectedAssignment?.id === assignment.id ? 'bg-muted' : ''
                              }`}
                              onClick={() => setSelectedAssignment(assignment)}
                            >
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="font-medium">{assignment.title}</h4>
                                {getStatusBadge(assignment)}
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground mb-2">
                                {getTypeBadge(assignment.type)}
                                <span className="ml-2 flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  Due: {formatDate(assignment.dueDate)}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground truncate">
                                {assignment.description}
                              </p>
                              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                                <span>Created: {formatDate(assignment.createdAt)}</span>
                                <span>{assignment.submissions} / {assignment.totalStudents} submitted</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center">
                          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                          <h3 className="text-lg font-medium">No past assignments</h3>
                          <p className="text-muted-foreground">
                            Past assignments will appear here
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="md:w-2/3">
                {selectedAssignment ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold">{selectedAssignment.title}</h3>
                            {getTypeBadge(selectedAssignment.type)}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground gap-4">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Due: {formatDate(selectedAssignment.dueDate)}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {getDaysRemaining(selectedAssignment.dueDate) < 0 
                                ? `${Math.abs(getDaysRemaining(selectedAssignment.dueDate))} days overdue` 
                                : getDaysRemaining(selectedAssignment.dueDate) === 0 
                                  ? "Due today" 
                                  : `${getDaysRemaining(selectedAssignment.dueDate)} days remaining`}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleDeleteAssignment(selectedAssignment.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8 p-0"
                          >
                            <Pencil className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4 mb-6">
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="text-sm whitespace-pre-line">
                          {selectedAssignment.description || "No description provided."}
                        </p>
                      </div>
                      
                      <div className="border-t pt-4 mb-6">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Submission Status</h4>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownloadSubmissions(selectedAssignment.id)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Submissions
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <Card className="bg-muted">
                            <CardContent className="p-4 text-center">
                              <p className="text-sm text-muted-foreground mb-1">Total Students</p>
                              <p className="text-2xl font-bold">{selectedAssignment.totalStudents}</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-muted">
                            <CardContent className="p-4 text-center">
                              <p className="text-sm text-muted-foreground mb-1">Submitted</p>
                              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {selectedAssignment.submissions}
                              </p>
                            </CardContent>
                          </Card>
                          <Card className="bg-muted">
                            <CardContent className="p-4 text-center">
                              <p className="text-sm text-muted-foreground mb-1">Missing</p>
                              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                                {selectedAssignment.totalStudents - selectedAssignment.submissions}
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                        
                        {activeTab === "past" && selectedAssignment.graded ? (
                          <div className="flex items-center justify-center p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                            <p className="text-green-600 dark:text-green-400 font-medium">
                              All submissions have been graded
                            </p>
                          </div>
                        ) : activeTab === "past" && !selectedAssignment.graded ? (
                          <div className="flex items-center justify-between p-4 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                            <div className="flex items-center">
                              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
                              <p className="text-amber-600 dark:text-amber-400 font-medium">
                                {selectedAssignment.submissions} submissions need grading
                              </p>
                            </div>
                            <Button className="bg-green-600 hover:bg-green-700">
                              Grade Now
                            </Button>
                          </div>
                        ) : null}
                      </div>
                      
                      {activeTab === "upcoming" && (
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium">Quick Actions</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Materials
                            </Button>
                            <Button variant="outline" size="sm">
                              <Calendar className="h-4 w-4 mr-2" />
                              Extend Deadline
                            </Button>
                            <Button variant="outline" size="sm">
                              <Bell className="h-4 w-4 mr-2" />
                              Send Reminder
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="flex items-center justify-center h-64 border rounded-lg">
                    <div className="text-center">
                      <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">Select an assignment</h3>
                      <p className="text-muted-foreground">
                        Choose an assignment from the list to view details
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            className="mt-4 bg-green-600 hover:bg-green-700"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Create New Assignment
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create New Assignment</DialogTitle>
                            <DialogDescription>
                              Add a new assignment for your students
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="title" className="text-right">
                                Title
                              </Label>
                              <Input
                                id="title"
                                value={newAssignment.title}
                                onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                                className="col-span-3"
                                placeholder="Enter assignment title"
                              />
                            </div>
                            
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="type" className="text-right">
                                Type
                              </Label>
                              <Select 
                                value={newAssignment.type} 
                                onValueChange={(value) => setNewAssignment({...newAssignment, type: value})}
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select assignment type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="homework">Homework</SelectItem>
                                  <SelectItem value="quiz">Quiz</SelectItem>
                                  <SelectItem value="test">Test</SelectItem>
                                  <SelectItem value="project">Project</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="dueDate" className="text-right">
                                Due Date
                              </Label>
                              <Input
                                id="dueDate"
                                type="date"
                                value={newAssignment.dueDate}
                                onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                                className="col-span-3"
                              />
                            </div>
                            
                            <div className="grid grid-cols-4 items-start gap-4">
                              <Label htmlFor="description" className="text-right pt-2">
                                Description
                              </Label>
                              <Textarea
                                id="description"
                                value={newAssignment.description}
                                onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                                className="col-span-3 min-h-[100px]"
                                placeholder="Enter assignment description"
                              />
                            </div>
                          </div>
                          
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button 
                              onClick={handleCreateAssignment}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Create Assignment
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}