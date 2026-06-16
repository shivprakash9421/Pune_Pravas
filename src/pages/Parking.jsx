import React, { useState } from 'react';

const PARKING_LOCATIONS = [
  { id: 1, name: 'Shivajinagar Central', address: 'Station Rd, Shivajinagar', total: 200, available: 45, rate: '₹30/hr', type: 'Covered', dist: '0.3 km', status: 'Available', color: '#00ff88' },
  { id: 2, name: 'Deccan Gymkhana', address: 'Deccan, Pune', total: 150, available: 0, rate: '₹25/hr', type: 'Open', dist: '0.7 km', status: 'Full', color: '#ff3366' },
  { id: 3, name: 'MG Road Mall', address: 'MG Road, Camp', total: 400, available: 128, rate: '₹20/hr', type: 'Covered', dist: '1.2 km', status: 'Available', color: '#00ff88' },
  { id: 4, name: 'Bund Garden', address: 'Bund Garden Road', total: 80, available: 12, rate: '₹15/hr', type: 'Open', dist: '1.5 km', status: 'Limited', color: '#ffb700' },
  { id: 5, name: 'Koregaon Park', address: 'KP Road, Pune', total: 300, available: 210, rate: '₹40/hr', type: 'Covered + EV', dist: '2.1 km', status: 'Available', color: '#00ff88' },
];

const SLOT_GRID = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  status: i < 7 ? 'taken' : i < 9 ? 'reserved' : i > 24 ? 'ev' : 'free',
}));

const IconBuilding = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 21v-4h6v4M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/></svg>;
const IconCheck = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconBolt = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg>;

export default function Parking() {
  const [selected, setSelected] = useState(null);
  const [hours, setHours] = useState(2);
  const [slotSelected, setSlotSelected] = useState(null);
  const [booked, setBooked] = useState(false);

  const location = PARKING_LOCATIONS.find(p => p.id === selected);
  const totalCost = location ? parseInt(location.rate) * hours : 0;

  return (
    <div className="page-stack">

      {/* Stats */}
      <div className="responsive-grid-4">
        {[
          { label: 'Total Spots', value: '1,130', color: '#00f5ff' },
          { label: 'Available Now', value: '395', color: '#00ff88' },
          { label: 'Avg Rate', value: '₹26/hr', color: '#ffb700' },
          { label: 'EV Charging', value: '12 pts', color: '#8b5cf6' },
        ].map(s => (
          <div key={s.label} className="glass-card" style={{ padding: '18px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>{s.label}</div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className={selected ? 'two-col-layout' : ''} style={!selected ? { display: 'flex', flexDirection: 'column' } : {}}>

        {/* Location List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: 0 }}>
          {PARKING_LOCATIONS.map(loc => (
            <div
              key={loc.id}
              onClick={() => { setSelected(loc.id === selected ? null : loc.id); setSlotSelected(null); setBooked(false); }}
              style={{
                padding: '18px',
                borderRadius: 'var(--radius-lg)',
                border: `1px solid ${selected === loc.id ? loc.color : 'var(--border-subtle)'}`,
                background: selected === loc.id ? `${loc.color}08` : 'rgba(0,0,0,0.2)',
                cursor: loc.status !== 'Full' ? 'pointer' : 'default',
                opacity: loc.status === 'Full' ? 0.6 : 1,
                display: 'flex', alignItems: 'center', gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ position: 'relative', width: '52px', height: '52px', flexShrink: 0 }}>
                <svg viewBox="0 0 56 56" width="52" height="52" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4"/>
                  <circle cx="28" cy="28" r="22" fill="none" stroke={loc.color} strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 22}`}
                    strokeDashoffset={`${2 * Math.PI * 22 * (1 - loc.available / loc.total)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: '700', color: loc.color,
                }}>{Math.round(loc.available/loc.total*100)}%</div>
              </div>

              <div style={{ flex: '1 1 200px', minWidth: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{loc.name}</div>
                  <span className={`badge ${loc.status === 'Available' ? 'badge-green' : loc.status === 'Full' ? 'badge-red' : 'badge-amber'}`} style={{ fontSize: '11px' }}>
                    {loc.status}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{loc.address} - {loc.dist}</div>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{loc.type}</span>
                  <span style={{ fontSize: '12px', color: 'var(--neon-amber)', fontWeight: '600' }}>{loc.rate}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{loc.available}/{loc.total} free</span>
                </div>
              </div>

              <div style={{ fontSize: '20px', fontWeight: '800', color: loc.color, flexShrink: 0, textAlign: 'center' }}>
                {loc.available}
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '400' }}>slots</div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Panel */}
        {selected && location && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0, animation: 'slide-up 0.3s ease' }}>
            <div className="section-card">
              <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '4px', color: location.color }}>{location.name}</h3>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px' }}>{location.address}</div>

              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>Select Slot</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: '6px', marginBottom: '20px' }}>
                {SLOT_GRID.map(slot => {
                  const colors = { taken: '#ff3366', reserved: '#ffb700', ev: '#8b5cf6', free: location.color };
                  const c = colors[slot.status];
                  return (
                    <div
                      key={slot.id}
                      onClick={() => slot.status === 'free' || slot.status === 'ev' ? setSlotSelected(slot.id) : null}
                      style={{
                        height: '34px',
                        borderRadius: '6px',
                        background: slotSelected === slot.id ? c : `${c}22`,
                        border: `1px solid ${c}55`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10px', fontWeight: '600', color: slotSelected === slot.id ? '#000' : c,
                        cursor: slot.status === 'free' || slot.status === 'ev' ? 'pointer' : 'not-allowed',
                        opacity: slot.status === 'taken' ? 0.5 : 1,
                      }}
                    >
                      {slot.status === 'ev' ? <IconBolt /> : slot.id}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', fontSize: '11px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                {[['#ff3366','Taken'],['#ffb700','Reserved'],['#8b5cf6','EV'],['#00ff88','Free']].map(([c,l]) => (
                  <span key={l} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: c, flexShrink: 0 }} />{l}
                  </span>
                ))}
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Duration</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[1,2,3,4,6,8].map(h => (
                    <button key={h} onClick={() => setHours(h)} style={{
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: `1px solid ${hours === h ? location.color : 'var(--border-subtle)'}`,
                      background: hours === h ? `${location.color}15` : 'rgba(0,0,0,0.2)',
                      color: hours === h ? location.color : 'var(--text-secondary)',
                      fontWeight: '600', fontSize: '13px', cursor: 'pointer',
                    }}>{h}h</button>
                  ))}
                </div>
              </div>

              <div style={{
                padding: '14px', borderRadius: 'var(--radius-md)',
                background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-subtle)',
                display: 'flex', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px',
              }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Slot {slotSelected || '-'} - {hours} hrs</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{location.rate}</div>
                </div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: location.color }}>
                  ₹{totalCost}
                </div>
              </div>

              {booked ? (
                <div style={{ textAlign: 'center', padding: '20px', borderRadius: 'var(--radius-md)', background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.3)' }}>
                  <div className="icon-circle" style={{ margin: '0 auto 8px', '--icon-color': 'var(--neon-green)' }}><IconCheck /></div>
                  <div style={{ color: 'var(--neon-green)', fontWeight: '700', marginBottom: '4px' }}>SLOT RESERVED</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Slot {slotSelected} - {location.name}</div>
                </div>
              ) : (
                <button
                  className="btn-primary"
                  style={{ width: '100%', padding: '13px', opacity: slotSelected ? 1 : 0.5 }}
                  onClick={() => slotSelected && setBooked(true)}
                  disabled={!slotSelected}
                >
                  Reserve Slot - ₹{totalCost}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}