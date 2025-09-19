import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../config/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePicture?: {
    url: string;
    publicId?: string;
    uploadedAt?: string;
  };
  bodyMeasurements?: any;
  stylePreferences?: any;
  profileSettings?: any;
  createdAt: string;
  updatedAt: string;
}

interface UserContextType {
  user: User | null;
  updateUser: (updatedUser: Partial<User>) => void;
  refreshUser: () => Promise<void>;
  isLoading: boolean;
  isUpdating: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Load user from AsyncStorage on mount
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async () => {
    try {
      const userStr = await AsyncStorage.getItem('user');
      if (userStr) {
        const userData = JSON.parse(userStr);
        setUser(userData);
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (updatedUser: Partial<User>) => {
    setUser(prevUser => {
      if (!prevUser) return prevUser;
      const newUser = { ...prevUser, ...updatedUser };
      
      // Update AsyncStorage
      AsyncStorage.setItem('user', JSON.stringify(newUser)).catch(error => {
        console.error('Error updating user in storage:', error);
      });
      
      return newUser;
    });
  };

  const refreshUser = async () => {
    if (!user?._id) return;
    
    setIsUpdating(true);
    try {
      const response = await fetch(API_ENDPOINTS.getProfile(user.email));
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          const updatedUser = {
            ...user,
            ...data.user,
            _id: user._id // Preserve the ID
          };
          setUser(updatedUser);
          await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const value: UserContextType = {
    user,
    updateUser,
    refreshUser,
    isLoading,
    isUpdating,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export { UserProvider };
