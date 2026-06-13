import React, { useState } from 'react';

const ACTIVE_TICKETS = [
  { id: 'TK-4821', type: 'Metro', from: 'Shivajinagar', to: 'Swargate', date: 'Today', time: '06:00 PM', fare: '₹30', status: 'Valid', color: '#8b5cf6', icon: '🚇' },
  { id: 'MBP-125', type: 'Bus Pass', route: 'Monthly All-Routes', expiry: '30 Jun 2026', fare: '₹650', status: 'Active', color: '#ffb700', icon: '🚌' },
];

const PAST_TICKETS = [
  { id: 'TK-4820', type: 'Metro', from: 'PCMC', to: 'Civil Court', date: 'Today 08:45 AM', fare: '₹28', status: 'Used', color: '#8b5cf6', icon: '🚇' },
  { id: 'CB-9924', type: 'Cab', from: 'FC Road', to: 'COEP', date: 'Yesterday', fare: '₹65', status: 'Completed', color: '#00f5ff', icon: '🚗' },
  { id: 'TK-4819', type: 'Metro', from: 'Vanaz', to: 'Deccan', date: '3 days ago', fare: '₹20', status: 'Used', color: '#8b5cf6', icon: '🚇' },
];

function QRCode({ id }) {
  // Stylized QR placeholder
  const cells = [];
  for (let r = 0; r < 11; r++) {
    for (let c = 0; c < 11; c++) {
      const isFinder = (r < 3 && c < 3) || (r < 3 && c > 7) || (r > 7 && c < 3);
      const isRandom = Math.random() > 0.5;
      cells.push({ r, c, filled: isFinder || isRandom });
    }
  }
  const cell = 14;
  return (
    <svg width={11*cell} height={11*cell} viewBox={`0 0 ${11*cell} ${11*cell}`}>
      <rect width={11*cell} height={11*cell} fill="white" rx="8"/>
      {cells.map(({r,c,filled},i) => filled && (
        <rect key={i} x={c*cell+2} y={r*cell+2} width={cell-2} height={cell-2} fill="#000" rx="1"/>
      ))}
    </svg>
  );
}

export default function Tickets() {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedTicket, setSelectedTicket] = useState(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: selectedTicket ? '1fr 360px' : '1fr', gap: '20px' }}>

      {/* Main */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: 'var(--radius-md)', width: 'fit-content', border: '1px solid var(--border-subtle)' }}>
          {['active', 'past'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '8px 24px', borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeTab === tab ? 'rgba(0,245,255,0.12)' : 'transparent',
              color: activeTab === tab ? 'var(--neon-cyan)' : 'var(--text-secondary)',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: activeTab === tab ? '600' : '400',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textTransform: 'capitalize',
            }}>
              {tab === 'active' ? `Active (${ACTIVE_TICKETS.length})` : 'Past Trips'}
            </button>
          ))}
        </div>

        {/* Buy new ticket CTA */}
        {activeTab === 'active' && (
          <div style={{
            padding: '18px 24px',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(90deg, rgba(0,245,255,0.08), rgba(0,102,255,0.06))',
            border: '1px dashed rgba(0,245,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '2px' }}>Need a ticket?</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Book Metro, Bus, or purchase a monthly pass</div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-primary" style={{ fontSize: '13px', padding: '10px 20px' }}>Buy Ticket</button>
              <button className="btn-ghost" style={{ fontSize: '13px', padding: '10px 20px' }}>Buy Pass</button>
            </div>
          </div>
        )}

        {/* Ticket List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(activeTab === 'active' ? ACTIVE_TICKETS : PAST_TICKETS).map(ticket => (
            <div
              key={ticket.id}
              onClick={() => setSelectedTicket(selectedTicket?.id === ticket.id ? null : ticket)}
              style={{
                padding: '0',
                borderRadius: 'var(--radius-lg)',
                border: `1px solid ${selectedTicket?.id === ticket.id ? ticket.color : 'var(--border-subtle)'}`,
                background: selectedTicket?.id === ticket.id ? `${ticket.color}08` : 'rgba(0,0,0,0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                overflow: 'hidden',
              }}
            >
              {/* Ticket notches */}
              <div style={{ display: 'flex', position: 'relative' }}>
                {/* Left accent */}
                <div style={{ width: '6px', background: ticket.color, flexShrink: 0 }} />

                <div style={{ flex: 1, padding: '18px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '22px' }}>{ticket.icon}</span>
                      <div>
                        <div style={{ fontSize: '11px', color: ticket.color, fontFamily: 'Orbitron, monospace', letterSpacing: '0.08em', fontWeight: '600' }}>{ticket.id}</div>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>{ticket.type}</div>
                      </div>
                    </div>
                    <span className={`badge ${ticket.status === 'Valid' || ticket.status === 'Active' ? 'badge-green' : 'badge-cyan'}`}>
                      {ticket.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      {ticket.from ? (
                        <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}>
                          {ticket.from} → {ticket.to}
                        </div>
                      ) : (
                        <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{ticket.route}</div>
                      )}
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {ticket.date || ''} {ticket.time || ''} {ticket.expiry ? `Expires: ${ticket.expiry}` : ''}
                      </div>
                    </div>
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '18px', fontWeight: '800', color: ticket.color }}>
                      {ticket.fare}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QR Panel */}
      {selectedTicket && (
        <div className="glass-card" style={{ padding: '28px', textAlign: 'center', position: 'sticky', top: '80px', animation: 'slide-up 0.3s ease' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'Orbitron, monospace', letterSpacing: '0.15em', marginBottom: '6px' }}>
            BOARDING PASS
          </div>
          <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '20px', fontWeight: '700', color: selectedTicket.color, marginBottom: '20px' }}>
            {selectedTicket.id}
          </div>

          {/* QR */}
          <div style={{
            display: 'inline-block',
            padding: '16px',
            borderRadius: 'var(--radius-lg)',
            background: 'white',
            boxShadow: `0 0 30px ${selectedTicket.color}44`,
            border: `2px solid ${selectedTicket.color}`,
            marginBottom: '20px',
            animation: 'pulse-glow 3s ease-in-out infinite',
          }}>
            <QRCode id={selectedTicket.id} />
          </div>

          <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
            {selectedTicket.from ? `${selectedTicket.from} → ${selectedTicket.to}` : selectedTicket.route}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            {selectedTicket.date} {selectedTicket.time || selectedTicket.expiry || ''}
          </div>

          <div style={{ height: '1px', background: 'repeating-linear-gradient(90deg, var(--border-default) 0px, var(--border-default) 8px, transparent 8px, transparent 14px)', margin: '16px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Fare</div>
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '20px', fontWeight: '800', color: selectedTicket.color }}>{selectedTicket.fare}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Status</div>
              <span className={`badge ${selectedTicket.status === 'Valid' || selectedTicket.status === 'Active' ? 'badge-green' : 'badge-cyan'}`}>
                {selectedTicket.status}
              </span>
            </div>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--text-muted)', padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)' }}>
            Scan this QR at the gate · Valid for single use
          </div>

          <button className="btn-ghost" style={{ width: '100%', marginTop: '12px', fontSize: '13px' }}>
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
