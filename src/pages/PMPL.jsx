import React from 'react';
import { Bus, Search, MapPin, Clock } from 'lucide-react';

export default function PMPL() {
  const popularBuses = [
    { num: '43', route: 'Katraj - Bhakti Shakti', frequency: '15 min' },
    { num: '115', route: 'Pune Station - Hinjewadi', frequency: '20 min' },
    { num: '155', route: 'Swargate - Pune Station', frequency: '10 min' },
    { num: '2A', route: 'Shivajinagar - Katraj', frequency: '12 min' },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">PMPL Bus Network</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">Live tracking, routes, and daily passes for city buses.</p>
      </div>

      <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={20} />
            <input 
              type="text" 
              placeholder="Search bus number or stop name..." 
              className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-md)] focus:bg-white focus:border-[var(--color-primary)] transition-all outline-none font-medium text-[var(--color-text-primary)]"
            />
          </div>
          <button className="bg-[var(--color-navy)] hover:bg-[var(--color-navy-2)] text-white px-8 py-3 rounded-[var(--radius-md)] font-medium transition-colors shadow-sm">
            Track Bus
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Popular Routes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {popularBuses.map((bus, idx) => (
              <div key={idx} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-4 hover:border-[var(--color-primary)] transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-bold px-3 py-1 rounded-[var(--radius-sm)]">
                    {bus.num}
                  </span>
                  <span className="text-xs font-medium text-[var(--color-text-secondary)] flex items-center gap-1">
                    <Clock size={12}/> {bus.frequency}
                  </span>
                </div>
                <p className="font-semibold text-[var(--color-text-primary)] text-sm group-hover:text-[var(--color-primary)] transition-colors">{bus.route}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Daily & Monthly Passes</h2>
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                <Bus size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[var(--color-text-primary)] text-lg">PMPL Digital Pass</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">Travel unlimited on any PMPL route for the duration of your pass.</p>
                
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 border border-[var(--color-border-strong)] hover:border-[var(--color-primary)] rounded-[var(--radius-md)] p-3 text-center transition-colors">
                    <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Daily Pass</p>
                    <p className="text-xl font-bold text-[var(--color-text-primary)]">₹50</p>
                  </button>
                  <button className="flex-1 border border-[var(--color-border-strong)] hover:border-[var(--color-primary)] rounded-[var(--radius-md)] p-3 text-center transition-colors">
                    <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Monthly Pass</p>
                    <p className="text-xl font-bold text-[var(--color-text-primary)]">₹1400</p>
                  </button>
                </div>
                <button className="w-full mt-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 rounded-[var(--radius-md)] font-medium transition-colors">
                  Purchase Pass
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}