import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children, onLogout }) {
  const [user, setUser] = useState({
    name: 'Shivprakash',
    email: 'shiv@coep.ac.in',
    tier: 'Pro',
  });
  const [unreadCount, setUnreadCount] = useState(3);

  const markAllRead = () => setUnreadCount(0);

  return (
    <AppContext.Provider value={{ user, setUser, unreadCount, markAllRead, onLogout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}