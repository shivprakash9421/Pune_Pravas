import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { AppProvider } from './context/AppContext';
import AppRoutes from './routes/AppRoutes';
import AuthPage from './pages/AuthPage';
import './index.css';

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  const handleLogout = () => signOut(auth);

  if (user === undefined) return null;

  return (
    <BrowserRouter>
      <AppProvider onLogout={handleLogout}>
        {user ? (
          <AppRoutes />
        ) : (
          
          <AuthPage />
        )}
      </AppProvider>
    </BrowserRouter>
  );
}
