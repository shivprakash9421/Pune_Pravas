import React, { useEffect, useState } from 'react';
import { Users, Activity, IndianRupee } from 'lucide-react';
import { fetchSecureData } from '../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSecureData('/admin/stats').then(setStats).catch(err => setError(err.message));
  }, []);

  const cards = stats ? [
    { label: 'Total Users', value: stats.totalUsers, icon: Users },
    { label: 'Tickets Sold', value: stats.totalTickets, icon: Activity },
    { label: 'Total Revenue', value: `₹${stats.totalRevenue}`, icon: IndianRupee },
  ] : [];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">System Admin</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">Overview of MobilityOS usage.</p>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats ? cards.map((stat, idx) => (
          <div key={idx} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 shadow-sm">
            <div className="p-2 bg-[var(--color-bg-subtle)] rounded-lg text-[var(--color-text-secondary)] w-fit mb-4">
              <stat.icon size={20} />
            </div>
            <p className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-bold text-[var(--color-text-primary)] mt-1">{stat.value}</p>
          </div>
        )) : <p className="text-[var(--color-text-secondary)] col-span-3">Loading stats…</p>}
      </div>
    </div>
  );
}