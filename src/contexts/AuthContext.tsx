import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock User Interface
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking auth state
    const timer = setTimeout(() => {
      const storedUser = localStorage.getItem('socialpulse_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const signup = async (email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      uid: 'mock-uid-' + Date.now(),
      email,
      displayName: email.split('@')[0],
      photoURL: null
    };
    
    setUser(newUser);
    localStorage.setItem('socialpulse_user', JSON.stringify(newUser));
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simple mock validation (accept any email/password for now)
    const mockUser: User = {
      uid: 'mock-uid-12345',
      email,
      displayName: email.split('@')[0],
      photoURL: null
    };

    setUser(mockUser);
    localStorage.setItem('socialpulse_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    localStorage.removeItem('socialpulse_user');
    setLoading(false);
  };

  if (loading) {
     return (
       <div className="flex items-center justify-center min-h-screen bg-background">
         <div className="animate-pulse flex flex-col items-center gap-4">
           <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
             <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
           </div>
           <p className="text-muted-foreground font-medium">Loading SocialPulse...</p>
         </div>
       </div>
     );
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
