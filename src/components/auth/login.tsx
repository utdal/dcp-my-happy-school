import { useState } from "react";
import { School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@/App";
import { useToast } from "@/hooks/use-toast";

interface LoginProps {
  onLogin: (email: string, password: string, role: UserRole) => void;
  onRegisterClick: () => void;
}

export default function Login({ onLogin, onRegisterClick }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("parent");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await onLogin(email, password, role);
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
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
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Welcome Back!</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">Sign in to continue your journey</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-700 dark:text-gray-300">I am a</Label>
                <Select 
                  value={role} 
                  onValueChange={(value) => setRole(value as UserRole)}
                >
                  <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
  )
}