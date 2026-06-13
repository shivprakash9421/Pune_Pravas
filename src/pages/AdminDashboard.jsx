import React, { useState } from 'react';

const METRICS = [
  { label: 'Total Rides Today', value: '18,420', change: '+12%', color: '#00f5ff' },
  { label: 'Active Vehicles', value: '847', change: '+3%', color: '#00ff88' },
  { label: 'Revenue Today', value: '₹4.2L', change: '+8%', color: '#ffb700' },
  { label: 'User Complaints', value: '14', change: '-22%', color: '#ff3366' },
  { label: 'System Uptime', value: '99.8%', change: 'Stable', color: '#8b5cf6' },
  { label: 'Avg Wait Time', value: '6.2 min', change: '-5%', color: '#00f5ff' },
];

const FLEET = [
  { id: 'Metro', count: 24, active: 22, maintenance: 2, color: '#8b5cf6' },
  { id: 'PMPL Bus', count: 185, active: 142, maintenance: 20, color: '#00ff88' },
  { id: 'Cabs', count: 312, active: 89, maintenance: 15, color: '#00f5ff' },
];

const RECENT_ALERTS = [
  { type: 'critical', msg: 'Metro Line 1 signal fault at Swargate', time: '5 min ago' },
  { type: 'warning', msg: 'Bus PMT-1042 exceeded speed limit on NH-48', time: '12 min ago' },
  { type: 'info', msg: 'New driver onboarded: Amit Patil (Cab)', time: '34 min ago' },
  { type: 'success', msg: 'Server backup completed successfully', time: '1 hr ago' },
];

const BAR_DATA = [65, 80, 72, 90, 85, 70, 88, 95, 78, 82, 91, 87];
const LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('today');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Admin Header */}
      <div style={{
        padding: '18px 24px', borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(90deg, rgba(255,51,102,0.1), rgba(139,92,246,0.08))',
        border: '1px solid rgba(255,51,102,0.3)',
        display: 'flex', alignItems: 'center', gap: '12px',
      }}>
        <span style={{ fontSize: '20px' }}>🛡️</span>
        <div>
          <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '13px', color: '#ff3366', fontWeight: '700', letterSpacing: '0.1em' }}>ADMIN CONTROL CENTER</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Pune Smart Mobility Network · Super Admin</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          {['today','week','month'].map(r => (
            <button key={r} onClick={() => setTimeRange(r)} style={{
              padding: '7px 16px', borderRadius: 'var(--radius-md)', border: 'none',
              background: timeRange === r ? 'rgba(255,51,102,0.2)' : 'transparent',
              color: timeRange === r ? '#ff3366' : 'var(--text-secondary)',
              fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px', cursor: 'pointer',
              textTransform: 'capitalize',
            }}>{r}</button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '14px' }}>
        {METRICS.map(m => (
          <div key={m.label} className="glass-card" style={{ padding: '18px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', lineHeight: 1.3 }}>{m.label}</div>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '20px', fontWeight: '800', color: m.color, marginBottom: '4px' }}>{m.value}</div>
            <div style={{ fontSize: '12px', color: m.change.startsWith('+') || m.change === 'Stable' ? 'var(--neon-green)' : m.change.startsWith('-') && m.label.includes('Complaint') ? 'var(--neon-green)' : 'var(--neon-red)' }}>
              {m.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>

        {/* Bar Chart */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '24px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Monthly Ridership 2025</span>
            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '20px', color: 'var(--neon-cyan)', fontWeight: '800' }}>1.8L</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '140px' }}>
            {BAR_DATA.map((val, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{
                  width: '100%', height: `${val}%`,
                  background: i === 10 ? 'linear-gradient(0deg, var(--neon-cyan), var(--neon-blue))' : 'rgba(0,245,255,0.3)',
                  borderRadius: '4px 4px 0 0',
                  border: i === 10 ? '1px solid var(--neon-cyan)' : '1px solid rgba(0,245,255,0.2)',
                  transition: 'all 0.3s',
                  boxShadow: i === 10 ? '0 0 12px rgba(0,245,255,0.4)' : 'none',
                }} />
                <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{LABELS[i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Fleet Status */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>Fleet Status</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {FLEET.map(f => (
              <div key={f.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{f.id}</span>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: f.color }}>{f.active}/{f.count} active</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${(f.active / f.count) * 100}%`,
                    background: `linear-gradient(90deg, ${f.color}, ${f.color}99)`,
                    borderRadius: '4px',
                  }} />
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '3px' }}>🔧 {f.maintenance} in maintenance</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

        {/* Alerts */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            System Alerts
            <span className="badge badge-red">4 Active</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {RECENT_ALERTS.map((a, i) => {
              const colors = { critical: '#ff3366', warning: '#ffb700', info: '#00f5ff', success: '#00ff88' };
              const icons = { critical: '🔴', warning: '🟡', info: '🔵', success: '🟢' };
              return (
                <div key={i} style={{
                  display: 'flex', gap: '12px', padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: `${colors[a.type]}08`,
                  border: `1px solid ${colors[a.type]}25`,
                }}>
                  <span style={{ fontSize: '14px' }}>{icons[a.type]}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{a.msg}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{a.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Quick Controls</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { label: 'Add Route', icon: '➕', color: '#00ff88' },
              { label: 'Manage Drivers', icon: '👤', color: '#00f5ff' },
              { label: 'Fare Config', icon: '₹', color: '#ffb700' },
              { label: 'Send Alert', icon: '📢', color: '#ff3366' },
              { label: 'View Reports', icon: '📊', color: '#8b5cf6' },
              { label: 'System Config', icon: '⚙️', color: '#00f5ff' },
            ].map(a => (
              <button key={a.label} style={{
                padding: '14px', borderRadius: 'var(--radius-md)',
                background: `${a.color}08`, border: `1px solid ${a.color}30`,
                color: a.color, cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = `${a.color}18`; e.currentTarget.style.borderColor = `${a.color}60`; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${a.color}08`; e.currentTarget.style.borderColor = `${a.color}30`; }}
              >
                <span>{a.icon}</span>{a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
