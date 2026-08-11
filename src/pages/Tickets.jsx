import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { subscribeToMyTickets, purchaseTicket, markTicketUsed } from '../services/tickets';

const IconMetro = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="3" width="16" height="13" rx="2"/><path d="M8 16v3m8-3v3M4 9h16"/></svg>;
const IconBus = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 16V6a2 2 0 012-2h12a2 2 0 012 2v10l-2 2H6l-2-2z"/><path d="M4 12h16M9 18v2m6-2v2"/></svg>;

const TYPE_META = {
  metro: { label: 'Metro', color: '#8b5cf6', Icon: IconMetro },
  bus: { label: 'Bus', color: '#00f5ff', Icon: IconBus },
  pass: { label: 'Bus Pass', color: '#ffb700', Icon: IconBus },
};

function fmtDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [buyOpen, setBuyOpen] = useState(null); // 'ticket' | 'pass' | null
  const [form, setForm] = useState({ mode: 'metro', from: '', to: '' });
  const [busy, setBusy] = useState(false);

  useEffect(() => subscribeToMyTickets(setTickets), []);

  const activeTickets = tickets.filter(t => t.status === 'valid' || t.status === 'active');
  const pastTickets = tickets.filter(t => t.status === 'used' || t.status === 'completed');

  const handleBuy = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (buyOpen === 'pass') {
        await purchaseTicket({ type: 'pass' });
      } else {
        await purchaseTicket({ type: form.mode, from: form.from, to: form.to });
      }
      setBuyOpen(null);
      setForm({ mode: 'metro', from: '', to: '' });
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  };

  const list = activeTab === 'active' ? activeTickets : pastTickets;

  return (
    <div className={selectedTicket ? 'two-col-layout' : ''}>
      <div className="page-stack">
        <div className="tab-row">
          {['active', 'past'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`tab-item ${activeTab === tab ? 'active' : ''}`}>
              {tab === 'active' ? `Active (${activeTickets.length})` : 'Past Trips'}
            </button>
          ))}
        </div>

        {activeTab === 'active' && (
          <div style={{
            padding: '18px 20px', borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(90deg, rgba(0,245,255,0.08), rgba(0,102,255,0.06))',
            border: '1px dashed rgba(0,245,255,0.3)', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px',
          }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '2px' }}>Need a ticket?</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Book Metro, Bus, or purchase a monthly pass</div>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button className="btn-primary" style={{ fontSize: '13px', padding: '10px 20px' }} onClick={() => setBuyOpen('ticket')}>Buy Ticket</button>
              <button className="btn-ghost" style={{ fontSize: '13px', padding: '10px 20px' }} onClick={() => setBuyOpen('pass')}>Buy Pass</button>
            </div>
          </div>
        )}

        {buyOpen && (
          <form onSubmit={handleBuy} className="section-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {buyOpen === 'ticket' ? (
              <>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" onClick={() => setForm(f => ({ ...f, mode: 'metro' }))} className={`tab-item ${form.mode === 'metro' ? 'active' : ''}`}>Metro</button>
                  <button type="button" onClick={() => setForm(f => ({ ...f, mode: 'bus' }))} className={`tab-item ${form.mode === 'bus' ? 'active' : ''}`}>Bus</button>
                </div>
                <input required placeholder="From station/stop" value={form.from}
                  onChange={e => setForm(f => ({ ...f, from: e.target.value }))}
                  style={{ padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'transparent', color: 'var(--text-primary)' }} />
                <input required placeholder="To station/stop" value={form.to}
                  onChange={e => setForm(f => ({ ...f, to: e.target.value }))}
                  style={{ padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'transparent', color: 'var(--text-primary)' }} />
              </>
            ) : (
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Monthly All-Routes bus pass — ₹650, valid 30 days.</p>
            )}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-primary" disabled={busy} type="submit">{busy ? 'Processing…' : 'Confirm & Pay'}</button>
              <button className="btn-ghost" type="button" onClick={() => setBuyOpen(null)}>Cancel</button>
            </div>
          </form>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {list.length === 0 && (
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', padding: '20px 0' }}>
              {activeTab === 'active' ? 'No active tickets. Buy one above.' : 'No past trips yet.'}
            </p>
          )}
          {list.map(ticket => {
            const meta = TYPE_META[ticket.type] || TYPE_META.metro;
            return (
              <div key={ticket.id} onClick={() => setSelectedTicket(selectedTicket?.id === ticket.id ? null : ticket)}
                style={{
                  borderRadius: 'var(--radius-lg)',
                  border: `1px solid ${selectedTicket?.id === ticket.id ? meta.color : 'var(--border-subtle)'}`,
                  background: selectedTicket?.id === ticket.id ? `${meta.color}08` : 'rgba(0,0,0,0.2)',
                  cursor: 'pointer', overflow: 'hidden',
                }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '6px', background: meta.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, padding: '16px 18px', minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                        <div className="icon-circle" style={{ '--icon-color': meta.color, width: '38px', height: '38px', flexShrink: 0 }}><meta.Icon /></div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: '11px', color: meta.color, letterSpacing: '0.08em', fontWeight: '600' }}>{ticket.id.slice(0, 8).toUpperCase()}</div>
                          <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>{meta.label}</div>
                        </div>
                      </div>
                      <span className={`badge ${ticket.status === 'valid' || ticket.status === 'active' ? 'badge-green' : 'badge-cyan'}`}>{ticket.status}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ minWidth: 0 }}>
                        {ticket.from ? (
                          <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{ticket.from} to {ticket.to}</div>
                        ) : (
                          <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{ticket.route}</div>
                        )}
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {fmtDate(ticket.purchasedAt)} {ticket.expiresAt ? `· Expires ${fmtDate(ticket.expiresAt)}` : ''}
                        </div>
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: '800', color: meta.color, flexShrink: 0 }}>₹{ticket.fare}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedTicket && (
        <div className="section-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: '6px' }}>BOARDING PASS</div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: TYPE_META[selectedTicket.type]?.color, marginBottom: '20px' }}>
            {selectedTicket.id.slice(0, 8).toUpperCase()}
          </div>
          <div style={{ display: 'inline-block', padding: '16px', borderRadius: 'var(--radius-lg)', background: 'white', border: `2px solid ${TYPE_META[selectedTicket.type]?.color}`, marginBottom: '20px' }}>
            <QRCodeSVG value={JSON.stringify({ id: selectedTicket.id, type: selectedTicket.type, uid: selectedTicket.userId })} size={154} />
          </div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
            {selectedTicket.from ? `${selectedTicket.from} to ${selectedTicket.to}` : selectedTicket.route}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>{fmtDate(selectedTicket.purchasedAt)}</div>
          <div style={{ height: '1px', background: 'repeating-linear-gradient(90deg, var(--border-default) 0px, var(--border-default) 8px, transparent 8px, transparent 14px)', margin: '16px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Fare</div>
              <div style={{ fontSize: '18px', fontWeight: '800' }}>₹{selectedTicket.fare}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Status</div>
              <span className={`badge ${selectedTicket.status === 'valid' || selectedTicket.status === 'active' ? 'badge-green' : 'badge-cyan'}`}>{selectedTicket.status}</span>
            </div>
          </div>
          {selectedTicket.status === 'valid' && selectedTicket.type !== 'pass' && (
            <button className="btn-primary" style={{ width: '100%' }} onClick={() => markTicketUsed(selectedTicket.id)}>
              Mark Used at Gate (Demo)
            </button>
          )}
        </div>
      )}
    </div>
  );
}