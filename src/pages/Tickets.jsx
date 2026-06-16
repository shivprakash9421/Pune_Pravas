import React, { useState } from 'react';

const ACTIVE_TICKETS = [
  { id: 'TK-4821', type: 'Metro', from: 'Shivajinagar', to: 'Swargate', date: 'Today', time: '06:00 PM', fare: '₹30', status: 'Valid', color: '#8b5cf6' },
  { id: 'MBP-125', type: 'Bus Pass', route: 'Monthly All-Routes', expiry: '30 Jun 2026', fare: '₹650', status: 'Active', color: '#ffb700' },
];

const PAST_TICKETS = [
  { id: 'TK-4820', type: 'Metro', from: 'PCMC', to: 'Civil Court', date: 'Today 08:45 AM', fare: '₹28', status: 'Used', color: '#8b5cf6' },
  { id: 'CB-9924', type: 'Cab', from: 'FC Road', to: 'COEP', date: 'Yesterday', fare: '₹65', status: 'Completed', color: '#00f5ff' },
  { id: 'TK-4819', type: 'Metro', from: 'Vanaz', to: 'Deccan', date: '3 days ago', fare: '₹20', status: 'Used', color: '#8b5cf6' },
];

const IconMetro = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="3" width="16" height="13" rx="2"/><path d="M8 16v3m8-3v3M4 9h16"/></svg>;
const IconBus = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 16V6a2 2 0 012-2h12a2 2 0 012 2v10l-2 2H6l-2-2z"/><path d="M4 12h16M9 18v2m6-2v2"/></svg>;
const IconCab = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 17H3v-5l2-5h14l2 5v5h-2M5 17a2 2 0 004 0M15 17a2 2 0 004 0"/></svg>;

const TYPE_ICON = { Metro: IconMetro, Cab: IconCab, 'Bus Pass': IconBus };

function QRCode({ id }) {
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
    <svg width={11*cell} height={11*cell} viewBox={`0 0 ${11*cell} ${11*cell}`} style={{ maxWidth: '100%', height: 'auto' }}>
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
    <div className={selectedTicket ? 'two-col-layout' : ''} style={!selectedTicket ? {} : {}}>

      {/* Main */}
      <div className="page-stack">

        <div className="tab-row">
          {['active', 'past'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`tab-item ${activeTab === tab ? 'active' : ''}`}>
              {tab === 'active' ? `Active (${ACTIVE_TICKETS.length})` : 'Past Trips'}
            </button>
          ))}
        </div>

        {activeTab === 'active' && (
          <div style={{
            padding: '18px 20px',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(90deg, rgba(0,245,255,0.08), rgba(0,102,255,0.06))',
            border: '1px dashed rgba(0,245,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '14px',
          }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '2px' }}>Need a ticket?</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Book Metro, Bus, or purchase a monthly pass</div>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button className="btn-primary" style={{ fontSize: '13px', padding: '10px 20px' }}>Buy Ticket</button>
              <button className="btn-ghost" style={{ fontSize: '13px', padding: '10px 20px' }}>Buy Pass</button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(activeTab === 'active' ? ACTIVE_TICKETS : PAST_TICKETS).map(ticket => {
            const Icon = TYPE_ICON[ticket.type] || IconMetro;
            return (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(selectedTicket?.id === ticket.id ? null : ticket)}
                style={{
                  borderRadius: 'var(--radius-lg)',
                  border: `1px solid ${selectedTicket?.id === ticket.id ? ticket.color : 'var(--border-subtle)'}`,
                  background: selectedTicket?.id === ticket.id ? `${ticket.color}08` : 'rgba(0,0,0,0.2)',
                  cursor: 'pointer', overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '6px', background: ticket.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, padding: '16px 18px', minWidth: 0, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                        <div className="icon-circle" style={{ '--icon-color': ticket.color, width: '38px', height: '38px', flexShrink: 0 }}><Icon /></div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: '11px', color: ticket.color, letterSpacing: '0.08em', fontWeight: '600' }}>{ticket.id}</div>
                          <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>{ticket.type}</div>
                        </div>
                      </div>
                      <span className={`badge ${ticket.status === 'Valid' || ticket.status === 'Active' ? 'badge-green' : 'badge-cyan'}`}>
                        {ticket.status}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ minWidth: 0 }}>
                        {ticket.from ? (
                          <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {ticket.from} to {ticket.to}
                          </div>
                        ) : (
                          <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{ticket.route}</div>
                        )}
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {ticket.date || ''} {ticket.time || ''} {ticket.expiry ? `Expires: ${ticket.expiry}` : ''}
                        </div>
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: '800', color: ticket.color, flexShrink: 0 }}>
                        {ticket.fare}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* QR Panel */}
      {selectedTicket && (
        <div className="section-card" style={{ textAlign: 'center', animation: 'slide-up 0.3s ease' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: '6px' }}>
            BOARDING PASS
          </div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: selectedTicket.color, marginBottom: '20px' }}>
            {selectedTicket.id}
          </div>

          <div style={{
            display: 'inline-block', padding: '16px', borderRadius: 'var(--radius-lg)',
            background: 'white', boxShadow: `0 0 30px ${selectedTicket.color}44`,
            border: `2px solid ${selectedTicket.color}`, marginBottom: '20px', maxWidth: '100%',
          }}>
            <QRCode id={selectedTicket.id} />
          </div>

          <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
            {selectedTicket.from ? `${selectedTicket.from} to ${selectedTicket.to}` : selectedTicket.route}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            {selectedTicket.date} {selectedTicket.time || selectedTicket.expiry || ''}
          </div>

          <div style={{ height: '1px', background: 'repeating-linear-gradient(90deg, var(--border-default) 0px, var(--border-default) 8px, transparent 8px, transparent 14px)', margin: '16px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Fare</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: selectedTicket.color }}>{selectedTicket.fare}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Status</div>
              <span className={`badge ${selectedTicket.status === 'Valid' || selectedTicket.status === 'Active' ? 'badge-green' : 'badge-cyan'}`}>
                {selectedTicket.status}
              </span>
            </div>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--text-muted)', padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)' }}>
            Scan this QR at the gate - Valid for single use
          </div>

          <button className="btn-ghost" style={{ width: '100%', marginTop: '12px', fontSize: '13px' }}>
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}