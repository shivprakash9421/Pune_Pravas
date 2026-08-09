import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const AppContext = createContext(null);

export function AppProvider({ children, onLogout }) {
  const [user, setUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(3);

  const markAllRead = () => setUnreadCount(0);

  useEffect(() => onAuthStateChanged(auth, (currentUser) => {
    if (!currentUser) return setUser(null);
    setUser({ name: currentUser.displayName || currentUser.email?.split('@')[0] || 'Member', email: currentUser.email, tier: 'Free', balance: 0 });
  }), []);

  return (
    <AppContext.Provider value={{ user, setUser, unreadCount, markAllRead, onLogout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
