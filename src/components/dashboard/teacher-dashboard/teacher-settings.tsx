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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  Lock, 
  User, 
  Shield, 
  Save,
  BookOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TeacherSettings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@school.edu",
    phone: "(555) 123-4567",
    subject: "Mathematics",
    department: "Science & Mathematics"
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    assignmentSubmissions: true,
    parentMessages: true,
    schoolAnnouncements: true,
    classReminders: true
  });

  // Password settings
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Class settings
  const [classSettings, setClassSettings] = useState({
    allowStudentComments: true,
    showGradesToStudents: true,
    autoNotifyParentsOnLowGrades: true,
    autoNotifyParentsOnMissedAssignments: true
  });

  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle notification toggle changes
  const handleNotificationToggle = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle class settings toggle changes
  const handleClassSettingToggle = (setting) => {
    setClassSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Save profile changes
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully."
    });
  };

  // Save notification settings
  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved successfully."
    });
  };

  // Change password
  const handleChangePassword = () => {
    // Simple validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({
        title: "Missing information",
        description: "Please fill in all password fields.",
        variant: "destructive"
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation do not match.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Password changed",
      description: "Your password has been updated successfully."
    });

    // Reset password fields
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  // Save class settings
  const handleSaveClassSettings = () => {
    toast({
      title: "Class settings updated",
      description: "Your class preferences have been saved successfully."
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage your account settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="profile">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="password">
                <Lock className="h-4 w-4 mr-2" />
                Password
              </TabsTrigger>
              <TabsTrigger value="class">
                <BookOpen className="h-4 w-4 mr-2" />
                Class Settings
              </TabsTrigger>
            </TabsList>
            
            {/* Profile Settings */}
            <TabsContent value="profile">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">Change Photo</Button>
                  </div>
                  
                  <div className="md:w-2/3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name"
                          value={profileData.name}
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input 
                          id="subject" 
                          name="subject"
                          value={profileData.subject}
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input 
                          id="department" 
                          name="department"
                          value={profileData.department}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSaveProfile}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Notification Settings */}
            <TabsContent value="notifications">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Choose which notifications you want to receive by email
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailNotifications" className="font-normal">
                        Enable Email Notifications
                      </Label>
                      <Switch 
                        id="emailNotifications" 
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="assignmentSubmissions" className="font-normal">
                        Assignment Submissions
                      </Label>
                      <Switch 
                        id="assignmentSubmissions" 
                        checked={notificationSettings.assignmentSubmissions}
                        onCheckedChange={() => handleNotificationToggle('assignmentSubmissions')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="parentMessages" className="font-normal">
                        Parent Messages
                      </Label>
                      <Switch 
                        id="parentMessages" 
                        checked={notificationSettings.parentMessages}
                        onCheckedChange={() => handleNotificationToggle('parentMessages')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="schoolAnnouncements" className="font-normal">
                        School Announcements
                      </Label>
                      <Switch 
                        id="schoolAnnouncements" 
                        checked={notificationSettings.schoolAnnouncements}
                        onCheckedChange={() => handleNotificationToggle('schoolAnnouncements')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="classReminders" className="font-normal">
                        Class Reminders
                      </Label>
                      <Switch 
                        id="classReminders" 
                        checked={notificationSettings.classReminders}
                        onCheckedChange={() => handleNotificationToggle('classReminders')}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSaveNotifications}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Password Settings */}
            <TabsContent value="password">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleChangePassword}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Class Settings */}
            <TabsContent value="class">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Class Preferences</Label>
                      <p className="text-sm text-muted-foreground">
                        Control settings for all your classes
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="allowStudentComments" className="font-normal">
                        Allow student comments on assignments
                      </Label>
                      <Switch 
                        id="allowStudentComments" 
                        checked={classSettings.allowStudentComments}
                        onCheckedChange={() => handleClassSettingToggle('allowStudentComments')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showGradesToStudents" className="font-normal">
                        Show grades to students immediately
                      </Label>
                      <Switch 
                        id="showGradesToStudents" 
                        checked={classSettings.showGradesToStudents}
                        onCheckedChange={() => handleClassSettingToggle('showGradesToStudents')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="autoNotifyParentsOnLowGrades" className="font-normal">
                        Auto-notify parents on low grades
                      </Label>
                      <Switch 
                        id="autoNotifyParentsOnLowGrades" 
                        checked={classSettings.autoNotifyParentsOnLowGrades}
                        onCheckedChange={() => handleClassSettingToggle('autoNotifyParentsOnLowGrades')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="autoNotifyParentsOnMissedAssignments" className="font-normal">
                        Auto-notify parents on missed assignments
                      </Label>
                      <Switch 
                        id="autoNotifyParentsOnMissedAssignments" 
                        checked={classSettings.autoNotifyParentsOnMissedAssignments}
                        onCheckedChange={() => handleClassSettingToggle('autoNotifyParentsOnMissedAssignments')}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSaveClassSettings}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Class Settings
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}