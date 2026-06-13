import React from 'react';
import { useApp } from '../context/AppContext';

const ALL_NOTIFICATIONS = [
  { id: 1, type: 'alert', icon: '🚇', title: 'Metro Line 1 Delay', message: 'Swargate station experiencing 8 min delay due to signal maintenance.', time: '2 min ago', read: false, color: '#ff3366' },
  { id: 2, type: 'success', icon: '💳', title: 'Wallet Recharged', message: '₹500 added to your MobilityOS wallet via UPI successfully.', time: '1 hr ago', read: false, color: '#00ff88' },
  { id: 3, type: 'info', icon: '🚌', title: 'Bus Route 50 Update', message: 'Route 50 now serving new stop at Hinjewadi Phase 3 from today.', time: '3 hr ago', read: false, color: '#00f5ff' },
  { id: 4, type: 'promo', icon: '🎁', title: '10% Cashback Offer', message: 'Use code METRO10 for 10% cashback on next 3 metro rides. Valid till Sunday.', time: 'Yesterday', read: true, color: '#ffb700' },
  { id: 5, type: 'success', icon: '✅', title: 'Parking Reserved', message: 'Slot B-14 at Shivajinagar Central reserved for 2 hrs. QR in Tickets.', time: 'Yesterday', read: true, color: '#00ff88' },
  { id: 6, type: 'info', icon: '🤖', title: 'AI Route Suggestion', message: 'Based on your routine, Metro + Bus saves ₹85 weekly vs daily cab bookings.', time: '2 days ago', read: true, color: '#8b5cf6' },
  { id: 7, type: 'alert', icon: '⛽', title: 'Cab Surge Pricing', message: 'High demand near FC Road and Shivajinagar. 1.4× surge active till 7 PM.', time: '2 days ago', read: true, color: '#ff3366' },
];

export default function Notifications() {
  const { markAllRead, unreadCount } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '700px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{unreadCount} unread</div>
        </div>
        <button className="btn-ghost" style={{ fontSize: '13px', padding: '8px 18px' }} onClick={markAllRead}>
          Mark all read
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {ALL_NOTIFICATIONS.map(n => (
          <div key={n.id} style={{
            display: 'flex', gap: '14px', padding: '18px 20px',
            borderRadius: 'var(--radius-lg)',
            background: n.read ? 'rgba(0,0,0,0.15)' : `${n.color}08`,
            border: `1px solid ${n.read ? 'var(--border-subtle)' : n.color + '33'}`,
            transition: 'all 0.2s',
            animation: 'slide-up 0.3s ease',
          }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: 'var(--radius-md)', flexShrink: 0,
              background: `${n.color}15`, border: `1px solid ${n.color}33`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
            }}>{n.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                <div style={{ fontSize: '14px', fontWeight: n.read ? '500' : '700', color: 'var(--text-primary)' }}>{n.title}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', marginLeft: '12px' }}>{n.time}</div>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{n.message}</div>
            </div>
            {!n.read && (
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: n.color, boxShadow: `0 0 8px ${n.color}`, flexShrink: 0, marginTop: '6px' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
