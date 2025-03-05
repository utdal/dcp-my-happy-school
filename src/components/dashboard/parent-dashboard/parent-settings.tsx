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
  Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ParentSettings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    name: "John Johnson",
    email: "john@example.com",
    phone: "(555) 123-4567",
    emergencyContact: "Mary Johnson - (555) 987-6543"
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    gradeUpdates: true,
    attendanceAlerts: true,
    homeworkReminders: true,
    schoolAnnouncements: true,
    teacherMessages: true
  });

  // Password settings
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    allowPhotosInSchoolMedia: true,
    receiveSchoolNewsletter: true
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

  // Handle privacy toggle changes
  const handlePrivacyToggle = (setting) => {
    setPrivacySettings(prev => ({
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

  // Save privacy settings
  const handleSavePrivacy = () => {
    toast({
      title: "Privacy settings updated",
      description: "Your privacy preferences have been saved successfully."
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
              <TabsTrigger value="privacy">
                <Shield className="h-4 w-4 mr-2" />
                Privacy
              </TabsTrigger>
            </TabsList>
            
            {/* Profile Settings */}
            <TabsContent value="profile">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>JJ</AvatarFallback>
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      <Input 
                        id="emergencyContact" 
                        name="emergencyContact"
                        value={profileData.emergencyContact}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSaveProfile}
                    className="bg-rose-600 hover:bg-rose-700"
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
                      <Label htmlFor="gradeUpdates" className="font-normal">
                        Grade Updates
                      </Label>
                      <Switch 
                        id="gradeUpdates" 
                        checked={notificationSettings.gradeUpdates}
                        onCheckedChange={() => handleNotificationToggle('gradeUpdates')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="attendanceAlerts" className="font-normal">
                        Attendance Alerts
                      </Label>
                      <Switch 
                        id="attendanceAlerts" 
                        checked={notificationSettings.attendanceAlerts}
                        onCheckedChange={() => handleNotificationToggle('attendanceAlerts')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="homeworkReminders" className="font-normal">
                        Homework Reminders
                      </Label>
                      <Switch 
                        id="homeworkReminders" 
                        checked={notificationSettings.homeworkReminders}
                        onCheckedChange={() => handleNotificationToggle('homeworkReminders')}
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
                      <Label htmlFor="teacherMessages" className="font-normal">
                        Teacher Messages
                      </Label>
                      <Switch 
                        id="teacherMessages" 
                        checked={notificationSettings.teacherMessages}
                        onCheckedChange={() => handleNotificationToggle('teacherMessages')}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSaveNotifications}
                    className="bg-rose-600 hover:bg-rose-700"
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
                    className="bg-rose-600 hover:bg-rose-700"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Privacy Settings */}
            <TabsContent value="privacy">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Privacy Preferences</Label>
                      <p className="text-sm text-muted-foreground">
                        Control your privacy settings
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="allowPhotosInSchoolMedia" className="font-normal">
                        Allow my child's photos in school media
                      </Label>
                      <Switch 
                        id="allowPhotosInSchoolMedia" 
                        checked={privacySettings.allowPhotosInSchoolMedia}
                        onCheckedChange={() => handlePrivacyToggle('allowPhotosInSchoolMedia')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="receiveSchoolNewsletter" className="font-normal">
                        Receive school newsletter
                      </Label>
                      <Switch 
                        id="receiveSchoolNewsletter" 
                        checked={privacySettings.receiveSchoolNewsletter}
                        onCheckedChange={() => handlePrivacyToggle('receiveSchoolNewsletter')}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSavePrivacy}
                    className="bg-rose-600 hover:bg-rose-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Privacy Settings
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