import { useState } from "react";
import { School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserRole } from "@/App";
import { useToast } from "@/hooks/use-toast";

interface RegisterProps {
  onRegisterSuccess: (name: string, email: string, password: string, role: UserRole) => void;
  onLoginClick: () => void;
}

export default function Register({ onRegisterSuccess, onLoginClick }: RegisterProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("parent");
  const [department, setDepartment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !name || !password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (role === 'teacher' && !department) {
      toast({
        title: "Error",
        description: "Please enter your department",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await onRegisterSuccess(name, email, password, role);
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="flex-1 text-center md:text-left">
        <div className="flex justify-center md:justify-start mb-6">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
            <School className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-gray-900 dark:text-white">My Happy School</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          Where every child's smile brightens our day!
        </p>
        <div className="hidden md:block">
          <img 
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1622&q=80" 
            alt="Students in classroom" 
            className="rounded-lg shadow-lg max-w-md mx-auto md:mx-0"
          />
        </div>
      </div>
      <div className="flex-1">
        <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">Create Account</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">Join us to get started</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">Select Role</Label>
                <RadioGroup 
                  defaultValue="parent" 
                  className="grid grid-cols-3 gap-2"
                  onValueChange={(value) => setRole(value as UserRole)}
                >
                  <div className={`flex flex-col items-center justify-center border rounded-lg p-3 cursor-pointer ${role === 'parent' ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-600'}`}>
                    <RadioGroupItem value="parent" id="parent" className="sr-only" />
                    <Label htmlFor="parent" className="cursor-pointer font-medium text-gray-700 dark:text-gray-300">Parent</Label>
                  </div>
                  <div className={`flex flex-col items-center justify-center border rounded-lg p-3 cursor-pointer ${role === 'teacher' ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-600'}`}>
                    <RadioGroupItem value="teacher" id="teacher" className="sr-only" />
                    <Label htmlFor="teacher" className="cursor-pointer font-medium text-gray-700 dark:text-gray-300">Teacher</Label>
                  </div>
                  <div className={`flex flex-col items-center justify-center border rounded-lg p-3 cursor-pointer ${role === 'admin' ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-600'}`}>
                    <RadioGroupItem value="admin" id="admin" className="sr-only" />
                    <Label htmlFor="admin" className="cursor-pointer font-medium text-gray-700 dark:text-gray-300">Admin</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Full Name</Label>
                <div className="relative">
                  <Input 
                    id="name" 
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                <div className="relative">
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                </div>
              </div>
              {role === 'teacher' && (
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-gray-700 dark:text-gray-300">Department</Label>
                  <div className="relative">
                    <Input 
                      id="department" 
                      placeholder="Enter your department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                      className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                    </div>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">Confirm Password</Label>
                <div className="relative">
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
              <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
                Already have an account? <button type="button" onClick={onLoginClick} className="text-indigo-600 dark:text-indigo-400 hover:underline">Sign In</button>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}