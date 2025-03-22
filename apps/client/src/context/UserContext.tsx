import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useApi } from './ApiContext';
import { User, UserContextType } from '../interface/UserInterface';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const apiService = useApi();

  const fetchUser = useCallback(async () => {
    try {
      const userData = await apiService.getUserData<User>();
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
    }
  }, [apiService]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const currentPath = window.location.pathname;
    const isShortUrl = /^\/[a-zA-Z0-9-_]+$/.test(currentPath);
    if (token && !isShortUrl && currentPath !== '/') {
      fetchUser();
    } else {
      setUser(null);
    }
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');

  return context;
};
