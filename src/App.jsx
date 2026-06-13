import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppRoutes from './routes/AppRoutes';
import AuthPage from './pages/AuthPage';
import './index.css';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('punepravas_auth') === 'true'
  );

  const handleLogin = () => {
    localStorage.setItem('punepravas_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('punepravas_auth');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <AppProvider onLogout={handleLogout}>
        {isAuthenticated ? (
          <AppRoutes />
        ) : (
          <AuthPage onLogin={handleLogin} />
        )}
      </AppProvider>
    </BrowserRouter>
  );
}