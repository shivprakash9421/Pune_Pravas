import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Map, Train, Bus, Car, ArrowRight, Clock, MapPin, Ticket } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAppContext();

  const quickActions = [
    { label: 'Plan Route', icon: Map, color: 'text-blue-600', bg: 'bg-blue-50', path: '/route-planner' },
    { label: 'Metro', icon: Train, color: 'text-purple-600', bg: 'bg-purple-50', path: '/metro' },
    { label: 'PMPL Bus', icon: Bus, color: 'text-green-600', bg: 'bg-green-50', path: '/pmpl' },
    { label: 'Cab & Auto', icon: Car, color: 'text-orange-600', bg: 'bg-orange-50', path: '/cab-auto' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Greeting & Wallet Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Good afternoon, {user?.displayName?.split(' ')[0] || 'Traveler'}
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-1">Where are we heading in Pune today?</p>
        </div>
        
        <div 
          onClick={() => navigate('/wallet')}
          className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-4 flex items-center gap-4 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all cursor-pointer"
        >
          <div className="h-12 w-12 rounded-full bg-[var(--color-primary-soft)] flex items-center justify-center text-[var(--color-primary)]">
            <Wallet size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Wallet Balance</p>
            <p className="text-2xl font-bold text-[var(--color-text-primary)] leading-none mt-1">₹450.00</p>
          </div>
          <ArrowRight size={20} className="text-[var(--color-text-muted)] ml-2" />
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => navigate(action.path)}
            className="bg-[var(--color-surface)] border border-[var(--color-border)] p-4 rounded-[var(--radius-lg)] flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--color-border-strong)] transition-all group"
          >
            <div className={`h-12 w-12 rounded-full ${action.bg} ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <action.icon size={24} />
            </div>
            <span className="font-semibold text-[var(--color-text-primary)]">{action.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Journey */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Active Journey</h2>
          </div>
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-card)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--color-success)]"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 text-[var(--color-success)] rounded-[var(--radius-sm)]">
                  <Train size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text-primary)]">Metro Aqua Line</h3>
                  <p className="text-sm font-medium text-[var(--color-success)] flex items-center gap-1">
                    <Clock size={14} /> On Time
                  </p>
                </div>
              </div>
              <span className="bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Live
              </span>
            </div>
            
            <div className="pl-4 border-l-2 border-dashed border-[var(--color-border-strong)] ml-4 space-y-6 relative mt-6">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-[var(--color-success)] ring-4 ring-white"></div>
                <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase">Origin</p>
                <p className="font-semibold text-[var(--color-text-primary)]">Vanaz Station</p>
                <p className="text-sm text-[var(--color-text-secondary)]">Boarded at 2:15 PM</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full border-2 border-[var(--color-primary)] bg-white ring-4 ring-white"></div>
                <p className="text-xs font-bold text-[var(--color-primary)] uppercase">Next Stop</p>
                <p className="font-semibold text-[var(--color-text-primary)]">Deccan Gymkhana</p>
                <p className="text-sm text-[var(--color-text-secondary)]">Arriving in 2 mins</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Recent Tickets</h2>
            <button onClick={() => navigate('/tickets')} className="text-sm font-medium text-[var(--color-primary)] hover:underline">View All</button>
          </div>
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] overflow-hidden">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="p-4 border-b border-[var(--color-border)] last:border-0 flex items-center justify-between hover:bg-[var(--color-bg-subtle)] transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-[var(--color-bg)] rounded-full flex items-center justify-center text-[var(--color-text-secondary)]">
                    <Ticket size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-text-primary)] text-sm">PMPL Daily Pass</p>
                    <p className="text-xs text-[var(--color-text-muted)]">Yesterday, 9:00 AM</p>
                  </div>
                </div>
                <span className="font-semibold text-[var(--color-text-primary)]">₹50</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}