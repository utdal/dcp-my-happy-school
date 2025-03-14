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
  School,
  Database
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    name: "David Brown",
    email: "david.b@example.com",
    phone: "(555) 123-4567",
    role: "Administrator",
    department: "School Administration"
  });

  // School settings
  const [schoolData, setSchoolData] = useState({
    name: "My Happy School",
    address: "123 Education Lane, Learning City, LC 12345",
    phone: "(555) 987-6543",
    email: "info@happyschool.edu",
    website: "www.happyschool.edu",
    principal: "Dr. Jane Smith"
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    userRegistrations: true,
    systemAlerts: true,
    enrollmentUpdates: true,
    staffMessages: true
  });

  // Password settings
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    sessionTimeout: "30"
  });

  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle school form changes
  const handleSchoolChange = (e) => {
    const { name, value } = e.target;
    setSchoolData(prev => ({
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

  // Handle security settings changes
  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle security toggle changes
  const handleSecurityToggle = (setting) => {
    setSecuritySettings(prev => ({
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

  // Save school settings
  const handleSaveSchool = () => {
    toast({
      title: "School information updated",
      description: "School information has been saved successfully."
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

  // Save security settings
  const handleSaveSecurity = () => {
    toast({
      title: "Security settings updated",
      description: "Your security settings have been saved successfully."
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
              <TabsTrigger value="school">
                <School className="h-4 w-4 mr-2" />
                School
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="password">
                <Lock className="h-4 w-4 mr-2" />
                Password
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>
            
            {/* Profile Settings */}
            <TabsContent value="profile">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>DB</AvatarFallback>
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
                        <Label htmlFor="role">Role</Label>
                        <Input 
                          id="role" 
                          name="role"
                          value={profileData.role}
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
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* School Settings */}
            <TabsContent value="school">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="schoolName">School Name</Label>
                    <Input 
                      id="schoolName" 
                      name="name"
                      value={schoolData.name}
                      onChange={handleSchoolChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="schoolAddress">Address</Label>
                    <Input 
                      id="schoolAddress" 
                      name="address"
                      value={schoolData.address}
                      onChange={handleSchoolChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="schoolPhone">Phone Number</Label>
                      <Input 
                        id="schoolPhone" 
                        name="phone"
                        value={schoolData.phone}
                        onChange={handleSchoolChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schoolEmail">Email</Label>
                      <Input 
                        id="schoolEmail" 
                        name="email"
                        type="email"
                        value={schoolData.email}
                        onChange={handleSchoolChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="schoolWebsite">Website</Label>
                      <Input 
                        id="schoolWebsite" 
                        name="website"
                        value={schoolData.website}
                        onChange={handleSchoolChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schoolPrincipal">Principal</Label>
                      <Input 
                        id="schoolPrincipal" 
                        name="principal"
                        value={schoolData.principal}
                        onChange={handleSchoolChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSaveSchool}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save School Information
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
                      <Label htmlFor="userRegistrations" className="font-normal">
                        User Registration Notifications
                      </Label>
                      <Switch 
                        id="userRegistrations" 
                        checked={notificationSettings.userRegistrations}
                        onCheckedChange={() => handleNotificationToggle('userRegistrations')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="systemAlerts" className="font-normal">
                        System Alerts
                      </Label>
                      <Switch 
                        id="systemAlerts" 
                        checked={notificationSettings.systemAlerts}
                        onCheckedChange={() => handleNotificationToggle('systemAlerts')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enrollmentUpdates" className="font-normal">
                        Enrollment Updates
                      </Label>
                      <Switch 
                        id="enrollmentUpdates" 
                        checked={notificationSettings.enrollmentUpdates}
                        onCheckedChange={() => handleNotificationToggle('enrollmentUpdates')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="staffMessages" className="font-normal">
                        Staff Messages
                      </Label>
                      <Switch 
                        id="staffMessages" 
                        checked={notificationSettings.staffMessages}
                        onCheckedChange={() => handleNotificationToggle('staffMessages')}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSaveNotifications}
                    className="bg-indigo-600 hover:bg-indigo-700"
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
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Security Settings */}
            <TabsContent value="security">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Security Settings</Label>
                      <p className="text-sm text-muted-foreground">
                        Manage your account security preferences
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="twoFactorAuth" className="font-normal">
                        Two-Factor Authentication
                      </Label>
                      <Switch 
                        id="twoFactorAuth" 
                        checked={securitySettings.twoFactorAuth}
                        onCheckedChange={() => handleSecurityToggle('twoFactorAuth')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="loginNotifications" className="font-normal">
                        Login Notifications
                      </Label>
                      <Switch 
                        id="loginNotifications" 
                        checked={securitySettings.loginNotifications}
                        onCheckedChange={() => handleSecurityToggle('loginNotifications')}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Input 
                        id="sessionTimeout" 
                        name="sessionTimeout"
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={handleSecurityChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSaveSecurity}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Security Settings
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