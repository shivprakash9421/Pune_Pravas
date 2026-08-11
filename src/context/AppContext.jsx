import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // 'admin' | 'user' | null
  const [unreadCount, setUnreadCount] = useState(2);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const tokenResult = await currentUser.getIdTokenResult();
          
          // STRICT ADMIN CHECK: Instantly grants admin to your specific email
          const isOwner = currentUser.email === 'shivprakash0244@gmail.com';
          const hasAdminToken = tokenResult.claims.admin === true || tokenResult.claims.role === 'admin';

          setRole(isOwner || hasAdminToken ? 'admin' : 'user');
        } catch (err) {
          console.error("Error fetching token:", err);
          // Fallback just in case the token fetch fails
          setRole(currentUser.email === 'shivprakash0244@gmail.com' ? 'admin' : 'user');
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user, setUser, role, isAdmin: role === 'admin',
    unreadCount, setUnreadCount, loading,
  };

  return (
    <AppContext.Provider value={value}>
      {!loading && children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};