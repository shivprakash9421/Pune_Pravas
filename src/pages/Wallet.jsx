import React, { useState } from 'react';

const TRANSACTIONS = [
  { id: 1, type: 'debit', desc: 'Metro Fare - Shivajinagar to Swargate', amount: 28, date: 'Today 08:45', color: '#8b5cf6' },
  { id: 2, type: 'credit', desc: 'Wallet Recharge - UPI', amount: 500, date: 'Today 07:30', color: '#00ff88' },
  { id: 3, type: 'debit', desc: 'Cab Mini - FC Road to COEP', amount: 65, date: 'Yesterday', color: '#00f5ff' },
  { id: 4, type: 'debit', desc: 'Parking - Shivajinagar 2hr', amount: 40, date: 'Yesterday', color: '#ffb700' },
  { id: 5, type: 'credit', desc: 'Refund - Cancelled Trip', amount: 120, date: '2 days ago', color: '#00ff88' },
  { id: 6, type: 'debit', desc: 'PMPL Bus Pass - Monthly', amount: 650, date: '3 days ago', color: '#ff3366' },
  { id: 7, type: 'debit', desc: 'Auto - Deccan to Karve Nagar', amount: 55, date: '4 days ago', color: '#ffb700' },
  { id: 8, type: 'credit', desc: 'Cashback - 5% on Metro', amount: 14, date: '5 days ago', color: '#00ff88' },
];

const QUICK_AMOUNTS = [100, 200, 500, 1000];

const IconWallet = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M16 12h3" /><path d="M3 9h18" /></svg>;
const IconSaved = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>;
const IconCashback = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8V3m-4 5l4-5 4 5"/></svg>;
const IconLeaf = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 21c0-7 4-12 14-12-1 9-7 12-14 12z"/></svg>;
const IconMetro = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="3" width="16" height="13" rx="2"/><path d="M8 16v3m8-3v3M4 9h16"/></svg>;
const IconCab = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 17H3v-5l2-5h14l2 5v5h-2M5 17a2 2 0 004 0M15 17a2 2 0 004 0"/></svg>;
const IconParking = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 010 6H9"/></svg>;
const IconBus = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 16V6a2 2 0 012-2h12a2 2 0 012 2v10l-2 2H6l-2-2z"/><path d="M4 12h16M9 18v2m6-2v2"/></svg>;
const IconRefund = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v6h6"/><path d="M3 13a9 9 0 1015-6.7L18 9"/></svg>;
const IconGift = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="8" width="18" height="13" rx="1"/><path d="M12 8v13M3 12h18M7.5 8a2.5 2.5 0 010-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 010 5"/></svg>;

const TX_ICON = { 'Metro': IconMetro, 'Wallet Recharge - UPI': IconWallet, 'Cab Mini': IconCab, 'Parking': IconParking, 'Refund': IconRefund, 'PMPL': IconBus, 'Auto': IconCab, 'Cashback': IconGift };

function getTxIcon(desc) {
  if (desc.includes('Metro')) return IconMetro;
  if (desc.includes('Recharge')) return IconWallet;
  if (desc.includes('Cab')) return IconCab;
  if (desc.includes('Parking')) return IconParking;
  if (desc.includes('Refund')) return IconRefund;
  if (desc.includes('PMPL')) return IconBus;
  if (desc.includes('Auto')) return IconCab;
  if (desc.includes('Cashback')) return IconGift;
  return IconWallet;
}

export default function Wallet() {
  const [balance] = useState(1240.50);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [payMethod, setPayMethod] = useState('upi');
  const [showRecharge, setShowRecharge] = useState(false);
  const [recharged, setRecharged] = useState(false);

  const totalSpent = TRANSACTIONS.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0);
  const totalAdded = TRANSACTIONS.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0);

  return (
    <div className="page-stack">

      {/* Balance Card */}
      <div className="section-card" style={{
        background: 'linear-gradient(135deg, rgba(0,102,255,0.18) 0%, rgba(139,92,246,0.18) 50%, rgba(0,245,255,0.08) 100%)',
        border: '1px solid rgba(0,245,255,0.3)',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ minWidth: 0, flex: '1 1 240px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Mobility Wallet
            </div>
            <div style={{ fontSize: 'clamp(28px, 6vw, 44px)', fontWeight: '800', color: 'var(--neon-cyan)', wordBreak: 'break-word' }}>
              ₹{balance.toFixed(2)}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px' }}>
              Available Balance - Pro Member
            </div>
            <div style={{ display: 'flex', gap: '24px', marginTop: '18px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>This Month Spent</div>
                <div style={{ fontSize: '17px', fontWeight: '700', color: 'var(--neon-red)' }}>₹{totalSpent}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Added</div>
                <div style={{ fontSize: '17px', fontWeight: '700', color: 'var(--neon-green)' }}>₹{totalAdded}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
            <button className="btn-primary" onClick={() => setShowRecharge(!showRecharge)}>
              Add Money
            </button>
            <button className="btn-ghost">Send Money</button>
          </div>
        </div>
      </div>

      {/* Recharge Panel */}
      {showRecharge && (
        <div className="section-card" style={{ animation: 'slide-up 0.3s ease' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '18px' }}>Add Money to Wallet</h3>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {QUICK_AMOUNTS.map(amt => (
              <button
                key={amt}
                onClick={() => setRechargeAmount(String(amt))}
                style={{
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${rechargeAmount === String(amt) ? 'var(--neon-cyan)' : 'var(--border-subtle)'}`,
                  background: rechargeAmount === String(amt) ? 'var(--neon-cyan-dim)' : 'rgba(0,0,0,0.2)',
                  color: rechargeAmount === String(amt) ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                  cursor: 'pointer', fontWeight: '600',
                }}
              >
                ₹{amt}
              </button>
            ))}
            <input
              className="input-field"
              style={{ width: '120px' }}
              placeholder="Custom"
              value={rechargeAmount}
              onChange={e => setRechargeAmount(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {[
              { id: 'upi', label: 'UPI' },
              { id: 'card', label: 'Card' },
              { id: 'netbanking', label: 'Net Banking' },
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
                  cursor: 'pointer', fontSize: '13px',
                }}
              >
                {m.label}
              </button>
            ))}
          </div>

          {recharged ? (
            <div style={{ padding: '16px', textAlign: 'center', borderRadius: 'var(--radius-md)', background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.3)' }}>
              <div style={{ color: 'var(--neon-green)', fontWeight: '700' }}>₹{rechargeAmount} Added Successfully</div>
            </div>
          ) : (
            <button className="btn-primary" style={{ padding: '13px 32px' }} onClick={() => { if (rechargeAmount) setRecharged(true); }} disabled={!rechargeAmount}>
              Pay ₹{rechargeAmount || '0'} via {payMethod.toUpperCase()}
            </button>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="responsive-grid-4">
        {[
          { label: 'Total Trips', value: '48', Icon: IconMetro, color: '#00f5ff' },
          { label: 'Saved vs Cab', value: '₹1,240', Icon: IconSaved, color: '#00ff88' },
          { label: 'Cashback Earned', value: '₹156', Icon: IconGift, color: '#ffb700' },
          { label: 'CO2 Saved', value: '12 kg', Icon: IconLeaf, color: '#00ff88' },
        ].map(s => (
          <div key={s.label} className="glass-card" style={{ padding: '18px', textAlign: 'center' }}>
            <div className="icon-circle" style={{ '--icon-color': s.color, margin: '0 auto 10px' }}><s.Icon /></div>
            <div style={{ fontSize: '17px', fontWeight: '700', color: s.color, marginBottom: '4px' }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Transactions */}
      <div className="section-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600' }}>Transaction History</h3>
          <button className="btn-ghost" style={{ padding: '8px 16px', fontSize: '12px' }}>Download PDF</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {TRANSACTIONS.map((tx) => {
            const Icon = getTxIcon(tx.desc);
            return (
              <div key={tx.id} className="list-row">
                <div className="icon-circle" style={{ '--icon-color': tx.color }}><Icon /></div>
                <div className="list-row-main">
                  <div className="list-row-title">{tx.desc}</div>
                  <div className="list-row-sub">{tx.date}</div>
                </div>
                <div className="list-row-value" style={{ color: tx.type === 'credit' ? 'var(--neon-green)' : 'var(--text-primary)' }}>
                  {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}