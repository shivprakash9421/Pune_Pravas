import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Menu, X, Bell, User, Home, Map, Bus, Train, Ticket,
  Wallet, Car, ParkingCircle, MessageSquare, Shield
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, unreadCount, isAdmin } = useAppContext();
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/route-planner', label: 'Route Planner', icon: Map },
    { to: '/metro', label: 'Metro', icon: Train },
    { to: '/pmpl', label: 'PMPL Bus', icon: Bus },
    { to: '/local-train', label: 'Local Train', icon: Train },
    { to: '/cab-auto', label: 'Cab & Auto', icon: Car },
    { to: '/tickets', label: 'Tickets', icon: Ticket },
    { to: '/parking', label: 'Parking', icon: ParkingCircle },
    { to: '/wallet', label: 'Wallet', icon: Wallet },
    { to: '/ai-assistant', label: 'AI Assistant', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col md:flex-row">
      <header className="md:hidden flex items-center justify-between bg-[var(--color-surface)] px-4 py-3 shadow-[var(--shadow-card)] z-20 relative">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-[var(--color-text-secondary)]">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="font-bold text-lg text-[var(--color-navy)]">Pune Pravas</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative text-[var(--color-text-secondary)]" onClick={() => navigate('/notifications')}>
            <Bell size={24} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--color-danger)] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          <button onClick={() => navigate('/profile')} className="h-8 w-8 rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)] flex items-center justify-center font-bold">
            {user?.displayName?.charAt(0) || 'U'}
          </button>
        </div>
      </header>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-64 bg-[var(--color-navy)] text-white z-40
        transform transition-transform duration-200 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 hidden md:block">
          <span className="font-bold text-2xl tracking-tight text-white">Pune Pravas</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 md:py-0 px-3 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] transition-colors
                ${isActive
                  ? 'bg-[var(--color-primary-hover)] text-white font-medium'
                  : 'text-slate-300 hover:bg-[var(--color-navy-2)] hover:text-white'}
              `}
            >
              <link.icon size={20} />
              <span>{link.label}</span>
            </NavLink>
          ))}

          {isAdmin && (
            <>
              <div className="pt-6 pb-2 px-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Administration</span>
              </div>
              <NavLink
                to="/admin"
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] transition-colors
                  ${isActive ? 'bg-[var(--color-primary-hover)] text-white' : 'text-slate-300 hover:bg-[var(--color-navy-2)]'}
                `}
              >
                <Shield size={20} />
                <span>Dashboard</span>
              </NavLink>
            </>
          )}
        </nav>

        <div className="hidden md:flex p-4 border-t border-[var(--color-navy-2)] items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/profile')}>
            <div className="h-10 w-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold">
              {user?.displayName?.charAt(0) || 'U'}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.displayName || 'User'}</span>
              <span className="text-xs text-slate-400 capitalize">{isAdmin ? 'Admin' : 'Standard'} Tier</span>
            </div>
          </div>
          <button className="relative text-slate-300 hover:text-white" onClick={() => navigate('/notifications')}>
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--color-danger)] text-white text-[10px] rounded-full h-3 w-3 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}