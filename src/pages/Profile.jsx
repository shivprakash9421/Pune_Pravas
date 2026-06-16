import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const IconMetro = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="3" width="16" height="13" rx="2"/><path d="M8 16v3m8-3v3M4 9h16"/></svg>;
const IconLeaf = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 21c0-7 4-12 14-12-1 9-7 12-14 12z"/></svg>;
const IconSaver = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>;
const IconTrophy = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 01-10 0V4z"/><path d="M7 6H4a2 2 0 002 4M17 6h3a2 2 0 01-2 4"/></svg>;
const IconBus = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 16V6a2 2 0 012-2h12a2 2 0 012 2v10l-2 2H6l-2-2z"/><path d="M4 12h16M9 18v2m6-2v2"/></svg>;
const IconStar = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3.1 6.6 7.3.9-5.3 5 1.4 7.2L12 18.3 5.5 21.7l1.4-7.2-5.3-5 7.3-.9z"/></svg>;

const ACHIEVEMENTS = [
  { Icon: IconMetro, label: '50 Metro Rides', earned: true },
  { Icon: IconLeaf, label: '10kg CO2 Saved', earned: true },
  { Icon: IconSaver, label: 'Smart Saver', earned: true },
  { Icon: IconTrophy, label: 'Pro Member', earned: true },
  { Icon: IconBus, label: '100 Bus Rides', earned: false },
  { Icon: IconStar, label: 'Top Commuter', earned: false },
];

const PREFS_DEFAULT = [
  { key: 'push',    label: 'Push Notifications', desc: 'Real-time alerts for buses and metro', on: true  },
  { key: 'ai',      label: 'Smart Route AI',      desc: 'AI-powered route recommendations',     on: true  },
  { key: 'eco',     label: 'Eco Mode',             desc: 'Prefer low CO2 transport options',     on: false },
  { key: 'autopay', label: 'Auto-Pay Wallet',      desc: 'Deduct fares automatically',           on: true  },
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
    fontSize: '14px', color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis',
  };

  const labelStyle = {
    fontSize: '11px', color: 'var(--color-text-muted)', display: 'block',
    marginBottom: '6px', textTransform: 'uppercase',
    letterSpacing: '0.05em', fontWeight: '700',
  };

  return (
    <div className="two-col-layout">

      {/* Avatar card */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>
        <div className="section-card" style={{ textAlign: 'center' }}>
          <div style={{
            width: '76px', height: '76px', borderRadius: '50%', margin: '0 auto 16px',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-neon-purple))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', fontWeight: '800', color: '#000',
            border: '2px solid var(--color-border-default)',
          }}>
            {(user?.name || 'S')[0]}
          </div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user?.name || 'Shivprakash'}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '12px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user?.email || 'shiv@example.com'}
          </div>
          <span className="badge badge-cyan" style={{ fontSize: '12px', padding: '5px 14px' }}>
            {user?.tier || 'Pro'} Member
          </span>

          <div className="responsive-grid-2" style={{ marginTop: '20px' }}>
            {[['Total Trips','48'],['This Month','12'],['Saved','₹1,240'],['CO2 Saved','12 kg']].map(([lbl,val]) => (
              <div key={lbl} className="kv-box" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--color-primary)' }}>{val}</div>
                <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '2px' }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card">
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
            Achievements
          </div>
          <div className="responsive-grid-3" style={{ gap: '8px' }}>
            {ACHIEVEMENTS.map(a => (
              <div key={a.label} style={{
                padding: '14px 6px', textAlign: 'center', borderRadius: 'var(--radius-md)',
                background: a.earned ? 'rgba(34,193,195,0.06)' : 'rgba(0,0,0,0.2)',
                border: `1px solid ${a.earned ? 'rgba(34,193,195,0.2)' : 'var(--color-border-subtle)'}`,
                opacity: a.earned ? 1 : 0.4,
              }}>
                <div className="icon-circle" style={{ margin: '0 auto 6px', '--icon-color': a.earned ? 'var(--color-primary)' : 'var(--color-text-muted)' }}><a.Icon /></div>
                <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', lineHeight: 1.3 }}>{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>

        <div className="section-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text-primary)' }}>Personal Information</div>
            <button
              className={editing ? 'btn-primary' : 'btn-ghost'}
              style={{ fontSize: '13px', padding: '8px 18px' }}
              onClick={editing ? saveProfile : () => setEditing(true)}
            >
              {editing ? 'Save changes' : 'Edit profile'}
            </button>
          </div>
          <div className="responsive-grid-2">
            {[['Full Name','name'],['Email','email'],['Phone','phone'],['City','city']].map(([lbl,key]) => (
              <div key={key} style={{ minWidth: 0 }}>
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

        <div className="section-card">
          <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '18px' }}>Preferences</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {prefs.map(pref => (
              <div key={pref.key} className="list-row">
                <div className="list-row-main">
                  <div className="list-row-title">{pref.label}</div>
                  <div className="list-row-sub">{pref.desc}</div>
                </div>
                <div
                  className={`toggle-switch ${pref.on ? 'on' : 'off'}`}
                  onClick={() => togglePref(pref.key)}
                >
                  <div className="toggle-knob" style={{ left: pref.on ? '23px' : '3px', background: pref.on ? '#000' : 'rgba(255,255,255,0.5)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card" style={{ border: '1px solid rgba(239,100,97,0.18)' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-danger)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Account
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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