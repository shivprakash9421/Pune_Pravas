import React, { useState } from 'react';

const TRANSACTIONS = [
  { id: 1, type: 'debit', desc: 'Metro Fare · Shivajinagar→Swargate', amount: 28, date: 'Today 08:45', icon: '🚇', color: '#8b5cf6' },
  { id: 2, type: 'credit', desc: 'Wallet Recharge · UPI', amount: 500, date: 'Today 07:30', icon: '💳', color: '#00ff88' },
  { id: 3, type: 'debit', desc: 'Cab Mini · FC Road→COEP', amount: 65, date: 'Yesterday', icon: '🚗', color: '#00f5ff' },
  { id: 4, type: 'debit', desc: 'Parking · Shivajinagar 2hr', amount: 40, date: 'Yesterday', icon: '🅿️', color: '#ffb700' },
  { id: 5, type: 'credit', desc: 'Refund · Cancelled Trip', amount: 120, date: '2 days ago', icon: '↩️', color: '#00ff88' },
  { id: 6, type: 'debit', desc: 'PMPL Bus Pass · Monthly', amount: 650, date: '3 days ago', icon: '🚌', color: '#ff3366' },
  { id: 7, type: 'debit', desc: 'Auto · Deccan→Karve Nagar', amount: 55, date: '4 days ago', icon: '🛺', color: '#ffb700' },
  { id: 8, type: 'credit', desc: 'Cashback · 5% on Metro', amount: 14, date: '5 days ago', icon: '🎁', color: '#00ff88' },
];

const QUICK_AMOUNTS = [100, 200, 500, 1000];

export default function Wallet() {
  const [balance] = useState(1240.50);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [payMethod, setPayMethod] = useState('upi');
  const [showRecharge, setShowRecharge] = useState(false);
  const [recharged, setRecharged] = useState(false);

  const totalSpent = TRANSACTIONS.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0);
  const totalAdded = TRANSACTIONS.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Balance Card */}
      <div style={{
        padding: '32px',
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(0,102,255,0.2) 0%, rgba(139,92,246,0.2) 50%, rgba(0,245,255,0.1) 100%)',
        border: '1px solid rgba(0,245,255,0.3)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(0,245,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'Orbitron, monospace', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Mobility Wallet
            </div>
            <div style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: '800',
              color: 'var(--neon-cyan)',
              textShadow: '0 0 30px rgba(0,245,255,0.4)',
              letterSpacing: '0.02em',
            }}>
              ₹{balance.toFixed(2)}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px' }}>
              Available Balance · Pro Member
            </div>

            <div style={{ display: 'flex', gap: '24px', marginTop: '20px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>This Month Spent</div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--neon-red)', fontFamily: 'Orbitron, monospace' }}>₹{totalSpent}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Added</div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--neon-green)', fontFamily: 'Orbitron, monospace' }}>₹{totalAdded}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              className="btn-primary"
              onClick={() => setShowRecharge(!showRecharge)}
              style={{ whiteSpace: 'nowrap' }}
            >
              + Add Money
            </button>
            <button className="btn-ghost" style={{ whiteSpace: 'nowrap' }}>
              Send Money
            </button>
          </div>
        </div>
      </div>

      {/* Recharge Panel */}
      {showRecharge && (
        <div className="glass-card" style={{ padding: '24px', animation: 'slide-up 0.3s ease' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>Add Money to Wallet</h3>

          {/* Quick amounts */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {QUICK_AMOUNTS.map(amt => (
              <button
                key={amt}
                onClick={() => setRechargeAmount(String(amt))}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${rechargeAmount === String(amt) ? 'var(--neon-cyan)' : 'var(--border-subtle)'}`,
                  background: rechargeAmount === String(amt) ? 'var(--neon-cyan-dim)' : 'rgba(0,0,0,0.2)',
                  color: rechargeAmount === String(amt) ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                }}
              >
                ₹{amt}
              </button>
            ))}
            <input
              className="input-field"
              style={{ width: '120px' }}
              placeholder="Custom ₹"
              value={rechargeAmount}
              onChange={e => setRechargeAmount(e.target.value)}
            />
          </div>

          {/* Payment method */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {[
              { id: 'upi', label: 'UPI', icon: '📱' },
              { id: 'card', label: 'Card', icon: '💳' },
              { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setPayMethod(m.id)}
                style={{
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${payMethod === m.id ? 'var(--neon-cyan)' : 'var(--border-subtle)'}`,
                  background: payMethod === m.id ? 'var(--neon-cyan-dim)' : 'rgba(0,0,0,0.2)',
                  color: payMethod === m.id ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontFamily: 'Space Grotesk, sans-serif',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  fontSize: '13px',
                  transition: 'all 0.2s',
                }}
              >
                {m.icon} {m.label}
              </button>
            ))}
          </div>

          {recharged ? (
            <div style={{
              padding: '16px', textAlign: 'center',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(0,255,136,0.08)',
              border: '1px solid rgba(0,255,136,0.3)',
              animation: 'slide-up 0.3s ease',
            }}>
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>✅</div>
              <div style={{ color: 'var(--neon-green)', fontWeight: '700' }}>₹{rechargeAmount} Added Successfully!</div>
            </div>
          ) : (
            <button
              className="btn-primary"
              style={{ padding: '13px 32px' }}
              onClick={() => { if (rechargeAmount) setRecharged(true); }}
              disabled={!rechargeAmount}
            >
              Pay ₹{rechargeAmount || '—'} via {payMethod.toUpperCase()}
            </button>
          )}
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
        {[
          { label: 'Total Trips', value: '48', icon: '🚌', color: '#00f5ff' },
          { label: 'Saved vs Cab', value: '₹1,240', icon: '💰', color: '#00ff88' },
          { label: 'Cashback Earned', value: '₹156', icon: '🎁', color: '#ffb700' },
          { label: 'CO₂ Saved', value: '12 kg', icon: '🌱', color: '#00ff88' },
        ].map(s => (
          <div key={s.label} className="glass-card" style={{ padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{s.icon}</div>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '18px', fontWeight: '700', color: s.color, marginBottom: '4px' }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Transactions */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600' }}>Transaction History</h3>
          <button className="btn-ghost" style={{ padding: '7px 16px', fontSize: '12px' }}>Download PDF</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {TRANSACTIONS.map((tx) => (
            <div key={tx.id} style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(0,0,0,0.15)',
              border: '1px solid var(--border-subtle)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,245,255,0.03)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.15)'}
            >
              <div style={{
                width: '42px', height: '42px', borderRadius: 'var(--radius-md)', flexShrink: 0,
                background: `${tx.color}15`, border: `1px solid ${tx.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px',
              }}>
                {tx.icon}
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.desc}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{tx.date}</div>
              </div>
              <div style={{
                fontFamily: 'Orbitron, monospace',
                fontSize: '15px',
                fontWeight: '700',
                color: tx.type === 'credit' ? 'var(--neon-green)' : 'var(--text-primary)',
                flexShrink: 0,
              }}>
                {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
