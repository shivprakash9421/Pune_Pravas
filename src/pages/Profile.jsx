import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const ACHIEVEMENTS = [
  { icon: '🚇', label: '50 Metro Rides', earned: true },
  { icon: '🌱', label: '10kg CO₂ Saved', earned: true },
  { icon: '💰', label: 'Smart Saver',    earned: true },
  { icon: '🏆', label: 'Pro Member',     earned: true },
  { icon: '🚌', label: '100 Bus Rides',  earned: false },
  { icon: '⭐', label: 'Top Commuter',   earned: false },
];

const PREFS_DEFAULT = [
  { key: 'push',    label: 'Push Notifications', desc: 'Real-time alerts for buses & metro', on: true  },
  { key: 'ai',      label: 'Smart Route AI',      desc: 'AI-powered route recommendations',  on: true  },
  { key: 'eco',     label: 'Eco Mode',             desc: 'Prefer low CO₂ transport options',  on: false },
  { key: 'autopay', label: 'Auto-Pay Wallet',      desc: 'Deduct fares automatically',        on: true  },
];

export default function Profile() {
  const { user, setUser, onLogout } = useApp();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name:  user?.name  || 'Shivprakash',
    email: user?.email || 'shiv@example.com',
    phone: '+91 98765 43210',
    city:  'Pune',
  });
  const [prefs, setPrefs] = useState(PREFS_DEFAULT);

  const togglePref = (key) =>
    setPrefs(p => p.map(x => x.key === key ? { ...x, on: !x.on } : x));

  const saveProfile = () => {
    if (setUser) setUser(u => ({ ...u, name: form.name, email: form.email }));
    setEditing(false);
  };

  const fieldStyle = {
    padding: '11px 14px', borderRadius: 'var(--radius-md)',
    background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-border-subtle)',
    fontSize: '14px', color: 'var(--color-text-primary)',
  };

  const labelStyle = {
    fontSize: '11px', color: 'var(--color-text-muted)', display: 'block',
    marginBottom: '6px', textTransform: 'uppercase',
    letterSpacing: '0.05em', fontWeight: '700',
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px', alignItems: 'start' }}>

      {/* Avatar card */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '28px', textAlign: 'center' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 16px',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-neon-purple))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '30px', fontWeight: '800', color: '#000',
            border: '2px solid var(--color-border-default)',
          }}>
            {(user?.name || 'S')[0]}
          </div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '4px' }}>
            {user?.name || 'Shivprakash'}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
            {user?.email || 'shiv@example.com'}
          </div>
          <span className="badge badge-cyan" style={{ fontSize: '12px', padding: '5px 14px' }}>
            {user?.tier || 'Pro'} Member
          </span>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
            {[['Total Trips','48'],['This Month','12'],['Saved','₹1,240'],['CO₂ Saved','12 kg']].map(([lbl,val]) => (
              <div key={lbl} style={{
                padding: '10px 8px', borderRadius: 'var(--radius-md)', textAlign: 'center',
                background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-border-subtle)',
              }}>
                <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--color-primary)' }}>{val}</div>
                <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '2px' }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
            Achievements
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
            {ACHIEVEMENTS.map(a => (
              <div key={a.label} style={{
                padding: '10px 6px', textAlign: 'center', borderRadius: 'var(--radius-md)',
                background: a.earned ? 'rgba(34,193,195,0.06)' : 'rgba(0,0,0,0.2)',
                border: `1px solid ${a.earned ? 'rgba(34,193,195,0.2)' : 'var(--color-border-subtle)'}`,
                opacity: a.earned ? 1 : 0.4,
              }}>
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>{a.icon}</div>
                <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', lineHeight: 1.3 }}>{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text-primary)' }}>Personal Information</div>
            <button
              className={editing ? 'btn-primary' : 'btn-ghost'}
              style={{ fontSize: '13px', padding: '8px 18px' }}
              onClick={editing ? saveProfile : () => setEditing(true)}
            >
              {editing ? 'Save changes' : 'Edit profile'}
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[['Full Name','name'],['Email','email'],['Phone','phone'],['City','city']].map(([lbl,key]) => (
              <div key={key}>
                <label style={labelStyle}>{lbl}</label>
                {editing
                  ? <input className="input-field" value={form[key]}
                      onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} />
                  : <div style={fieldStyle}>{form[key]}</div>
                }
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '18px' }}>Preferences</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {prefs.map(pref => (
              <div key={pref.key} style={{
                display: 'flex', alignItems: 'center', gap: '14px', padding: '14px',
                borderRadius: 'var(--radius-md)', background: 'rgba(0,0,0,0.15)',
                border: '1px solid var(--color-border-subtle)',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-primary)' }}>{pref.label}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>{pref.desc}</div>
                </div>
                <div onClick={() => togglePref(pref.key)} style={{
                  width: '44px', height: '24px', borderRadius: '12px',
                  background: pref.on ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
                  position: 'relative', cursor: 'pointer', transition: 'background 0.25s',
                  border: `1px solid ${pref.on ? 'var(--color-primary)' : 'var(--color-border-subtle)'}`,
                  flexShrink: 0,
                }}>
                  <div style={{
                    position: 'absolute', top: '3px',
                    left: pref.on ? '22px' : '3px',
                    width: '16px', height: '16px', borderRadius: '50%',
                    background: pref.on ? '#000' : 'rgba(255,255,255,0.5)',
                    transition: 'left 0.25s',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', border: '1px solid rgba(239,100,97,0.18)' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-danger)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Account
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-ghost" style={{ fontSize: '13px', padding: '9px 18px' }}>Change Password</button>
            <button onClick={onLogout} style={{
              padding: '9px 18px', borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(239,100,97,0.35)', background: 'rgba(239,100,97,0.08)',
              color: 'var(--color-danger)', fontSize: '13px', cursor: 'pointer',
              fontFamily: 'inherit', fontWeight: '600',
            }}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}