import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import AppRoutes from './routes/AppRoutes';
import AuthPage from './pages/AuthPage';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

function AppShell() {
  const { user } = useAppContext();
  return user ? <AppRoutes /> : <AuthPage />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppProvider>
          <AppShell />
        </AppProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
