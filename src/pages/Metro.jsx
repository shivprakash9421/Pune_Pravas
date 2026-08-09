import React from 'react';
import { TrainFront, ArrowRightLeft, MapPin, Search, AlertCircle } from 'lucide-react';

export default function Metro() {
  const lines = [
    { name: 'Purple Line', route: 'PCMC Bhavan ↔ Swargate', status: 'Normal Service', color: 'bg-purple-500' },
    { name: 'Aqua Line', route: 'Vanaz ↔ Ramwadi', status: 'Normal Service', color: 'bg-teal-500' },
    { name: 'Line 3', route: 'Hinjewadi ↔ Civil Court', status: 'Under Construction', color: 'bg-slate-300' },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Pune Metro</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">Book QR tickets and check live train frequencies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Card */}
        <div className="lg:col-span-2 bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] border border-[var(--color-border)] p-6">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
            <TrainFront size={20} className="text-[var(--color-primary)]" /> Book Metro Ticket
          </h2>
          
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Departing From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={20} />
                <input type="text" placeholder="Select Station..." className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-md)] focus:bg-white focus:border-[var(--color-primary)] transition-all outline-none" />
              </div>
            </div>

            <div className="flex justify-center -my-2 relative z-10">
              <button className="p-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full hover:bg-[var(--color-bg-subtle)] transition-colors shadow-sm">
                <ArrowRightLeft size={16} className="text-[var(--color-text-secondary)] rotate-90" />
              </button>
            </div>

            <div className="relative">
              <label className="block text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Going To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" size={20} />
                <input type="text" placeholder="Select Station..." className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-md)] focus:bg-white focus:border-[var(--color-primary)] transition-all outline-none" />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[var(--color-border)] mt-6">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)]">Total Fare</p>
                <p className="text-2xl font-bold text-[var(--color-text-primary)]">₹0</p>
              </div>
              <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-8 py-3 rounded-[var(--radius-md)] font-medium transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50">
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>

        {/* Network Status */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Network Status</h2>
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] overflow-hidden">
            {lines.map((line, idx) => (
              <div key={idx} className="p-4 border-b border-[var(--color-border)] last:border-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${line.color}`}></div>
                  <h3 className="font-bold text-[var(--color-text-primary)]">{line.name}</h3>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-2 pl-6">{line.route}</p>
                <div className="pl-6">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${line.status === 'Normal Service' ? 'bg-green-50 text-[var(--color-success)]' : 'bg-slate-100 text-slate-500'}`}>
                    {line.status === 'Normal Service' ? <TrainFront size={12}/> : <AlertCircle size={12}/>}
                    {line.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}