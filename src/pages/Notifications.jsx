import React from 'react';
import { Bell, AlertCircle, Info, CheckCircle2 } from 'lucide-react';

export default function Notifications() {
  const notifications = [
    { id: 1, type: 'alert', title: 'Metro Aqua Line Delay', message: 'Trains are running 10 mins late due to technical issues at Nal Stop.', time: '10 mins ago', read: false },
    { id: 2, type: 'success', title: 'Ticket Purchased', message: 'Monthly PMPL pass successfully activated. Valid till Sept 12.', time: '2 hours ago', read: true },
    { id: 3, type: 'info', title: 'Wallet Low Balance', message: 'Your wallet balance is below ₹100. Top up to avoid trip interruptions.', time: '1 day ago', read: true },
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'alert': return <AlertCircle className="text-[var(--color-danger)]" size={20} />;
      case 'success': return <CheckCircle2 className="text-[var(--color-success)]" size={20} />;
      default: return <Info className="text-blue-500" size={20} />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Notifications</h1>
          <p className="text-[var(--color-text-secondary)] mt-1">Updates on your trips and network alerts.</p>
        </div>
        <button className="text-sm font-medium text-[var(--color-primary)] hover:underline">Mark all as read</button>
      </div>

      <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] border border-[var(--color-border)] overflow-hidden">
        {notifications.map((notif) => (
          <div key={notif.id} className={`p-5 flex gap-4 border-b border-[var(--color-border)] last:border-0 transition-colors ${notif.read ? 'bg-white' : 'bg-slate-50'}`}>
            <div className="shrink-0 mt-1">{getIcon(notif.type)}</div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className={`text-sm font-bold ${notif.read ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-primary)]'}`}>{notif.title}</h3>
                <span className="text-xs text-[var(--color-text-muted)] whitespace-nowrap ml-4">{notif.time}</span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{notif.message}</p>
            </div>
            {!notif.read && <div className="h-2 w-2 rounded-full bg-[var(--color-primary)] self-center shrink-0"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}