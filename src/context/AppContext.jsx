import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Context
const AppContext = createContext();

// Create the Provider Component
export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(2); // Example default notification count
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Wire this up to your actual Firebase auth listener
    // import { auth } from '../firebase/firebase';
    // import { onAuthStateChanged } from 'firebase/auth';
    
    // For now, setting a mock user so your beautiful new UI renders perfectly
    const mockUser = {
      uid: '123',
      displayName: 'Shivprakash Chavan',
      email: 'shivp@example.com',
      role: 'user',
      tier: 'Pro'
    };
    
    setUser(mockUser);
    setLoading(false);
  }, []);

  const value = {
    user,
    setUser,
    unreadCount,
    setUnreadCount,
    loading
  };

  return (
    <AppContext.Provider value={value}>
      {!loading && children}
    </AppContext.Provider>
  );
}

// THIS is the specific export the build was looking for
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};