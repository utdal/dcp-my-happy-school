import { useState, useEffect } from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import AdminDashboard from '@/components/dashboard/admin-dashboard';
import TeacherDashboard from '@/components/dashboard/teacher-dashboard';
import ParentDashboard from '@/components/dashboard/parent-dashboard';
import Login from '@/components/auth/login';
import Register from '@/components/auth/register';
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from './contexts/AuthContext';

export type UserRole = 'admin' | 'teacher' | 'parent';

export interface User {
  name: string;
  email: string;
  role: UserRole;
}

function App() {
  const { user, login, logout, register: registerUser, isAuthenticated } = useAuth();
  const [authView, setAuthView] = useState<'login' | 'register'>('login');

  const handleLogin = async (email: string, password: string, role: UserRole = 'parent') => {
    try {
      await login({ email, password });
    } catch (error) {
      console.error('Login error:', error);
      // In a real app, you would show an error message to the user
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleRegister = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      await registerUser({ name, email, password, role });
    } catch (error) {
      console.error('Registration error:', error);
      // In a real app, you would show an error message to the user
    }
  };

  const switchToRegister = () => {
    setAuthView('register');
  };

  const switchToLogin = () => {
    setAuthView('login');
  };

  const renderDashboard = () => {
    if (!user) return null;

    switch (user.role) {
      case 'admin':
        return <AdminDashboard user={user} onLogout={handleLogout} />;
      case 'teacher':
        return <TeacherDashboard user={user} onLogout={handleLogout} />;
      case 'parent':
        return <ParentDashboard user={user} onLogout={handleLogout} />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="school-app-theme">
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
        {isAuthenticated ? (
          renderDashboard()
        ) : (
          <div className="container mx-auto px-4 py-8">
            <div className="absolute top-4 right-4">
              <ModeToggle />
            </div>
            {authView === 'login' ? (
              <Login onLogin={handleLogin} onRegisterClick={switchToRegister} />
            ) : (
              <Register onRegisterSuccess={handleRegister} onLoginClick={switchToLogin} />
            )}
          </div>
        )}
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;