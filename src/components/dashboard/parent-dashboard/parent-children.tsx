import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ParentChildren() {
  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>My Children</CardTitle>
          <CardDescription>
            Basic information about your children
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="emma">
            <TabsList className="mb-4">
              <TabsTrigger value="emma">Emma Johnson</TabsTrigger>
              <TabsTrigger value="michael">Michael Johnson</TabsTrigger>
            </TabsList>
            
            <TabsContent value="emma">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center">
                        <Avatar className="h-24 w-24 mb-4">
                          <AvatarFallback className="text-xl">EJ</AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-bold">Emma Johnson</h3>
                        <p className="text-muted-foreground">Grade 3</p>
                        <Badge className="mt-2 bg-green-500">Good Standing</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="md:w-2/3">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-muted-foreground">Student ID</h4>
                          <p>S12345</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-muted-foreground">Age</h4>
                          <p>8</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-muted-foreground">Class Teacher</h4>
                          <p>Ms. Wilson</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-muted-foreground">Attendance Rate</h4>
                          <p className="text-green-600 dark:text-green-400">97.5%</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-muted-foreground">Current GPA</h4>
                          <p>3.9</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-muted-foreground">Emergency Contact</h4>
                          <p>John & Mary Johnson</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="michael">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center">
                        <Avatar className="h-24 w-24 mb-4">
                          <AvatarFallback className="text-xl">MJ</AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-bold">Michael Johnson</h3>
                        <p className="text-muted-foreground">Grade 5</p>
                        <Badge className="mt-2 bg-amber-500">Needs Attention</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="md:w-2/3">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-muted-foreground">Student ID</h4>
                          <p>S12346</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-muted-foreground">Age</h4>
                          <p>10</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-muted-foreground">Class Teacher</h4>
                          <p>Mr. Davis</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-muted-foreground">Attendance Rate</h4>
                          <p className="text-amber-600 dark:text-amber-400">93.8%</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-muted-foreground">Current GPA</h4>
                          <p>3.1</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-muted-foreground">Emergency Contact</h4>
                          <p>John & Mary Johnson</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}