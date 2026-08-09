import React from 'react';
import { Users, Activity, IndianRupee, Key } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '12,450', icon: Users, trend: '+12%' },
    { label: 'Active Trips Today', value: '3,842', icon: Activity, trend: '+5%' },
    { label: 'Daily Revenue', value: '₹4.2L', icon: IndianRupee, trend: '+8%' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">System Admin</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">Overview of MobilityOS usage and API keys.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-[var(--color-bg-subtle)] rounded-lg text-[var(--color-text-secondary)]">
                <stat.icon size={20} />
              </div>
              <span className="text-xs font-bold text-[var(--color-success)] bg-green-50 px-2 py-1 rounded-full">{stat.trend}</span>
            </div>
            <p className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-bold text-[var(--color-text-primary)] mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* API Keys Table Placeholder */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] overflow-hidden">
        <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
          <h3 className="font-bold text-[var(--color-text-primary)] text-lg flex items-center gap-2">
            <Key size={20} /> API Keys Management
          </h3>
          <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-colors">
            Generate Key
          </button>
        </div>
        <div className="p-6 text-center text-[var(--color-text-secondary)]">
          <p className="text-sm">API Key management table will render here connected to backend.</p>
        </div>
      </div>
    </div>
  );
}