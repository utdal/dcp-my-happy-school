import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Download, 
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

export default function ParentGrades() {
  const [activeChildTab, setActiveChildTab] = useState("emma");
  const [activeViewTab, setActiveViewTab] = useState("current");
  const { toast } = useToast();

  // Mock data for grades
  const gradesData = {
    emma: {
      currentGrades: [
        { subject: "Mathematics", grade: "A", percentage: 92, teacher: "Ms. Wilson", trend: "up" },
        { subject: "English", grade: "A-", percentage: 88, teacher: "Ms. Garcia", trend: "same" },
        { subject: "Science", grade: "B+", percentage: 85, teacher: "Mr. Thompson", trend: "up" },
        { subject: "Social Studies", grade: "A", percentage: 90, teacher: "Mr. Davis", trend: "down" },
        { subject: "Art", grade: "A+", percentage: 95, teacher: "Ms. Martinez", trend: "same" },
        { subject: "Physical Education", grade: "A", percentage: 93, teacher: "Mr. Johnson", trend: "same" }
      ],
      previousGrades: [
        { term: "Fall 2024", gpa: 3.8, grades: [
          { subject: "Mathematics", grade: "B+", percentage: 87 },
          { subject: "English", grade: "A-", percentage: 90 },
          { subject: "Science", grade: "B", percentage: 83 },
          { subject: "Social Studies", grade: "A", percentage: 92 },
          { subject: "Art", grade: "A", percentage: 94 },
          { subject: "Physical Education", grade: "A", percentage: 95 }
        ]}
      ],
      reports: [
        { title: "Q3 Progress Report", date: "May 15, 2025", type: "progress" },
        { title: "Q2 Report Card", date: "March 10, 2025", type: "report" }
      ]
    },
    michael: {
      currentGrades: [
        { subject: "Mathematics", grade: "C+", percentage: 78, teacher: "Mr. Roberts", trend: "up" },
        { subject: "English", grade: "B", percentage: 85, teacher: "Ms. Adams", trend: "same" },
        { subject: "Science", grade: "C", percentage: 72, teacher: "Ms. Johnson", trend: "down" },
        { subject: "Social Studies", grade: "B-", percentage: 80, teacher: "Mr. Davis", trend: "up" },
        { subject: "Art", grade: "B+", percentage: 87, teacher: "Ms. Martinez", trend: "same" },
        { subject: "Physical Education", grade: "A-", percentage: 91, teacher: "Mr. Johnson", trend: "down" }
      ],
      previousGrades: [
        { term: "Fall 2024", gpa: 2.9, grades: [
          { subject: "Mathematics", grade: "C", percentage: 75 },
          { subject: "English", grade: "B", percentage: 83 },
          { subject: "Science", grade: "C+", percentage: 77 },
          { subject: "Social Studies", grade: "B-", percentage: 81 },
          { subject: "Art", grade: "B", percentage: 85 },
          { subject: "Physical Education", grade: "B+", percentage: 88 }
        ]}
      ],
      reports: [
        { title: "Q3 Progress Report", date: "May 15, 2025", type: "progress" },
        { title: "Q2 Report Card", date: "March 10, 2025", type: "report" },
        { title: "Academic Improvement Plan", date: "April 5, 2025", type: "plan" }
      ]
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return "text-green-600 dark:text-green-400";
    if (grade.startsWith('B')) return "text-blue-600 dark:text-blue-400";
    if (grade.startsWith('C')) return "text-amber-600 dark:text-amber-400";
    if (grade.startsWith('D')) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getReportBadge = (type) => {
    switch (type) {
      case "progress":
        return <Badge className="bg-blue-500">Progress Report</Badge>;
      case "report":
        return <Badge className="bg-green-500">Report Card</Badge>;
      case "plan":
        return <Badge className="bg-amber-500">Action Plan</Badge>;
      default:
        return <Badge variant="outline">Document</Badge>;
    }
  };

  const calculateGPA = (grades) => {
    return grades.reduce((sum, subject) => {
      let points = 0;
      if (subject.grade === "A+" || subject.grade === "A") points = 4.0;
      else if (subject.grade === "A-") points = 3.7;
      else if (subject.grade === "B+") points = 3.3;
      else if (subject.grade === "B") points = 3.0;
      else if (subject.grade === "B-") points = 2.7;
      else if (subject.grade === "C+") points = 2.3;
      else if (subject.grade === "C") points = 2.0;
      else if (subject.grade === "C-") points = 1.7;
      else if (subject.grade === "D+") points = 1.3;
      else if (subject.grade === "D") points = 1.0;
      else if (subject.grade === "D-") points = 0.7;
      else points = 0;
      
      return sum + points;
    }, 0) / grades.length;
  };

  const handleDownloadReport = (report) => {
    toast({
      title: "Downloading report",
      description: `${report.title} is being downloaded.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Grades & Academic Reports</CardTitle>
          <CardDescription>
            View your children's academic performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeChildTab} onValueChange={setActiveChildTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="emma">Emma Johnson</TabsTrigger>
              <TabsTrigger value="michael">Michael Johnson</TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Current GPA</p>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {calculateGPA(gradesData[activeChildTab].currentGrades).toFixed(1)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Class Rank</p>
                    <p className="text-3xl font-bold">
                      {activeChildTab === "emma" ? "12 / 120" : "45 / 125"}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Attendance Rate</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {activeChildTab === "emma" ? "97%" : "93%"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs value={activeViewTab} onValueChange={setActiveViewTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="current">Current Grades</TabsTrigger>
                <TabsTrigger value="previous">Previous Term</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              
              <TabsContent value="current">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Term Grades</CardTitle>
                    <CardDescription>
                      Spring 2025 - Quarter 3
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead>Percentage</TableHead>
                            <TableHead>Teacher</TableHead>
                            <TableHead>Trend</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {gradesData[activeChildTab].currentGrades.map((subject, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{subject.subject}</TableCell>
                              <TableCell className={`font-bold ${getGradeColor(subject.grade)}`}>
                                {subject.grade}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Progress value={subject.percentage} className="h-2 w-20" />
                                  <span>{subject.percentage}%</span>
                                </div>
                              </TableCell>
                              <TableCell>{subject.teacher}</TableCell>
                              <TableCell>{getTrendIcon(subject.trend)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="previous">
                {gradesData[activeChildTab].previousGrades.map((term, termIndex) => (
                  <Card key={termIndex}>
                    <CardHeader>
                      <CardTitle>{term.term}</CardTitle>
                      <CardDescription>
                        GPA: {term.gpa.toFixed(1)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Subject</TableHead>
                              <TableHead>Grade</TableHead>
                              <TableHead>Percentage</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {term.grades.map((subject, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{subject.subject}</TableCell>
                                <TableCell className={`font-bold ${getGradeColor(subject.grade)}`}>
                                  {subject.grade}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <Progress value={subject.percentage} className="h-2 w-20" />
                                    <span>{subject.percentage}%</span>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle>Official Academic Reports</CardTitle>
                    <CardDescription>
                      Report cards and progress reports
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {gradesData[activeChildTab].reports.map((report, index) => (
                        <div key={index} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex items-start">
                            <div className="p-2 bg-muted rounded-lg mr-3">
                              <FileText className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                              <h4 className="font-medium">{report.title}</h4>
                              <p className="text-sm text-muted-foreground flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {report.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getReportBadge(report.type)}
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDownloadReport(report)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Academic Insights</CardTitle>
          <CardDescription>
            Key observations for {activeChildTab === "emma" ? "Emma's" : "Michael's"} performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeChildTab === "emma" ? (
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h4 className="font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                  Strong Performance in Mathematics
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Emma has shown excellent progress in Mathematics, improving from a B+ to an A this term.
                </p>
              </div>
            ) : (
              <div className="border-l-4 border-amber-500 pl-4 py-2">
                <h4 className="font-medium flex items-center">
                  <TrendingDown className="h-4 w-4 text-amber-500 mr-2" />
                  Science Needs Attention
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Michael's Science grade has decreased from a C+ to a C this term. Consider scheduling a meeting with Ms. Johnson.
                </p>
              </div>
            )}
            <div className="border-l-4 border-indigo-500 pl-4 py-2">
              <h4 className="font-medium flex items-center">
                <Calendar className="h-4 w-4 text-indigo-500 mr-2" />
                Upcoming Parent-Teacher Conference
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                Don't forget the scheduled parent-teacher conference on May 22, 2025.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}