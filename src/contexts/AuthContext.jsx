import { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../services/api';

// Create auth context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          const { data } = await authAPI.getCurrentUser();
          setUser(data);
        }
      } catch (err) {
        console.error('Failed to load user:', err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Register user
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await authAPI.register(userData);
      setUser(data.user);
      return data.user;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await authAPI.login(credentials);
      setUser(data.user);
      return data.user;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    setLoading(true);
    
    try {
      await authAPI.logout();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update user in context
  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};