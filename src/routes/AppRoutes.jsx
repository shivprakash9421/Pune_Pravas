import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

import Home from '../pages/Home';
import AuthPage from '../pages/AuthPage';
import AdminDashboard from '../pages/AdminDashboard';
import RoutePlanner from '../pages/RoutePlanner';
import Metro from '../pages/Metro';
import PMPL from '../pages/PMPL';
import Local from '../pages/Local';
import CabAuto from '../pages/CabAuto';
import Tickets from '../pages/Tickets';
import Parking from '../pages/Parking';
import Wallet from '../pages/Wallet';
import AIChat from '../pages/AIChat';
import Profile from '../pages/Profile';
import Notifications from '../pages/Notifications';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />

      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

        <Route path="/route-planner" element={<RoutePlanner />} />
        <Route path="/metro" element={<Metro />} />
        <Route path="/pmpl" element={<PMPL />} />
        <Route path="/local-train" element={<Local />} />
        <Route path="/cab-auto" element={<CabAuto />} />

        <Route path="/tickets" element={<Tickets />} />
        <Route path="/parking" element={<Parking />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/ai-assistant" element={<AIChat />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />

        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}