import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ChevronLeft, 
  ChevronRight, 
  UserPlus,
  Search,
  Filter,
  AlertCircle
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminEnrollment() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGrade, setFilterGrade] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  
  // New student form state
  const [newStudent, setNewStudent] = useState({
    name: "",
    grade: "",
    enrollmentDate: new Date().toISOString().split('T')[0]
  });
  
  // Mock data for enrollment statistics
  const [enrollmentStats, setEnrollmentStats] = useState({
    totalStudents: 1248,
    maxCapacity: 1500,
    byGrade: {
      "Grade 1": { current: 102, capacity: 120 },
      "Grade 2": { current: 98, capacity: 120 },
      "Grade 3": { current: 112, capacity: 120 },
      "Grade 4": { current: 145, capacity: 150 },
      "Grade 5": { current: 138, capacity: 150 },
      "Grade 6": { current: 145, capacity: 150 },
      "Grade 7": { current: 125, capacity: 150 },
      "Grade 8": { current: 118, capacity: 150 },
      "Grade 9": { current: 113, capacity: 150 },
      "Grade 10": { current: 58, capacity: 80 },
      "Grade 11": { current: 52, capacity: 80 },
      "Grade 12": { current: 42, capacity: 80 }
    }
  });

  // Mock data for students
  const [studentsData, setStudentsData] = useState([
    { id: 1, name: "Emma Johnson", grade: "Grade 3", enrollmentDate: "2023-09-01", status: "active" },
    { id: 2, name: "David Williams", grade: "Grade 5", enrollmentDate: "2023-09-01", status: "active" },
    { id: 3, name: "Lisa Brown", grade: "Grade 2", enrollmentDate: "2023-09-01", status: "active" },
    { id: 4, name: "Michael Davis", grade: "Grade 7", enrollmentDate: "2023-09-01", status: "active" },
    { id: 5, name: "Sarah Miller", grade: "Grade 4", enrollmentDate: "2023-09-01", status: "active" },
    { id: 6, name: "James Wilson", grade: "Grade 6", enrollmentDate: "2023-09-01", status: "active" },
    { id: 7, name: "Emily Taylor", grade: "Grade 1", enrollmentDate: "2023-09-01", status: "active" },
    { id: 8, name: "Robert Anderson", grade: "Grade 9", enrollmentDate: "2023-09-01", status: "active" },
    { id: 9, name: "Jennifer Martinez", grade: "Grade 8", enrollmentDate: "2023-09-01", status: "active" },
    { id: 10, name: "Daniel Thompson", grade: "Grade 10", enrollmentDate: "2023-09-01", status: "active" },
    { id: 11, name: "Jessica White", grade: "Grade 4", enrollmentDate: "2023-09-01", status: "active" },
    { id: 12, name: "Christopher Lee", grade: "Grade 7", enrollmentDate: "2023-09-01", status: "active" },
    { id: 13, name: "Amanda Harris", grade: "Grade 2", enrollmentDate: "2023-09-01", status: "active" },
    { id: 14, name: "Matthew Clark", grade: "Grade 5", enrollmentDate: "2023-09-01", status: "active" },
    { id: 15, name: "Olivia Lewis", grade: "Grade 11", enrollmentDate: "2023-09-01", status: "active" }
  ]);

  // Filter students based on search query and grade
  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = filterGrade === "all" || student.grade === filterGrade;
    
    return matchesSearch && matchesGrade;
  });

  // Pagination
  const studentsPerPage = 10;
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  // Calculate fill percentage for progress bars
  const calculateFillPercentage = (current, capacity) => {
    return (current / capacity) * 100;
  };

  // Get status badge for enrollment
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "withdrawn":
        return <Badge className="bg-red-500">Withdrawn</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      default:
        return null;
    }
  };

  // Handle adding a new student
  const handleAddStudent = () => {
    // Validate form
    if (!newStudent.name.trim() || !newStudent.grade) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create new student
    const student = {
      id: Date.now(),
      name: newStudent.name,
      grade: newStudent.grade,
      enrollmentDate: newStudent.enrollmentDate,
      status: "active"
    };

    // Add to students data
    setStudentsData(prev => [student, ...prev]);

    // Update enrollment stats
    setEnrollmentStats(prev => {
      const updated = { ...prev };
      updated.totalStudents += 1;
      if (updated.byGrade[student.grade]) {
        updated.byGrade[student.grade].current += 1;
      }
      return updated;
    });

    // Reset form
    setNewStudent({
      name: "",
      grade: "",
      enrollmentDate: new Date().toISOString().split('T')[0]
    });

    // Show success message
    toast({
      title: "Student enrolled",
      description: "The student has been enrolled successfully."
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Enrollment Management</CardTitle>
            <CardDescription>
              Manage student enrollment across all grade levels
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <UserPlus className="h-4 w-4 mr-2" />
                New Enrollment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enroll New Student</DialogTitle>
                <DialogDescription>
                  Add a new student to the school
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    className="col-span-3"
                    placeholder="Enter student's full name"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="grade" className="text-right">
                    Grade
                  </Label>
                  <Select 
                    value={newStudent.grade} 
                    onValueChange={(value) => setNewStudent({...newStudent, grade: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(enrollmentStats.byGrade).map(grade => (
                        <SelectItem key={grade} value={grade}>
                          {grade} ({enrollmentStats.byGrade[grade].current}/{enrollmentStats.byGrade[grade].capacity})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="enrollmentDate" className="text-right">
                    Enrollment Date
                  </Label>
                  <Input
                    id="enrollmentDate"
                    type="date"
                    value={newStudent.enrollmentDate}
                    onChange={(e) => setNewStudent({...newStudent, enrollmentDate: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  onClick={handleAddStudent}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Enroll Student
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Enrollment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{enrollmentStats.totalStudents}</div>
                <p className="text-xs text-muted-foreground">
                  {((enrollmentStats.totalStudents / enrollmentStats.maxCapacity) * 100).toFixed(1)}% of maximum capacity
                </p>
                <Progress 
                  value={(enrollmentStats.totalStudents / enrollmentStats.maxCapacity) * 100} 
                  className="h-2 mt-2" 
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Enrollment by Grade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(enrollmentStats.byGrade).slice(0, 5).map(([grade, data]) => (
                    <div key={grade}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{grade}</span>
                        <span>{data.current} / {data.capacity}</span>
                      </div>
                      <Progress 
                        value={calculateFillPercentage(data.current, data.capacity)} 
                        className="h-1" 
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search students..." 
                  className="pl-8 w-full md:w-[250px]" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select 
                value={filterGrade} 
                onValueChange={setFilterGrade}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  {Object.keys(enrollmentStats.byGrade).map(grade => (
                    <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-muted-foreground">
              Showing {paginatedStudents.length} of {filteredStudents.length} students
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead className="hidden md:table-cell">Enrollment Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStudents.length > 0 ? (
                  paginatedStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell className="hidden md:table-cell">{new Date(student.enrollmentDate).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <AlertCircle className="h-8 w-8 mb-2" />
                        <h3 className="font-medium">No students found</h3>
                        <p className="text-sm">
                          {searchQuery || filterGrade !== "all" 
                            ? "Try adjusting your search or filters" 
                            : "Enroll a student to get started"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}