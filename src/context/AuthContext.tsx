
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  balance: number;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Mock users for demo
  const mockUsers = [
    {
      id: '1',
      email: 'user@example.com',
      username: 'demo',
      password: 'password',
      balance: 1000,
      role: 'user'
    }
  ];

  useEffect(() => {
    // Check if user is already logged in via sessionStorage
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const foundUser = mockUsers.find(
        u => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }
      
      // Remove password before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Store user in session storage
      sessionStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would send registration data to an API
      // For now, just simulate success
      
      // Check if user already exists
      if (mockUsers.some(u => u.email === userData.email)) {
        throw new Error('User already exists');
      }
      
      console.log('User registered:', userData);
      
      // Auto login after registration
      const newUser = {
        id: String(mockUsers.length + 1),
        email: userData.email,
        username: userData.username,
        balance: 0,
        role: 'user'
      };
      
      sessionStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
