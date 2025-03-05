import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Calendar, AlertCircle, CheckCircle } from "lucide-react";

export default function ParentAttendance() {
  // Mock data for attendance
  const attendanceData = {
    emma: {
      present: 78,
      absent: 2,
      late: 3,
      excused: 1,
      total: 84,
      records: [
        { date: "May 20, 2025", status: "present", notes: "" },
        { date: "May 19, 2025", status: "present", notes: "" },
        { date: "May 16, 2025", status: "excused", notes: "Family event" },
        { date: "May 15, 2025", status: "absent", notes: "Sick - doctor's note provided" },
        { date: "May 14, 2025", status: "present", notes: "" },
        { date: "May 13, 2025", status: "present", notes: "" },
        { date: "May 12, 2025", status: "present", notes: "" },
        { date: "May 9, 2025", status: "present", notes: "" },
        { date: "May 8, 2025", status: "present", notes: "" },
        { date: "May 7, 2025", status: "late", notes: "Arrived 15 minutes late" }
      ]
    },
    michael: {
      present: 75,
      absent: 5,
      late: 7,
      excused: 2,
      total: 89,
      records: [
        { date: "May 20, 2025", status: "present", notes: "" },
        { date: "May 19, 2025", status: "absent", notes: "Sick - no note" },
        { date: "May 16, 2025", status: "late", notes: "Arrived 5 minutes late" },
        { date: "May 15, 2025", status: "present", notes: "" },
        { date: "May 14, 2025", status: "present", notes: "" },
        { date: "May 13, 2025", status: "present", notes: "" },
        { date: "May 12, 2025", status: "late", notes: "Arrived 20 minutes late" },
        { date: "May 9, 2025", status: "absent", notes: "No reason provided" },
        { date: "May 8, 2025", status: "absent", notes: "No reason provided" },
        { date: "May 7, 2025", status: "present", notes: "" }
      ]
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-500">Present</Badge>;
      case "absent":
        return <Badge className="bg-red-500">Absent</Badge>;
      case "late":
        return <Badge className="bg-amber-500">Late</Badge>;
      case "excused":
        return <Badge className="bg-blue-500">Excused</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
          <CardDescription>
            Track your children's attendance records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="emma">
            <TabsList className="mb-4">
              <TabsTrigger value="emma">Emma Johnson</TabsTrigger>
              <TabsTrigger value="michael">Michael Johnson</TabsTrigger>
            </TabsList>
            
            <TabsContent value="emma">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Present Days</p>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {attendanceData.emma.present}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Absent Days</p>
                      <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                        {attendanceData.emma.absent}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Late Arrivals</p>
                      <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                        {attendanceData.emma.late}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Attendance Rate</p>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {Math.round((attendanceData.emma.present / attendanceData.emma.total) * 100)}%
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Attendance Records</CardTitle>
                  <CardDescription>Last 10 school days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendanceData.emma.records.map((record, index) => (
                          <TableRow key={index}>
                            <TableCell>{record.date}</TableCell>
                            <TableCell>{getStatusBadge(record.status)}</TableCell>
                            <TableCell>{record.notes || "-"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Attendance Summary</CardTitle>
                  <CardDescription>Overall attendance statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Present Rate</span>
                        <span className="text-sm">{Math.round((attendanceData.emma.present / attendanceData.emma.total) * 100)}%</span>
                      </div>
                      <Progress value={(attendanceData.emma.present / attendanceData.emma.total) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Absent Rate</span>
                        <span className="text-sm">{Math.round((attendanceData.emma.absent / attendanceData.emma.total) * 100)}%</span>
                      </div>
                      <Progress value={(attendanceData.emma.absent / attendanceData.emma.total) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Late Rate</span>
                        <span className="text-sm">{Math.round((attendanceData.emma.late / attendanceData.emma.total) * 100)}%</span>
                      </div>
                      <Progress value={(attendanceData.emma.late / attendanceData.emma.total) * 100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-amber-500 pl-4 py-2">
                      <h4 className="font-medium flex items-center">
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                        Tardiness Alert
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Emma has been late 2 times this month. Please ensure she arrives at school on time.
                      </p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 py-2">
                      <h4 className="font-medium flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Perfect Week Attendance
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Emma had perfect attendance last week. Great job!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="michael">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Present Days</p>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {attendanceData.michael.present}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Absent Days</p>
                      <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                        {attendanceData.michael.absent}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Late Arrivals</p>
                      <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                        {attendanceData.michael.late}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Attendance Rate</p>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {Math.round((attendanceData.michael.present / attendanceData.michael.total) * 100)}%
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Attendance Records</CardTitle>
                  <CardDescription>Last 10 school days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendanceData.michael.records.map((record, index) => (
                          <TableRow key={index}>
                            <TableCell>{record.date}</TableCell>
                            <TableCell>{getStatusBadge(record.status)}</TableCell>
                            <TableCell>{record.notes || "-"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Attendance Summary</CardTitle>
                  <CardDescription>Overall attendance statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Present Rate</span>
                        <span className="text-sm">{Math.round((attendanceData.michael.present / attendanceData.michael.total) * 100)}%</span>
                      </div>
                      <Progress value={(attendanceData.michael.present / attendanceData.michael.total) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Absent Rate</span>
                        <span className="text-sm">{Math.round((attendanceData.michael.absent / attendanceData.michael.total) * 100)}%</span>
                      </div>
                      <Progress value={(attendanceData.michael.absent / attendanceData.michael.total) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Late Rate</span>
                        <span className="text-sm">{Math.round((attendanceData.michael.late / attendanceData.michael.total) * 100)}%</span>
                      </div>
                      <Progress value={(attendanceData.michael.late / attendanceData.michael.total) * 100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-red-500 pl-4 py-2">
                      <h4 className="font-medium flex items-center">
                        <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                        Absence Concern
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Michael has been absent 3 times this month. Please contact the school office to discuss this matter.
                      </p>
                    </div>
                    <div className="border-l-4 border-amber-500 pl-4 py-2">
                      <h4 className="font-medium flex items-center">
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                        Tardiness Alert
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Michael has been late 2 times this month. Please ensure he arrives at school on time.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>School Calendar</CardTitle>
          <CardDescription>Important dates to remember</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h4 className="font-medium flex items-center">
              <Calendar className="h-4 w-4 text-blue-500 mr-2" />
              Upcoming School Closure
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              The school will be closed on June 5, 2025 for Teacher Professional Development Day.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}