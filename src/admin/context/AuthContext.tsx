import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, Permission, Role } from '../../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  hasPermission: (resource: Permission['resource'], action: Permission['actions'][number]) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  loading: true,
  hasPermission: () => false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

// Mock roles and their permissions
const roles: Record<string, Role> = {
  admin: {
    id: '1',
    name: 'admin',
    permissions: [
      {
        resource: 'events',
        actions: ['view', 'create', 'edit', 'delete'],
      },
      {
        resource: 'startups',
        actions: ['view', 'create', 'edit', 'delete'],
      },
      {
        resource: 'resources',
        actions: ['view', 'create', 'edit', 'delete'],
      },
      {
        resource: 'team',
        actions: ['view', 'create', 'edit', 'delete'],
      },
      {
        resource: 'partners',
        actions: ['view', 'create', 'edit', 'delete'],
      },
      {
        resource: 'pages',
        actions: ['view', 'create', 'edit', 'delete'],
      },
      {
        resource: 'settings',
        actions: ['view', 'create', 'edit', 'delete'],
      },
    ],
  },
  editor: {
    id: '2',
    name: 'editor',
    permissions: [
      {
        resource: 'events',
        actions: ['view', 'create', 'edit'],
      },
      {
        resource: 'startups',
        actions: ['view', 'create', 'edit'],
      },
      {
        resource: 'resources',
        actions: ['view', 'create', 'edit'],
      },
      {
        resource: 'team',
        actions: ['view'],
      },
      {
        resource: 'partners',
        actions: ['view', 'create', 'edit'],
      },
      {
        resource: 'pages',
        actions: ['view', 'create', 'edit'],
      },
      {
        resource: 'settings',
        actions: ['view'],
      },
    ],
  },
  viewer: {
    id: '3',
    name: 'viewer',
    permissions: [
      {
        resource: 'events',
        actions: ['view'],
      },
      {
        resource: 'startups',
        actions: ['view'],
      },
      {
        resource: 'resources',
        actions: ['view'],
      },
      {
        resource: 'team',
        actions: ['view'],
      },
      {
        resource: 'partners',
        actions: ['view'],
      },
      {
        resource: 'pages',
        actions: ['view'],
      },
      {
        resource: 'settings',
        actions: ['view'],
      },
    ],
  },
};

// Mock users for demonstration
const mockUsers = [
  {
    id: '1',
    email: 'admin@whartonaistudio.org',
    password: 'admin123',
    name: 'Admin User',
    role: roles.admin,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'editor@whartonaistudio.org',
    password: 'editor123',
    name: 'Editor User',
    role: roles.editor,
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'viewer@whartonaistudio.org',
    password: 'viewer123',
    name: 'Viewer User',
    role: roles.viewer,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('adminUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      const userWithTimestamp = {
        ...userWithoutPassword,
        lastLogin: new Date().toISOString(),
      };
      
      setUser(userWithTimestamp);
      localStorage.setItem('adminUser', JSON.stringify(userWithTimestamp));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
  };

  const hasPermission = (resource: Permission['resource'], action: Permission['actions'][number]): boolean => {
    if (!user) return false;

    const resourcePermission = user.role.permissions.find(p => p.resource === resource);
    return resourcePermission ? resourcePermission.actions.includes(action) : false;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      logout,
      loading,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};