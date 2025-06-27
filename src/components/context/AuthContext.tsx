import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: any) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const demoUsers: User[] = [
  {
    id: '1',
    role: 'donor',
    email: 'donor@demo.com',
    fullName: 'Badafee Semicolon',
    phone: '+1234567890',
    isVerified: true,
    rating: 4.8,
    createdAt: '2024-11-15',
    walletAddress: '0x1234...5678',
    referralCode: 'DONOR001'
  },
  {
    id: '2',
    role: 'individual',
    email: 'individual@demo.com',
    fullName: 'Afeez Flower',
    phone: '+1234567891',
    isVerified: true,
    createdAt: '2024-12-10',
    walletAddress: '0x5678...9012',
    referralCode: 'IND001',
    referredBy: 'ORG001',
    airdropBalance: 150
  },
  {
    id: '3',
    role: 'organization',
    email: 'org@demo.com',
    organizationName: 'Hope Medical Center',
    phone: '+1234567892',
    isVerified: true,
    createdAt: '2024-11-20',
    walletAddress: '0x9012...3456',
    referralCode: 'ORG001',
    airdropBalance: 500
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('hopechain_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundUser = demoUsers.find(u => u.email === email);
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      localStorage.setItem('hopechain_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hopechain_user');
  };

  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData,
      isVerified: false,
      createdAt: new Date().toISOString().split('T')[0],
      referralCode: `${userData.role.toUpperCase()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      airdropBalance: userData.role === 'organization' ? 100 : 0
    };

    setUser(newUser);
    localStorage.setItem('hopechain_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  return (
      <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};