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
  BookOpen, 
  Plus, 
  Search, 
  UserPlus, 
  Calendar, 
  CheckCircle2, 
  XCircle,
  Clock,
  Download,
  Pencil,
  Trash2,
  Users
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function TeacherClasses() {
  const { toast } = useToast();
  const [classes, setClasses] = useState([
    { 
      id: 1, 
      name: "Mathematics", 
      grade: "Grade 6", 
      room: "101", 
      schedule: "Mon, Wed, Fri • 10:00 AM",
      description: "Basic mathematics for 6th grade students covering arithmetic, basic algebra, and geometry concepts.",
      students: 28,
      attendance: 95,
      sessions: 45
    },
    { 
      id: 2, 
      name: "Mathematics", 
      grade: "Grade 7", 
      room: "103", 
      schedule: "Mon, Wed, Fri • 1:00 PM",
      description: "Intermediate mathematics for 7th grade students focusing on pre-algebra and advanced arithmetic.",
      students: 32,
      attendance: 92,
      sessions: 45
    },
    { 
      id: 3, 
      name: "Mathematics", 
      grade: "Grade 8", 
      room: "105", 
      schedule: "Mon, Wed, Fri • 8:00 AM",
      description: "Advanced mathematics for 8th grade students covering algebra and introduction to geometry.",
      students: 30,
      attendance: 90,
      sessions: 45
    },
    { 
      id: 4, 
      name: "Advanced Math", 
      grade: "Grade 8", 
      room: "107", 
      schedule: "Tue, Thu • 10:00 AM",
      description: "Advanced mathematics for gifted 8th grade students covering advanced algebra and geometry.",
      students: 18,
      attendance: 98,
      sessions: 30
    },
    { 
      id: 5, 
      name: "Remedial Math", 
      grade: "Grade 7", 
      room: "102", 
      schedule: "Tue, Thu • 1:00 PM",
      description: "Additional support for 7th grade students who need extra help with mathematics concepts.",
      students: 15,
      attendance: 88,
      sessions: 30
    }
  ]);
  
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [searchQuery, setSearchQuery] = useState("");
  const [newClass, setNewClass] = useState({
    name: "",
    grade: "",
    room: "",
    schedule: "",
    description: ""
  });
  
  // Mock data for students
  const [studentsData, setStudentsData] = useState({
    1: [
      { id: 1, name: "Emma Johnson", email: "emma.j@example.com", parent: "John Johnson", attendance: 98 },
      { id: 2, name: "David Williams", email: "david.w@example.com", parent: "Sarah Williams", attendance: 95 },
      { id: 3, name: "Lisa Brown", email: "lisa.b@example.com", parent: "Robert Brown", attendance: 100 },
      { id: 4, name: "Michael Davis", email: "michael.d@example.com", parent: "Mary Davis", attendance: 92 },
      { id: 5, name: "Sarah Miller", email: "sarah.m@example.com", parent: "James Miller", attendance: 97 }
    ],
    2: [
      { id: 6, name: "Emily Wilson", email: "emily.w@example.com", parent: "James Wilson", attendance: 94 },
      { id: 7, name: "Thomas Miller", email: "thomas.m@example.com", parent: "Patricia Miller", attendance: 88 },
      { id: 8, name: "Jessica Taylor", email: "jessica.t@example.com", parent: "Jennifer Taylor", attendance: 96 }
    ],
    3: [
      { id: 9, name: "James Anderson", email: "james.a@example.com", parent: "Charles Anderson", attendance: 91 },
      { id: 10, name: "Sophia Martinez", email: "sophia.m@example.com", parent: "Linda Martinez", attendance: 93 }
    ],
    4: [
      { id: 11, name: "Andrew Taylor", email: "andrew.t@example.com", parent: "Jennifer Taylor", attendance: 99 },
      { id: 12, name: "Olivia Anderson", email: "olivia.a@example.com", parent: "Charles Anderson", attendance: 100 },
      { id: 13, name: "Daniel Martinez", email: "daniel.m@example.com", parent: "Linda Martinez", attendance: 97 }
    ],
    5: [
      { id: 14, name: "Ryan Wilson", email: "ryan.w@example.com", parent: "James Wilson", attendance: 85 },
      { id: 15, name: "Isabella Miller", email: "isabella.m@example.com", parent: "Patricia Miller", attendance: 90 }
    ]
  });
  
  // Mock data for attendance
  const [attendanceData, setAttendanceData] = useState({
    1: {
      dates: ["2025-05-20", "2025-05-18", "2025-05-15", "2025-05-13", "2025-05-11"],
      records: {
        1: ["present", "present", "present", "present", "present"],
        2: ["present", "present", "absent", "present", "present"],
        3: ["present", "present", "present", "present", "present"],
        4: ["present", "late", "present", "present", "absent"],
        5: ["present", "present", "present", "present", "present"]
      }
    },
    2: {
      dates: ["2025-05-20", "2025-05-18", "2025-05-15", "2025-05-13", "2025-05-11"],
      records: {
        6: ["present", "present", "present", "present", "present"],
        7: ["present", "absent", "present", "late", "present"],
        8: ["present", "present", "present", "present", "present"]
      }
    },
    3: {
      dates: ["2025-05-20", "2025-05-18", "2025-05-15", "2025-05-13", "2025-05-11"],
      records: {
        9: ["present", "present", "absent", "present", "present"],
        10: ["present", "present", "present", "present", "present"]
      }
    },
    4: {
      dates: ["2025-05-21", "2025-05-19", "2025-05-14", "2025-05-12", "2025-05-07"],
      records: {
        11: ["present", "present", "present", "present", "present"],
        12: ["present", "present", "present", "present", "present"],
        13: ["present", "present", "present", "late", "present"]
      }
    },
    5: {
      dates: ["2025-05-21", "2025-05-19", "2025-05-14", "2025-05-12", "2025-05-07"],
      records: {
        14: ["present", "absent", "present", "present", "absent"],
        15: ["present", "present", "late", "present", "present"]
      }
    }
  });
  
  // New student state
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    parent: ""
  });
  
  // Filter classes based on search query
  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.schedule.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle creating a new class
  const handleCreateClass = () => {
    // Validate form
    if (!newClass.name.trim() || !newClass.grade || !newClass.room.trim() || !newClass.schedule.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Create new class
    const newClassObj = {
      id: Date.now(),
      name: newClass.name,
      grade: newClass.grade,
      room: newClass.room,
      schedule: newClass.schedule,
      description: newClass.description,
      students: 0,
      attendance: 0,
      sessions: 0
    };
    
    // Add to classes
    setClasses(prev => [...prev, newClassObj]);
    
    // Initialize empty students array for this class
    setStudentsData(prev => ({
      ...prev,
      [newClassObj.id]: []
    }));
    
    // Initialize empty attendance data for this class
    setAttendanceData(prev => ({
      ...prev,
      [newClassObj.id]: {
        dates: [],
        records: {}
      }
    }));
    
    // Reset form
    setNewClass({
      name: "",
      grade: "",
      room: "",
      schedule: "",
      description: ""
    });
    
    // Show success message
    toast({
      title: "Class created",
      description: "The class has been created successfully."
    });
  };
  
  // Handle adding a new student
  const handleAddStudent = () => {
    if (!newStudent.name.trim() || !newStudent.email.trim() || !newStudent.parent.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all student information.",
        variant: "destructive"
      });
      return;
    }
    
    const newStudentObj = {
      id: Date.now(),
      name: newStudent.name,
      email: newStudent.email,
      parent: newStudent.parent,
      attendance: 100
    };
    
    setStudentsData(prev => {
      const updated = { ...prev };
      updated[selectedClass.id] = [...updated[selectedClass.id], newStudentObj];
      return updated;
    });
    
    // Initialize attendance records for this student
    setAttendanceData(prev => {
      const updated = { ...prev };
      updated[selectedClass.id].records[newStudentObj.id] = 
        updated[selectedClass.id].dates.map(() => "present");
      return updated;
    });
    
    // Update class student count
    setClasses(prev => 
      prev.map(cls => 
        cls.id === selectedClass.id 
          ? { ...cls, students: cls.students + 1 } 
          : cls
      )
    );
    
    // Reset form
    setNewStudent({
      name: "",
      email: "",
      parent: ""
    });
    
    toast({
      title: "Student added",
      description: `${newStudent.name} has been added to the class.`
    });
  };
  
  // Handle removing a student
  const handleRemoveStudent = (studentId) => {
    setStudentsData(prev => {
      const updated = { ...prev };
      updated[selectedClass.id] = updated[selectedClass.id].filter(
        student => student.id !== studentId
      );
      return updated;
    });
    
    // Remove attendance records for this student
    setAttendanceData(prev => {
      const updated = { ...prev };
      delete updated[selectedClass.id].records[studentId];
      return updated;
    });
    
    // Update class student count
    setClasses(prev => 
      prev.map(cls => 
        cls.id === selectedClass.id 
          ? { ...cls, students: cls.students - 1 } 
          : cls
      )
    );
    
    toast({
      title: "Student removed",
      description: "The student has been removed from the class."
    });
  };
  
  // Handle deleting a class
  const handleDeleteClass = (classId) => {
    setClasses(prev => prev.filter(cls => cls.id !== classId));
    
    // Remove students and attendance data for this class
    setStudentsData(prev => {
      const updated = { ...prev };
      delete updated[classId];
      return updated;
    });
    
    setAttendanceData(prev => {
      const updated = { ...prev };
      delete updated[classId];
      return updated;
    });
    
    setSelectedClass(null);
    
    toast({
      title: "Class deleted",
      description: "The class has been deleted successfully."
    });
  };
  
  // Handle updating attendance
  const handleUpdateAttendance = (studentId, dateIndex, status) => {
    setAttendanceData(prev => {
      const updated = { ...prev };
      updated[selectedClass.id].records[studentId][dateIndex] = status;
      return updated;
    });
    
    // Update student attendance percentage
    setStudentsData(prev => {
      const updated = { ...prev };
      const studentIndex = updated[selectedClass.id].findIndex(s => s.id === studentId);
      
      if (studentIndex !== -1) {
        const records = attendanceData[selectedClass.id].records[studentId];
        const presentCount = records.filter(r => r === "present").length;
        const attendance = Math.round((presentCount / records.length) * 100);
        
        updated[selectedClass.id][studentIndex] = {
          ...updated[selectedClass.id][studentIndex],
          attendance
        };
      }
      
      return updated;
    });
    
    // Update class average attendance
    setClasses(prev => {
      const updated = [...prev];
      const classIndex = updated.findIndex(c => c.id === selectedClass.id);
      
      if (classIndex !== -1) {
        const students = studentsData[selectedClass.id];
        const totalAttendance = students.reduce((sum, student) => sum + student.attendance, 0);
        const averageAttendance = Math.round(totalAttendance / students.length);
        
        updated[classIndex] = {
          ...updated[classIndex],
          attendance: averageAttendance
        };
      }
      
      return updated;
    });
  };
  
  // Handle adding a new attendance date
  const handleAddAttendanceDate = () => {
    const today = new Date().toISOString().split('T')[0];
    
    setAttendanceData(prev => {
      const updated = { ...prev };
      updated[selectedClass.id].dates = [today, ...updated[selectedClass.id].dates];
      
      // Initialize all students as present for this date
      Object.keys(updated[selectedClass.id].records).forEach(studentId => {
        updated[selectedClass.id].records[studentId] = 
          ["present", ...updated[selectedClass.id].records[studentId]];
      });
      
      return updated;
    });
    
    // Update class session count
    setClasses(prev => 
      prev.map(cls => 
        cls.id === selectedClass.id 
          ? { ...cls, sessions: cls.sessions + 1 } 
          : cls
      )
    );
    
    toast({
      title: "Attendance date added",
      description: "A new attendance date has been added."
    });
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Get status badge for attendance
  const getAttendanceBadge = (status) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-500">Present</Badge>;
      case "absent":
        return <Badge className="bg-red-500">Absent</Badge>;
      case "late":
        return <Badge className="bg-amber-500">Late</Badge>;
      default:
        return null;
    }
  };
  
  // Get status icon for attendance
  const getAttendanceIcon = (status) => {
    switch (status) {
      case "present":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "absent":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "late":
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };
  
  // Handle exporting class data
  const handleExportClass = () => {
    toast({
      title: "Exporting class data",
      description: "The class data is being exported as a CSV file."
    });
  };
  
  // Handle exporting attendance data
  const handleExportAttendance = () => {
    toast({
      title: "Exporting attendance data",
      description: "The attendance data is being exported as a CSV file."
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Class Management</CardTitle>
            <CardDescription>
              Manage your classes, students, and attendance
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Class
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Class</DialogTitle>
                <DialogDescription>
                  Add a new class to your teaching schedule
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="className" className="text-right">
                    Class Name*
                  </Label>
                  <Input
                    id="className"
                    value={newClass.name}
                    onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                    className="col-span-3"
                    placeholder="e.g. Mathematics"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="grade" className="text-right">
                    Grade Level*
                  </Label>
                  <Select 
                    value={newClass.grade} 
                    onValueChange={(value) => setNewClass({...newClass, grade: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select grade level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grade 6">Grade 6</SelectItem>
                      <SelectItem value="Grade 7">Grade 7</SelectItem>
                      <SelectItem value="Grade 8">Grade 8</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="room" className="text-right">
                    Room Number*
                  </Label>
                  <Input
                    id="room"
                    value={newClass.room}
                    onChange={(e) => setNewClass({...newClass, room: e.target.value})}
                    className="col-span-3"
                    placeholder="e.g. 101"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="schedule" className="text-right">
                    Schedule*
                  </Label>
                  <Input
                    id="schedule"
                    value={newClass.schedule}
                    onChange={(e) => setNewClass({...newClass, schedule: e.target.value})}
                    className="col-span-3"
                    placeholder="e.g. Mon, Wed, Fri • 10:00 AM"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newClass.description}
                    onChange={(e) => setNewClass({...newClass, description: e.target.value})}
                    className="col-span-3 min-h-[100px]"
                    placeholder="Enter class description"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  onClick={handleCreateClass}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Create Class
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/3">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search classes..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                {filteredClasses.length > 0 ? (
                  <div className="divide-y">
                    {filteredClasses.map((cls) => (
                      <div 
                        key={cls.id}
                        className={`p-3 cursor-pointer hover:bg-muted ${
                          selectedClass?.id === cls.id ? 'bg-muted' : ''
                        }`}
                        onClick={() => {
                          setSelectedClass(cls);
                          setActiveTab("details");
                        }}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium">{cls.name}</h4>
                          <Badge variant="outline">{cls.grade}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          Room {cls.room} • {cls.schedule}
                        </p>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>{cls.students} students</span>
                          <span>{cls.attendance}% attendance</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">No classes found</h3>
                    <p className="text-muted-foreground">
                      {searchQuery ? "No classes match your search" : "Create a class to get started"}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="md:w-2/3">
              {selectedClass ? (
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold">{selectedClass.name}</h2>
                      <p className="text-muted-foreground">
                        {selectedClass.grade} • Room {selectedClass.room} • {selectedClass.schedule}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleExportClass()}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteClass(selectedClass.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-4">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="students">Students</TabsTrigger>
                      <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="details" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Class Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
                              <p>{selectedClass.description || "No description provided."}</p>
                            </div>
                            
                            <Separator />
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Students</h4>
                                <p className="text-2xl font-bold">{selectedClass.students}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">Average Attendance</h4>
                                <p className="text-2xl font-bold">{selectedClass.attendance}%</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">Class Sessions</h4>
                                <p className="text-2xl font-bold">{selectedClass.sessions}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Button 
                              variant="outline" 
                              className="h-auto py-4 flex flex-col items-center justify-center"
                              onClick={() => setActiveTab("students")}
                            >
                              <UserPlus className="h-6 w-6 mb-2" />
                              <span>Add Students</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              className="h-auto py-4 flex flex-col items-center justify-center"
                              onClick={() => setActiveTab("attendance")}
                            >
                              <Calendar className="h-6 w-6 mb-2" />
                              <span>Take Attendance</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              className="h-auto py-4 flex flex-col items-center justify-center"
                              onClick={() => handleExportClass()}
                            >
                              <Download className="h-6 w-6 mb-2" />
                              <span>Export Class Data</span>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="students">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                          <CardTitle>Students</CardTitle>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <UserPlus className="h-4 w-4 mr-2" />
                                Add Student
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add New Student</DialogTitle>
                                <DialogDescription>
                                  Add a student to {selectedClass.name} ({selectedClass.grade})
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="studentName" className="text-right">
                                    Full Name
                                  </Label>
                                  <Input
                                    id="studentName"
                                    value={newStudent.name}
                                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                                    className="col-span-3"
                                    placeholder="e.g. John Smith"
                                  />
                                </div>
                                
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="studentEmail" className="text-right">
                                    Email
                                  </Label>
                                  <Input
                                    id="studentEmail"
                                    type="email"
                                    value={newStudent.email}
                                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                                    className="col-span-3"
                                    placeholder="e.g. john.s@example.com"
                                  />
                                </div>
                                
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="parentName" className="text-right">
                                    Parent Name
                                  </Label>
                                  <Input
                                    id="parentName"
                                    value={newStudent.parent}
                                    onChange={(e) => setNewStudent({...newStudent, parent: e.target.value})}
                                    className="col-span-3"
                                    placeholder="e.g. Jane Smith"
                                  />
                                </div>
                              </div>
                              
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button 
                                  onClick={handleAddStudent}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Add Student
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </CardHeader>
                        <CardContent>
                          {studentsData[selectedClass.id]?.length > 0 ? (
                            <div className="rounded-md border">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Parent</TableHead>
                                    <TableHead>Attendance</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {studentsData[selectedClass.id].map((student) => (
                                    <TableRow key={student.id}>
                                      <TableCell className="font-medium">
                                        <div className="flex items-center">
                                          <Avatar className="h-8 w-8 mr-2">
                                            <AvatarFallback>
                                              {student.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                          </Avatar>
                                          {student.name}
                                        </div>
                                      </TableCell>
                                      <TableCell>{student.email}</TableCell>
                                      <TableCell>{student.parent}</TableCell>
                                      <TableCell>
                                        <Badge className={
                                          student.attendance >= 90 ? 'bg-green-500' :
                                          student.attendance >= 80 ? 'bg-amber-500' :
                                          'bg-red-500'
                                        }>
                                          {student.attendance}%
                                        </Badge>
                                      </TableCell>
                                      <TableCell className="text-right">
                                        <Button 
                                          variant="ghost" 
                                          size="sm"
                                          onClick={() => handleRemoveStudent(student.id)}
                                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                                        >
                                          Remove
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-40 border rounded-lg">
                              <div className="text-center">
                                <Users className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                                <h3 className="text-lg font-medium">No students</h3>
                                <p className="text-muted-foreground mb-4">
                                  This class doesn't have any students yet
                                </p>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button className="bg-green-600 hover:bg-green-700">
                                      <UserPlus className="h-4 w-4 mr-2" />
                                      Add First Student
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Add New Student</DialogTitle>
                                      <DialogDescription>
                                        Add a student to {selectedClass.name} ({selectedClass.grade})
                                      </DialogDescription>
                                    </DialogHeader>
                                    
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="studentName" className="text-right">
                                          Full Name
                                        </Label>
                                        <Input
                                          id="studentName"
                                          value={newStudent.name}
                                          onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                                          className="col-span-3"
                                          placeholder="e.g. John Smith"
                                        />
                                      </div>
                                      
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="studentEmail" className="text-right">
                                          Email
                                        </Label>
                                        <Input
                                          id="studentEmail"
                                          type="email"
                                          value={newStudent.email}
                                          onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                                          className="col-span-3"
                                          placeholder="e.g. john.s@example.com"
                                        />
                                      </div>
                                      
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="parentName" className="text-right">
                                          Parent Name
                                        </Label>
                                        <Input
                                          id="parentName"
                                          value={newStudent.parent}
                                          onChange={(e) => setNewStudent({...newStudent, parent: e.target.value})}
                                          className="col-span-3"
                                          placeholder="e.g. Jane Smith"
                                        />
                                      </div>
                                    </div>
                                    
                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                      </DialogClose>
                                      <Button 
                                        onClick={handleAddStudent}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        Add Student
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="attendance">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                          <CardTitle>Attendance</CardTitle>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleExportAttendance()}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Export
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={handleAddAttendanceDate}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Date
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {studentsData[selectedClass.id]?.length > 0 && attendanceData[selectedClass.id]?.dates.length > 0 ? (
                            <div className="rounded-md border overflow-x-auto">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead className="min-w-[150px]">Student</TableHead>
                                    {attendanceData[selectedClass.id].dates.map((date, index) => (
                                      <TableHead key={index}>{formatDate(date)}</TableHead>
                                    ))}
                                    <TableHead>Attendance</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {studentsData[selectedClass.id].map((student) => (
                                    <TableRow key={student.id}>
                                      <TableCell className="font-medium">
                                        <div className="flex items-center">
                                          <Avatar className="h-8 w-8 mr-2">
                                            <AvatarFallback>
                                              {student.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                          </Avatar>
                                          {student.name}
                                        </div>
                                      </TableCell>
                                      
                                      {attendanceData[selectedClass.id].dates.map((date, dateIndex) => (
                                        <TableCell key={dateIndex}>
                                          <Select 
                                            value={attendanceData[selectedClass.id].records[student.id]?.[dateIndex] || "present"} 
                                            onValueChange={(value) => handleUpdateAttendance(student.id, dateIndex, value)}
                                          >
                                            <SelectTrigger className="w-[100px]">
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="present">
                                                <div className="flex items-center">
                                                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                                                  Present
                                                </div>
                                              </SelectItem>
                                              <SelectItem value="absent">
                                                <div className="flex items-center">
                                                  <XCircle className="h-4 w-4 text-red-500 mr-2" />
                                                  Absent
                                                </div>
                                              </SelectItem>
                                              <SelectItem value="late">
                                                <div className="flex items-center">
                                                  <Clock className="h-4 w-4 text-amber-500 mr-2" />
                                                  Late
                                                </div>
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </TableCell>
                                      ))}
                                      
                                      <TableCell>
                                        <Badge className={
                                          student.attendance >= 90 ? 'bg-green-500' :
                                          student.attendance >= 80 ? 'bg-amber-500' :
                                          'bg-red-500'
                                        }>
                                          {student.attendance}%
                                        </Badge>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-40 border rounded-lg">
                              <div className="text-center">
                                <Calendar className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                                <h3 className="text-lg font-medium">No attendance records</h3>
                                <p className="text-muted-foreground mb-4">
                                  {studentsData[selectedClass.id]?.length === 0 
                                    ? "Add students first before taking attendance" 
                                    : "Start tracking attendance by adding a date"}
                                </p>
                                {studentsData[selectedClass.id]?.length > 0 && (
                                  <Button 
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={handleAddAttendanceDate}
                                  >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add First Date
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 border rounded-lg">
                  <div className="text-center">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">Select a class</h3>
                    <p className="text-muted-foreground">
                      Choose a class from the list to view details
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="mt-4 bg-green-600 hover:bg-green-700"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Create New Class
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New Class</DialogTitle>
                          <DialogDescription>
                            Add a new class to your teaching schedule
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="className" className="text-right">
                              Class Name*
                            </Label>
                            <Input
                              id="className"
                              value={newClass.name}
                              onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                              className="col-span-3"
                              placeholder="e.g. Mathematics"
                            />
                          </div>
                          
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="grade" className="text-right">
                              Grade Level*
                            </Label>
                            <Select 
                              value={newClass.grade} 
                              onValueChange={(value) => setNewClass({...newClass, grade: value})}
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select grade level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Grade 6">Grade 6</SelectItem>
                                <SelectItem value="Grade 7">Grade 7</SelectItem>
                                <SelectItem value="Grade 8">Grade 8</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="room" className="text-right">
                              Room Number*
                            </Label>
                            <Input
                              id="room"
                              value={newClass.room}
                              onChange={( e) => setNewClass({...newClass, room: e.target.value})}
                              className="col-span-3"
                              placeholder="e.g. 101"
                            />
                          </div>
                          
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="schedule" className="text-right">
                              Schedule*
                            </Label>
                            <Input
                              id="schedule"
                              value={newClass.schedule}
                              onChange={(e) => setNewClass({...newClass, schedule: e.target.value})}
                              className="col-span-3"
                              placeholder="e.g. Mon, Wed, Fri • 10:00 AM"
                            />
                          </div>
                          
                          <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="description" className="text-right pt-2">
                              Description
                            </Label>
                            <Textarea
                              id="description"
                              value={newClass.description}
                              onChange={(e) => setNewClass({...newClass, description: e.target.value})}
                              className="col-span-3 min-h-[100px]"
                              placeholder="Enter class description"
                            />
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button 
                            onClick={handleCreateClass}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Create Class
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}