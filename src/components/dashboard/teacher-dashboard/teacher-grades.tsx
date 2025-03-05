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
import { Save, FileDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TeacherGrades() {
  const { toast } = useToast();
  const [activeClass, setActiveClass] = useState("grade6Math");
  const [editingCell, setEditingCell] = useState<{studentId: number, assignmentId: number} | null>(null);
  
  // Mock data for classes
  const classes = [
    { id: "grade6Math", name: "Grade 6 - Math" },
    { id: "grade7Math", name: "Grade 7 - Math" },
    { id: "grade8Math", name: "Grade 8 - Math" }
  ];
  
  // Mock data for students and grades
  const [gradesData, setGradesData] = useState({
    grade6Math: {
      students: [
        { id: 1, name: "Emma Johnson", grades: [92, 88, 90, ""] },
        { id: 2, name: "David Williams", grades: [85, 82, 78, ""] },
        { id: 3, name: "Lisa Brown", grades: [95, 92, 96, ""] },
        { id: 4, name: "Michael Davis", grades: [78, 75, 80, ""] },
        { id: 5, name: "Sarah Miller", grades: [88, 85, 90, ""] }
      ],
      assignments: [
        { id: 1, name: "Quiz 1", date: "May 5" },
        { id: 2, name: "Homework", date: "May 10" },
        { id: 3, name: "Quiz 2", date: "May 15" },
        { id: 4, name: "Final Exam", date: "May 30" }
      ]
    },
    grade7Math: {
      students: [
        { id: 6, name: "Emily Wilson", grades: [82, 85, 80, ""] },
        { id: 7, name: "Thomas Miller", grades: [75, 78, 72, ""] },
        { id: 8, name: "Jessica Taylor", grades: [90, 92, 88, ""] }
      ],
      assignments: [
        { id: 1, name: "Quiz 1", date: "May 5" },
        { id: 2, name: "Homework", date: "May 10" },
        { id: 3, name: "Quiz 2", date: "May 15" },
        { id: 4, name: "Final Exam", date: "May 30" }
      ]
    },
    grade8Math: {
      students: [
        { id: 11, name: "Andrew Taylor", grades: [88, 85, 90, ""] },
        { id: 12, name: "Olivia Anderson", grades: [92, 95, 90, ""] },
        { id: 13, name: "Daniel Martinez", grades: [78, 75, 80, ""] }
      ],
      assignments: [
        { id: 1, name: "Quiz 1", date: "May 5" },
        { id: 2, name: "Homework", date: "May 10" },
        { id: 3, name: "Quiz 2", date: "May 15" },
        { id: 4, name: "Final Exam", date: "May 30" }
      ]
    }
  });

  // Calculate average grade for a student
  const calculateAverage = (grades) => {
    const validGrades = grades.filter(grade => grade !== "");
    if (validGrades.length === 0) return "-";
    const sum = validGrades.reduce((acc, grade) => acc + Number(grade), 0);
    return (sum / validGrades.length).toFixed(1);
  };

  // Get letter grade based on numeric grade
  const getLetterGrade = (grade) => {
    if (grade === "-") return "-";
    const numGrade = parseFloat(grade);
    if (numGrade >= 90) return "A";
    if (numGrade >= 80) return "B";
    if (numGrade >= 70) return "C";
    if (numGrade >= 60) return "D";
    return "F";
  };

  // Handle grade change
  const handleGradeChange = (e, studentId, assignmentId) => {
    const value = e.target.value;
    
    // Validate input (only numbers or empty string)
    if (value !== "" && !/^\d+$/.test(value)) {
      return;
    }
    
    // Ensure grade is within valid range (0-100)
    if (value !== "" && (parseInt(value) < 0 || parseInt(value) > 100)) {
      return;
    }
    
    setGradesData(prev => {
      const newData = { ...prev };
      const studentIndex = newData[activeClass].students.findIndex(s => s.id === studentId);
      
      if (studentIndex !== -1) {
        newData[activeClass].students[studentIndex].grades[assignmentId - 1] = value === "" ? "" : parseInt(value);
      }
      
      return newData;
    });
  };

  // Handle cell click for editing
  const handleCellClick = (studentId, assignmentId) => {
    setEditingCell({ studentId, assignmentId });
  };

  // Handle save grades
  const handleSaveGrades = () => {
    toast({
      title: "Grades saved",
      description: "All grades have been saved successfully."
    });
    setEditingCell(null);
  };

  // Handle export grades
  const handleExportGrades = () => {
    toast({
      title: "Grades exported",
      description: "Grades have been exported to CSV successfully."
    });
  };

  // Get grade cell style based on grade value
  const getGradeStyle = (grade) => {
    if (grade === "") return "";
    
    const numGrade = Number(grade);
    if (numGrade >= 90) return "text-green-600 dark:text-green-400 font-medium";
    if (numGrade >= 80) return "text-blue-600 dark:text-blue-400 font-medium";
    if (numGrade >= 70) return "text-yellow-600 dark:text-yellow-400 font-medium";
    if (numGrade >= 60) return "text-orange-600 dark:text-orange-400 font-medium";
    return "text-red-600 dark:text-red-400 font-medium";
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Grade Tracking</CardTitle>
            <CardDescription>
              Manage student grades for your classes
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleExportGrades}
            >
              <FileDown className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleSaveGrades}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
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
            
            {Object.keys(gradesData).map(classId => (
              <TabsContent key={classId} value={classId} className="m-0">
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Student Name</TableHead>
                        {gradesData[classId].assignments.map(assignment => (
                          <TableHead key={assignment.id}>
                            {assignment.name}
                            <div className="text-xs text-muted-foreground">{assignment.date}</div>
                          </TableHead>
                        ))}
                        <TableHead>Average</TableHead>
                        <TableHead>Grade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {gradesData[classId].students.map(student => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          
                          {student.grades.map((grade, index) => (
                            <TableCell 
                              key={index}
                              className={`cursor-pointer ${getGradeStyle(grade)}`}
                              onClick={() => handleCellClick(student.id, index + 1)}
                            >
                              {editingCell && 
                               editingCell.studentId === student.id && 
                               editingCell.assignmentId === index + 1 ? (
                                <Input
                                  type="text"
                                  value={grade}
                                  onChange={(e) => handleGradeChange(e, student.id, index + 1)}
                                  className="w-16 h-8 p-1 text-center"
                                  autoFocus
                                  onBlur={() => setEditingCell(null)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') setEditingCell(null);
                                  }}
                                />
                              ) : (
                                grade === "" ? "—" : grade
                              )}
                            </TableCell>
                          ))}
                          
                          <TableCell className="font-medium">
                            {calculateAverage(student.grades)}
                          </TableCell>
                          <TableCell>
                            <Badge className={
                              getLetterGrade(calculateAverage(student.grades)) === 'A' ? 'bg-green-500' :
                              getLetterGrade(calculateAverage(student.grades)) === 'B' ? 'bg-blue-500' :
                              getLetterGrade(calculateAverage(student.grades)) === 'C' ? 'bg-yellow-500' :
                              getLetterGrade(calculateAverage(student.grades)) === 'D' ? 'bg-orange-500' :
                              getLetterGrade(calculateAverage(student.grades)) === 'F' ? 'bg-red-500' : 'bg-gray-500'
                            }>
                              {getLetterGrade(calculateAverage(student.grades))}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Click on any grade cell to edit. Press Enter or click outside to save.</p>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {gradesData[classId].students.filter(student => 
                        getLetterGrade(calculateAverage(student.grades)) === 'A'
                      ).length}
                    </div>
                    <div className="text-sm text-muted-foreground">A Grades</div>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {gradesData[classId].students.filter(student => 
                        getLetterGrade(calculateAverage(student.grades)) === 'B'
                      ).length}
                    </div>
                    <div className="text-sm text-muted-foreground">B Grades</div>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {gradesData[classId].students.filter(student => 
                        getLetterGrade(calculateAverage(student.grades)) === 'C'
                      ).length}
                    </div>
                    <div className="text-sm text-muted-foreground">C Grades</div>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {gradesData[classId].students.filter(student => 
                        getLetterGrade(calculateAverage(student.grades)) === 'D' || 
                        getLetterGrade(calculateAverage(student.grades)) === 'F'
                      ).length}
                    </div>
                    <div className="text-sm text-muted-foreground">D/F Grades</div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}