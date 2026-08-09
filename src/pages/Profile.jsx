import React from 'react';
import { User, Settings, Shield, LogOut, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Profile() {
  const { user } = useAppContext();

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Profile</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">Manage your personal information and preferences.</p>
      </div>

      {/* User Info Card */}
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-8 shadow-[var(--shadow-card)] border border-[var(--color-border)] flex items-center gap-6">
        <div className="h-20 w-20 rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)] flex items-center justify-center font-bold text-3xl shrink-0">
          {user?.displayName?.charAt(0) || 'U'}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">{user?.displayName || 'Pune Traveler'}</h2>
          <p className="text-[var(--color-text-secondary)]">{user?.email || 'traveler@punepravas.com'}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full uppercase tracking-wider">
            {user?.tier || 'Standard'} Member
          </span>
        </div>
      </div>

      {/* Settings Menu */}
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] border border-[var(--color-border)] overflow-hidden">
        <button className="w-full p-5 flex items-center justify-between border-b border-[var(--color-border)] hover:bg-[var(--color-bg-subtle)] transition-colors text-left">
          <div className="flex items-center gap-4">
            <div className="text-[var(--color-text-secondary)]"><User size={20} /></div>
            <div>
              <p className="font-semibold text-[var(--color-text-primary)] text-sm">Personal Details</p>
              <p className="text-xs text-[var(--color-text-muted)]">Update name, phone, and addresses</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-[var(--color-text-muted)]" />
        </button>

        <button className="w-full p-5 flex items-center justify-between border-b border-[var(--color-border)] hover:bg-[var(--color-bg-subtle)] transition-colors text-left">
          <div className="flex items-center gap-4">
            <div className="text-[var(--color-text-secondary)]"><Settings size={20} /></div>
            <div>
              <p className="font-semibold text-[var(--color-text-primary)] text-sm">Preferences</p>
              <p className="text-xs text-[var(--color-text-muted)]">Notifications and language settings</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-[var(--color-text-muted)]" />
        </button>

        <button className="w-full p-5 flex items-center justify-between hover:bg-[var(--color-bg-subtle)] transition-colors text-left">
          <div className="flex items-center gap-4">
            <div className="text-[var(--color-text-secondary)]"><Shield size={20} /></div>
            <div>
              <p className="font-semibold text-[var(--color-text-primary)] text-sm">Security</p>
              <p className="text-xs text-[var(--color-text-muted)]">Password and authentication methods</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-[var(--color-text-muted)]" />
        </button>
      </div>

      <button className="w-full p-4 rounded-[var(--radius-md)] border border-[var(--color-danger)] text-[var(--color-danger)] font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
        <LogOut size={18} /> Sign Out
      </button>
    </div>
  );
}