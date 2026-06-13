import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

import Home from '../pages/Home';
import AIChat from '../pages/AIChat';
import CabAuto from '../pages/CabAuto';
import Metro from '../pages/Metro';
import PMPL from '../pages/PMPL';
import RoutePlanner from '../pages/RoutePlanner';
import Tickets from '../pages/Tickets';
import Parking from '../pages/Parking';
import Wallet from '../pages/Wallet';
import Profile from '../pages/Profile';
import Notifications from '../pages/Notifications';
import AdminDashboard from '../pages/AdminDashboard';

export default function AppRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="/cab" element={<CabAuto />} />
        <Route path="/metro" element={<Metro />} />
        <Route path="/pmpl" element={<PMPL />} />
        <Route path="/route-planner" element={<RoutePlanner />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/parking" element={<Parking />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </MainLayout>
  );
}
