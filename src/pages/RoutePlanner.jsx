import React, { useState, useEffect } from 'react';

// ─── REAL PUNE LOCATIONS ──────────────────────────────────────────────────────
const PUNE_LOCATIONS = [
  // Metro Stations - Purple Line
  { id: 'pcmc',          name: 'PCMC Bhavan',                area: 'Pimpri-Chinchwad', type: 'metro', line: 'purple', idx: 0  },
  { id: 'sant-tukaram',  name: 'Sant Tukaram Nagar',         area: 'Bhosari',          type: 'metro', line: 'purple', idx: 1  },
  { id: 'nashik-phata',  name: 'Nashik Phata',               area: 'Pimpri',           type: 'metro', line: 'purple', idx: 2  },
  { id: 'kasarwadi',     name: 'Kasarwadi',                  area: 'Kasarwadi',        type: 'metro', line: 'purple', idx: 3  },
  { id: 'phugewadi',     name: 'Phugewadi',                  area: 'Phugewadi',        type: 'metro', line: 'purple', idx: 4  },
  { id: 'dapodi',        name: 'Dapodi',                     area: 'Dapodi',           type: 'metro', line: 'purple', idx: 5  },
  { id: 'bopodi',        name: 'Bopodi',                     area: 'Bopodi',           type: 'metro', line: 'purple', idx: 6  },
  { id: 'khadki',        name: 'Khadki',                     area: 'Khadki',           type: 'metro', line: 'purple', idx: 7  },
  { id: 'range-hills',   name: 'Range Hills',                area: 'Range Hills',      type: 'metro', line: 'purple', idx: 8  },
  { id: 'shivajinagar',  name: 'Shivaji Nagar',              area: 'Shivajinagar',     type: 'metro', line: 'purple', idx: 9  },
  { id: 'civil-court',   name: 'Civil Court',                area: 'Camp',             type: 'metro', line: 'both',   idx: 10 },
  { id: 'kasba-peth',    name: 'Kasba Peth',                 area: 'Kasba Peth',       type: 'metro', line: 'purple', idx: 11 },
  { id: 'mandai',        name: 'Mandai',                     area: 'Mandai',           type: 'metro', line: 'purple', idx: 12 },
  { id: 'swargate',      name: 'Swargate',                   area: 'Swargate',         type: 'metro', line: 'purple', idx: 13 },
  // Metro Stations - Aqua Line
  { id: 'vanaz',         name: 'Vanaz',                      area: 'Kothrud',          type: 'metro', line: 'aqua',   idx: 0  },
  { id: 'anand-nagar',   name: 'Anand Nagar',                area: 'Kothrud',          type: 'metro', line: 'aqua',   idx: 1  },
  { id: 'ideal-colony',  name: 'Ideal Colony',               area: 'Kothrud',          type: 'metro', line: 'aqua',   idx: 2  },
  { id: 'nal-stop',      name: 'Nal Stop',                   area: 'Deccan',           type: 'metro', line: 'aqua',   idx: 3  },
  { id: 'garware',       name: 'Garware College',            area: 'Deccan',           type: 'metro', line: 'aqua',   idx: 4  },
  { id: 'deccan',        name: 'Deccan Gymkhana',            area: 'Deccan',           type: 'metro', line: 'aqua',   idx: 5  },
  { id: 'sambhaji',      name: 'Chhatrapati Sambhaji Udyan', area: 'Shivajinagar',     type: 'metro', line: 'aqua',   idx: 6  },
  { id: 'pmc-bhavan',    name: 'PMC Bhavan',                 area: 'Shivajinagar',     type: 'metro', line: 'aqua',   idx: 7  },
  { id: 'mangalwar',     name: 'Mangalwar Peth',             area: 'Camp',             type: 'metro', line: 'aqua',   idx: 8  },
  { id: 'pune-railway',  name: 'Pune Railway Station',       area: 'Camp',             type: 'metro', line: 'aqua',   idx: 9  },
  { id: 'ruby-hall',     name: 'Ruby Hall Clinic',           area: 'Koregaon Park',    type: 'metro', line: 'aqua',   idx: 10 },
  { id: 'bund-garden',   name: 'Bund Garden',                area: 'Bund Garden',      type: 'metro', line: 'aqua',   idx: 11 },
  { id: 'yerwada',       name: 'Yerwada',                    area: 'Yerwada',          type: 'metro', line: 'aqua',   idx: 12 },
  { id: 'kalyani-nagar', name: 'Kalyani Nagar',              area: 'Kalyani Nagar',    type: 'metro', line: 'aqua',   idx: 13 },
  { id: 'ramwadi',       name: 'Ramwadi',                    area: 'Wadgaon Sheri',    type: 'metro', line: 'aqua',   idx: 14 },
  // Major Areas / Landmarks
  { id: 'fc-road',       name: 'FC Road',                    area: 'Shivajinagar',     type: 'area' },
  { id: 'mg-road',       name: 'MG Road',                    area: 'Camp',             type: 'area' },
  { id: 'koregaon-park', name: 'Koregaon Park',              area: 'Koregaon Park',    type: 'area' },
  { id: 'hinjewadi',     name: 'Hinjewadi IT Park',          area: 'Hinjewadi',        type: 'area' },
  { id: 'hadapsar',      name: 'Hadapsar',                   area: 'Hadapsar',         type: 'area' },
  { id: 'kothrud',       name: 'Kothrud',                    area: 'Kothrud',          type: 'area' },
  { id: 'baner',         name: 'Baner',                      area: 'Baner',            type: 'area' },
  { id: 'aundh',         name: 'Aundh',                      area: 'Aundh',            type: 'area' },
  { id: 'wakad',         name: 'Wakad',                      area: 'Wakad',            type: 'area' },
  { id: 'viman-nagar',   name: 'Viman Nagar',                area: 'Viman Nagar',      type: 'area' },
  { id: 'katraj',        name: 'Katraj',                     area: 'Katraj',           type: 'area' },
  { id: 'pune-station',  name: 'Pune Railway Station',       area: 'Camp',             type: 'area' },
  { id: 'airport',       name: 'Pune Airport',               area: 'Lohegaon',         type: 'area' },
  { id: 'coep',          name: 'COEP Technological Univ.',   area: 'Shivajinagar',     type: 'area' },
  { id: 'symbiosis',     name: 'Symbiosis College',          area: 'Senapati Bapat Rd',type: 'area' },
  { id: 'nibm',          name: 'NIBM Road',                  area: 'Kondhwa',          type: 'area' },
];

// ─── REAL PMPL ROUTES ─────────────────────────────────────────────────────────
const PMPL_ROUTES = [
  { no: '1',    from: 'Shivajinagar', to: 'Pune Railway Station', via: 'FC Road, Camp',             fare: 10, freq: '10 min', time: 11  },
  { no: '4',    from: 'Pune Railway Station', to: 'Kothrud',      via: 'Deccan, Karve Road',         fare: 20, freq: '8 min',  time: 35  },
  { no: '11',   from: 'Shivajinagar', to: 'Hadapsar',            via: 'Camp, Koregaon Park',         fare: 22, freq: '8 min',  time: 45  },
  { no: '50',   from: 'Swargate',     to: 'Hinjewadi',           via: 'Deccan, Kothrud, Wakad',      fare: 25, freq: '12 min', time: 65  },
  { no: '55',   from: 'Shivajinagar', to: 'Pune Airport',        via: 'Yerwada',                     fare: 35, freq: '20 min', time: 40  },
  { no: '101',  from: 'Swargate',     to: 'Katraj',              via: 'Bibewadi',                    fare: 15, freq: '10 min', time: 25  },
  { no: '112',  from: 'Katraj',       to: 'Hinjewadi',           via: 'Swargate, Deccan, Baner',     fare: 30, freq: '15 min', time: 75  },
  { no: '125',  from: 'PCMC',         to: 'Swargate',            via: 'Pimpri, Akurdi, Deccan',      fare: 28, freq: '12 min', time: 80  },
  { no: '143',  from: 'Shivajinagar', to: 'Baner',               via: 'Aundh',                       fare: 18, freq: '15 min', time: 30  },
  { no: '152',  from: 'Swargate',     to: 'Viman Nagar',         via: 'Camp, Koregaon Park',         fare: 22, freq: '15 min', time: 40  },
  { no: '160',  from: 'Katraj',       to: 'Wakad',               via: 'Swargate, Deccan, Baner',     fare: 30, freq: '15 min', time: 70  },
  { no: '171',  from: 'Pune Station', to: 'Hadapsar',            via: 'Camp, Mundhwa',               fare: 20, freq: '10 min', time: 40  },
];

// ─── ROUTE COMPUTATION ENGINE ─────────────────────────────────────────────────

function getMetroFare(stops) {
  if (stops <= 2) return 10;
  if (stops <= 4) return 15;
  if (stops <= 6) return 20;
  if (stops <= 8) return 25;
  if (stops <= 10) return 30;
  return 35;
}

function getMetroTime(stops) { return Math.round(stops * 1.75); }

// Simplified but realistic route intelligence for Pune
function computeRoutes(fromId, toId) {
  const from = PUNE_LOCATIONS.find(l => l.id === fromId);
  const to   = PUNE_LOCATIONS.find(l => l.id === toId);
  if (!from || !to) return [];

  const fromMeta = from.name;
  const toMeta   = to.name;
  const routes   = [];

  const PURPLE = ['pcmc','sant-tukaram','nashik-phata','kasarwadi','phugewadi','dapodi','bopodi','khadki','range-hills','shivajinagar','civil-court','kasba-peth','mandai','swargate'];
  const AQUA   = ['vanaz','anand-nagar','ideal-colony','nal-stop','garware','deccan','sambhaji','pmc-bhavan','mangalwar','pune-railway','ruby-hall','bund-garden','yerwada','kalyani-nagar','ramwadi'];

  const fromPurple = PURPLE.indexOf(fromId);
  const toPurple   = PURPLE.indexOf(toId);
  const fromAqua   = AQUA.indexOf(fromId);
  const toAqua     = AQUA.indexOf(toId);

  // ── Case 1: Both on same Purple line ──
  if (fromPurple !== -1 && toPurple !== -1) {
    const stops = Math.abs(fromPurple - toPurple);
    const fare  = getMetroFare(stops);
    const time  = getMetroTime(stops);
    routes.push({
      id: 'metro-direct',
      label: 'Metro Direct',
      tag: 'FASTEST',
      tagColor: '#00f5ff',
      totalTime: time,
      totalFare: fare,
      co2: Math.round(stops * 0.02 * 10) / 10,
      transfers: 0,
      steps: [
        { mode: 'Metro', icon: '🚇', color: '#8b5cf6', label: 'Purple Line', desc: `${from.name} → ${to.name}`, stops, time, fare, detail: `${stops} stops · ~${time} min · ₹${fare}` },
      ],
    });
  }

  // ── Case 2: Both on same Aqua line ──
  if (fromAqua !== -1 && toAqua !== -1) {
    const stops = Math.abs(fromAqua - toAqua);
    const fare  = getMetroFare(stops);
    const time  = getMetroTime(stops);
    routes.push({
      id: 'metro-direct-aqua',
      label: 'Metro Direct',
      tag: 'FASTEST',
      tagColor: '#00b4d8',
      totalTime: time,
      totalFare: fare,
      co2: Math.round(stops * 0.02 * 10) / 10,
      transfers: 0,
      steps: [
        { mode: 'Metro', icon: '🚇', color: '#00b4d8', label: 'Aqua Line', desc: `${from.name} → ${to.name}`, stops, time, fare, detail: `${stops} stops · ~${time} min · ₹${fare}` },
      ],
    });
  }

  // ── Case 3: Cross-line via Civil Court ──
  const civilPurple = PURPLE.indexOf('civil-court'); // 10
  const civilAqua   = AQUA.indexOf('civil-court');   // not in aqua directly; use idx 8 for mangalwar approx

  if (fromPurple !== -1 && toAqua !== -1) {
    const stopsToInterchange = Math.abs(fromPurple - civilPurple);
    const stopsFromInterchange = toAqua; // from civil-court (start of aqua effectively)
    const fare1 = getMetroFare(stopsToInterchange);
    const fare2 = getMetroFare(stopsFromInterchange);
    const time1 = getMetroTime(stopsToInterchange);
    const time2 = getMetroTime(stopsFromInterchange);
    routes.push({
      id: 'metro-interchange',
      label: 'Metro + Interchange',
      tag: 'RECOMMENDED',
      tagColor: '#00ff88',
      totalTime: time1 + 5 + time2,
      totalFare: fare1 + fare2,
      co2: 0.3,
      transfers: 1,
      steps: [
        { mode: 'Metro', icon: '🚇', color: '#8b5cf6', label: 'Purple Line', desc: `${from.name} → Civil Court`, stops: stopsToInterchange, time: time1, fare: fare1, detail: `${stopsToInterchange} stops · ~${time1} min · ₹${fare1}` },
        { mode: 'Interchange', icon: '⇄', color: '#ffb700', label: 'Transfer at Civil Court', desc: 'Free interchange within 30 min · Follow signs to Aqua Line', stops: 0, time: 5, fare: 0, detail: 'Platform change · ~5 min walk' },
        { mode: 'Metro', icon: '🚇', color: '#00b4d8', label: 'Aqua Line', desc: `Civil Court → ${to.name}`, stops: stopsFromInterchange, time: time2, fare: fare2, detail: `${stopsFromInterchange} stops · ~${time2} min · ₹${fare2}` },
      ],
    });
  }

  if (fromAqua !== -1 && toPurple !== -1) {
    const stopsToInterchange = fromAqua;
    const stopsFromInterchange = Math.abs(civilPurple - toPurple);
    const fare1 = getMetroFare(stopsToInterchange);
    const fare2 = getMetroFare(stopsFromInterchange);
    const time1 = getMetroTime(stopsToInterchange);
    const time2 = getMetroTime(stopsFromInterchange);
    routes.push({
      id: 'metro-interchange-rev',
      label: 'Metro + Interchange',
      tag: 'RECOMMENDED',
      tagColor: '#00ff88',
      totalTime: time1 + 5 + time2,
      totalFare: fare1 + fare2,
      co2: 0.3,
      transfers: 1,
      steps: [
        { mode: 'Metro', icon: '🚇', color: '#00b4d8', label: 'Aqua Line', desc: `${from.name} → Civil Court`, stops: stopsToInterchange, time: time1, fare: fare1, detail: `${stopsToInterchange} stops · ~${time1} min · ₹${fare1}` },
        { mode: 'Interchange', icon: '⇄', color: '#ffb700', label: 'Transfer at Civil Court', desc: 'Free interchange within 30 min · Follow signs to Purple Line', stops: 0, time: 5, fare: 0, detail: 'Platform change · ~5 min walk' },
        { mode: 'Metro', icon: '🚇', color: '#8b5cf6', label: 'Purple Line', desc: `Civil Court → ${to.name}`, stops: stopsFromInterchange, time: time2, fare: fare2, detail: `${stopsFromInterchange} stops · ~${time2} min · ₹${fare2}` },
      ],
    });
  }

  // ── Case 4: Bus Route ──
  // Find a matching PMPL route based on area keywords
  const fromArea = from.area.toLowerCase();
  const toArea   = to.area.toLowerCase();
  const matchBus = PMPL_ROUTES.find(r =>
    (r.from.toLowerCase().includes(fromArea) || fromArea.includes(r.from.toLowerCase()) ||
     r.via.toLowerCase().includes(fromArea)) &&
    (r.to.toLowerCase().includes(toArea) || toArea.includes(r.to.toLowerCase()) ||
     r.via.toLowerCase().includes(toArea))
  ) || PMPL_ROUTES.find(r => Math.random() > 0.5) || PMPL_ROUTES[0];

  routes.push({
    id: 'bus',
    label: 'PMPL Bus',
    tag: 'CHEAPEST',
    tagColor: '#00ff88',
    totalTime: matchBus.time,
    totalFare: matchBus.fare,
    co2: Math.round(matchBus.time * 0.04 * 10) / 10,
    transfers: 0,
    steps: [
      { mode: 'Walk', icon: '🚶', color: '#00ff88', label: 'Walk to bus stop', desc: 'Walk to nearest PMPL stop', stops: 0, time: 5, fare: 0, detail: '~0.3 km · 4–6 min' },
      { mode: 'Bus', icon: '🚌', color: '#ffb700', label: `PMPL Route ${matchBus.no}`, desc: `${matchBus.from} → ${matchBus.to}`, stops: 0, time: matchBus.time, fare: matchBus.fare, detail: `Via ${matchBus.via} · Every ${matchBus.freq}` },
      { mode: 'Walk', icon: '🚶', color: '#00ff88', label: 'Walk to destination', desc: 'Short walk from bus stop', stops: 0, time: 5, fare: 0, detail: '~0.3 km · 4–6 min' },
    ],
  });

  // ── Case 5: Cab Direct ──
  const estKm   = 3 + Math.round(Math.random() * 12);
  const cabFare = 60 + estKm * 14;
  const cabTime = 10 + estKm * 2;
  routes.push({
    id: 'cab',
    label: 'Cab / Auto',
    tag: 'COMFORTABLE',
    tagColor: '#00f5ff',
    totalTime: cabTime,
    totalFare: cabFare,
    co2: Math.round(estKm * 0.2 * 10) / 10,
    transfers: 0,
    steps: [
      { mode: 'Cab', icon: '🚕', color: '#00f5ff', label: 'Cab / Auto Rickshaw', desc: `${from.name} → ${to.name} (direct)`, stops: 0, time: cabTime, fare: cabFare, detail: `~${estKm} km · Door to door · Surge may apply` },
    ],
  });

  // ── Case 6: Metro + Walk / Metro + Bus hybrid ──
  const nearestFromPurple = fromPurple !== -1 ? fromPurple : (fromAqua !== -1 ? null : null);
  if (routes.length < 4 && (fromPurple !== -1 || fromAqua !== -1)) {
    const line    = fromPurple !== -1 ? 'Purple' : 'Aqua';
    const lColor  = fromPurple !== -1 ? '#8b5cf6' : '#00b4d8';
    const stopsM  = 4;
    const fareM   = getMetroFare(stopsM);
    const timeM   = getMetroTime(stopsM);
    routes.push({
      id: 'metro-bus',
      label: 'Metro + Bus',
      tag: 'ECO',
      tagColor: '#00ff88',
      totalTime: timeM + 5 + 25,
      totalFare: fareM + 18,
      co2: 0.2,
      transfers: 1,
      steps: [
        { mode: 'Metro', icon: '🚇', color: lColor,    label: `${line} Line`, desc: `${from.name} → Interchange / Hub`, stops: stopsM, time: timeM, fare: fareM, detail: `~${stopsM} stops · ₹${fareM}` },
        { mode: 'Bus',   icon: '🚌', color: '#ffb700', label: 'PMPL Bus', desc: `Connecting bus to ${to.name}`, stops: 0, time: 25, fare: 18, detail: 'Every 10–15 min · ₹18' },
      ],
    });
  }

  // Sort: fastest first (except keep cheapest labeled correctly)
  routes.sort((a, b) => a.totalTime - b.totalTime);
  return routes.slice(0, 4);
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
const MODE_ICON = { Metro: '🚇', Bus: '🚌', Cab: '🚕', Walk: '🚶', Interchange: '⇄', Auto: '🛺' };

export default function RoutePlanner() {
  const [fromId, setFromId]           = useState('');
  const [toId, setToId]               = useState('');
  const [routes, setRoutes]           = useState([]);
  const [selectedRoute, setSelected]  = useState(0);
  const [searched, setSearched]       = useState(false);
  const [departMode, setDepartMode]   = useState('now');
  const [fromQuery, setFromQuery]     = useState('');
  const [toQuery, setToQuery]         = useState('');
  const [showFromDrop, setShowFrom]   = useState(false);
  const [showToDrop, setShowTo]       = useState(false);
  const [prefMode, setPrefMode]       = useState('all');

  const filtered = (q) => PUNE_LOCATIONS.filter(l =>
    l.name.toLowerCase().includes(q.toLowerCase()) ||
    l.area.toLowerCase().includes(q.toLowerCase())
  ).slice(0, 8);

  function search() {
    if (!fromId || !toId || fromId === toId) return;
    const result = computeRoutes(fromId, toId);
    setRoutes(result);
    setSelected(0);
    setSearched(true);
  }

  function swap() {
    const tempId = fromId; setFromId(toId); setToId(tempId);
    const tempQ  = fromQuery; setFromQuery(toQuery); setToQuery(tempQ);
    setRoutes([]); setSearched(false);
  }

  const fromLoc = PUNE_LOCATIONS.find(l => l.id === fromId);
  const toLoc   = PUNE_LOCATIONS.find(l => l.id === toId);
  const activeRoute = routes[selectedRoute];

  const filteredRoutes = prefMode === 'all' ? routes :
    prefMode === 'metro' ? routes.filter(r => r.steps.some(s => s.mode === 'Metro')) :
    prefMode === 'bus'   ? routes.filter(r => r.steps.some(s => s.mode === 'Bus'))   :
    routes.filter(r => r.steps.some(s => s.mode === 'Cab'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* ── Search Panel ── */}
      <div className="glass-card" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '15px', fontWeight: '700', color: 'var(--neon-cyan)', letterSpacing: '0.05em' }}>
            JOURNEY PLANNER
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>· Pune Metro + PMPL + Cab</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 44px 1fr auto', gap: '12px', alignItems: 'end' }}>

          {/* FROM */}
          <div style={{ position: 'relative' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>From</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '9px', height: '9px', borderRadius: '50%', background: 'var(--neon-green)', boxShadow: '0 0 6px var(--neon-green)', zIndex: 1 }} />
              <input className="input-field" style={{ paddingLeft: '32px' }}
                placeholder="Search station or area..."
                value={fromQuery}
                onChange={e => { setFromQuery(e.target.value); setShowFrom(true); setFromId(''); }}
                onFocus={() => setShowFrom(true)}
                onBlur={() => setTimeout(() => setShowFrom(false), 150)}
              />
            </div>
            {showFromDrop && fromQuery.length > 0 && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100,
                background: 'var(--bg-card)', border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)', overflow: 'hidden', marginTop: '4px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}>
                {filtered(fromQuery).map(loc => (
                  <div key={loc.id} onMouseDown={() => { setFromId(loc.id); setFromQuery(loc.name); setShowFrom(false); }}
                    style={{ padding: '10px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,245,255,0.06)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ fontSize: '16px' }}>{loc.type === 'metro' ? '🚇' : '📍'}</span>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>{loc.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {loc.area} · {loc.type === 'metro' ? `Metro · ${loc.line === 'purple' ? 'Purple Line' : loc.line === 'aqua' ? 'Aqua Line' : 'Both Lines'}` : 'Area / Landmark'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SWAP */}
          <button onClick={swap} style={{
            width: '44px', height: '44px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)',
            background: 'rgba(0,0,0,0.3)', color: 'var(--neon-cyan)', cursor: 'pointer',
            fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', alignSelf: 'flex-end',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--neon-cyan-dim)'; e.currentTarget.style.transform = 'rotate(180deg)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.3)'; e.currentTarget.style.transform = 'rotate(0deg)'; }}
          >⇄</button>

          {/* TO */}
          <div style={{ position: 'relative' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>To</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '9px', height: '9px', borderRadius: '3px', background: 'var(--neon-red)', boxShadow: '0 0 6px var(--neon-red)', zIndex: 1 }} />
              <input className="input-field" style={{ paddingLeft: '32px' }}
                placeholder="Search station or area..."
                value={toQuery}
                onChange={e => { setToQuery(e.target.value); setShowTo(true); setToId(''); }}
                onFocus={() => setShowTo(true)}
                onBlur={() => setTimeout(() => setShowTo(false), 150)}
              />
            </div>
            {showToDrop && toQuery.length > 0 && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100,
                background: 'var(--bg-card)', border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)', overflow: 'hidden', marginTop: '4px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}>
                {filtered(toQuery).map(loc => (
                  <div key={loc.id} onMouseDown={() => { setToId(loc.id); setToQuery(loc.name); setShowTo(false); }}
                    style={{ padding: '10px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,245,255,0.06)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ fontSize: '16px' }}>{loc.type === 'metro' ? '🚇' : '📍'}</span>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>{loc.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {loc.area} · {loc.type === 'metro' ? `Metro · ${loc.line === 'purple' ? 'Purple Line' : loc.line === 'aqua' ? 'Aqua Line' : 'Both Lines'}` : 'Area / Landmark'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SEARCH BTN */}
          <button className="btn-primary"
            onClick={search}
            disabled={!fromId || !toId || fromId === toId}
            style={{ padding: '12px 28px', alignSelf: 'flex-end', opacity: (!fromId || !toId || fromId === toId) ? 0.5 : 1 }}
          >
            Find Routes
          </button>
        </div>

        {/* Depart time + mode filter */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Depart:</span>
          {['now', 'morning', 'evening'].map(d => (
            <button key={d} onClick={() => setDepartMode(d)} style={{
              padding: '6px 14px', borderRadius: '20px', border: `1px solid ${departMode === d ? 'var(--neon-cyan)' : 'var(--border-subtle)'}`,
              background: departMode === d ? 'var(--neon-cyan-dim)' : 'transparent',
              color: departMode === d ? 'var(--neon-cyan)' : 'var(--text-muted)',
              fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s',
            }}>
              {d === 'now' ? '🕐 Now' : d === 'morning' ? '🌅 9:00 AM' : '🌆 6:00 PM'}
            </button>
          ))}
          <div style={{ width: '1px', height: '20px', background: 'var(--border-subtle)' }} />
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Prefer:</span>
          {[['all','All Modes'],['metro','Metro'],['bus','Bus'],['cab','Cab']].map(([v,l]) => (
            <button key={v} onClick={() => setPrefMode(v)} style={{
              padding: '6px 14px', borderRadius: '20px', border: `1px solid ${prefMode === v ? 'var(--neon-cyan)' : 'var(--border-subtle)'}`,
              background: prefMode === v ? 'var(--neon-cyan-dim)' : 'transparent',
              color: prefMode === v ? 'var(--neon-cyan)' : 'var(--text-muted)',
              fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s',
            }}>{l}</button>
          ))}
        </div>
      </div>

      {/* ── Quick Popular Routes ── */}
      {!searched && (
        <div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px', fontFamily: 'Orbitron, monospace', letterSpacing: '0.1em' }}>POPULAR ROUTES</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
            {[
              { from: 'shivajinagar', fromQ: 'Shivaji Nagar',        to: 'swargate',     toQ: 'Swargate',             tag: 'Metro · 5 stops' },
              { from: 'vanaz',        fromQ: 'Vanaz',                 to: 'ramwadi',      toQ: 'Ramwadi',              tag: 'Aqua Line · 14 stops' },
              { from: 'pcmc',         fromQ: 'PCMC Bhavan',           to: 'civil-court',  toQ: 'Civil Court',          tag: 'Purple Line · 10 stops' },
              { from: 'deccan',       fromQ: 'Deccan Gymkhana',       to: 'pune-railway', toQ: 'Pune Railway Station', tag: 'Aqua Line · 4 stops' },
              { from: 'kothrud',      fromQ: 'Kothrud',               to: 'hinjewadi',    toQ: 'Hinjewadi IT Park',    tag: 'Bus · Route 50' },
              { from: 'coep',         fromQ: 'COEP Technological',    to: 'hadapsar',     toQ: 'Hadapsar',             tag: 'Bus · Route 11' },
            ].map((r, i) => (
              <button key={i}
                onClick={() => { setFromId(r.from); setFromQuery(r.fromQ); setToId(r.to); setToQuery(r.toQ); }}
                style={{
                  padding: '14px 16px', borderRadius: 'var(--radius-md)', textAlign: 'left',
                  background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-subtle)',
                  cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Space Grotesk, sans-serif',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--neon-cyan)'; e.currentTarget.style.background = 'rgba(0,245,255,0.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.background = 'rgba(0,0,0,0.2)'; }}
              >
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '3px' }}>
                  {r.fromQ} → {r.toQ}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--neon-cyan)' }}>{r.tag}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Results ── */}
      {searched && routes.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '20px', alignItems: 'start', animation: 'fade-in 0.4s ease' }}>

          {/* Left: Route Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              {filteredRoutes.length} route{filteredRoutes.length !== 1 ? 's' : ''} found · {fromLoc?.name} → {toLoc?.name}
            </div>

            {(filteredRoutes.length ? filteredRoutes : routes).map((route, i) => (
              <div key={route.id} onClick={() => setSelected(routes.indexOf(route))}
                style={{
                  padding: '16px 18px', borderRadius: 'var(--radius-lg)', cursor: 'pointer',
                  border: `2px solid ${selectedRoute === routes.indexOf(route) ? route.tagColor : 'var(--border-subtle)'}`,
                  background: selectedRoute === routes.indexOf(route) ? `${route.tagColor}08` : 'rgba(0,0,0,0.2)',
                  transition: 'all 0.2s ease', position: 'relative',
                }}
              >
                {/* Tag */}
                <div style={{
                  position: 'absolute', top: '-10px', left: '14px',
                  padding: '3px 10px', borderRadius: '10px',
                  background: route.tagColor, color: '#000',
                  fontSize: '10px', fontWeight: '800', letterSpacing: '0.05em',
                }}>{route.tag}</div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', marginTop: '4px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>{route.label}</div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '18px', fontWeight: '800', color: route.tagColor }}>
                      {route.totalTime} min
                    </div>
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '14px', color: '#00ff88' }}>₹{route.totalFare}</div>
                  </div>
                </div>

                {/* Mode pills */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                  {route.steps.filter(s => s.mode !== 'Interchange' && s.mode !== 'Walk').map((step, si) => (
                    <span key={si} style={{
                      padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600',
                      background: `${step.color}15`, color: step.color, border: `1px solid ${step.color}30`,
                    }}>
                      {step.icon} {step.label}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '14px', fontSize: '11px', color: 'var(--text-muted)' }}>
                  <span>🌿 {route.co2} kg CO₂</span>
                  <span>🔄 {route.transfers} transfer{route.transfers !== 1 ? 's' : ''}</span>
                  {route.totalFare < 50 && <span>💳 Smart card saves ₹{Math.round(route.totalFare * 0.1)}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Step Detail */}
          {activeRoute && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', animation: 'slide-up 0.3s ease' }}>

              {/* Summary Bar */}
              <div style={{
                padding: '18px 24px', borderRadius: 'var(--radius-lg)',
                background: `${activeRoute.tagColor}0d`,
                border: `1px solid ${activeRoute.tagColor}40`,
                display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                    {activeRoute.label} · {activeRoute.tag}
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {fromLoc?.name} → {toLoc?.name}
                  </div>
                </div>
                {[
                  { label: 'Total Time', value: `${activeRoute.totalTime} min`, color: activeRoute.tagColor },
                  { label: 'Total Fare', value: `₹${activeRoute.totalFare}`,   color: '#00ff88' },
                  { label: 'Transfers',  value: `${activeRoute.transfers}`,      color: 'var(--text-secondary)' },
                  { label: 'CO₂',        value: `${activeRoute.co2} kg`,         color: '#00ff88' },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>{s.label}</div>
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '18px', fontWeight: '800', color: s.color }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Step-by-Step */}
              <div className="glass-card" style={{ padding: '24px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Orbitron, monospace', fontWeight: '400' }}>
                  Step-by-Step Directions
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {activeRoute.steps.map((step, i) => {
                    const isLast = i === activeRoute.steps.length - 1;
                    return (
                      <div key={i} style={{ display: 'flex', gap: '16px' }}>
                        {/* Timeline */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '48px', flexShrink: 0 }}>
                          <div style={{
                            width: '48px', height: '48px', borderRadius: 'var(--radius-md)',
                            background: `${step.color}15`, border: `1px solid ${step.color}40`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '22px', flexShrink: 0, zIndex: 1,
                          }}>{step.icon}</div>
                          {!isLast && <div style={{ width: '2px', flex: 1, background: `linear-gradient(${step.color}80, ${activeRoute.steps[i+1].color}80)`, margin: '3px 0', minHeight: '20px' }} />}
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, paddingBottom: isLast ? '0' : '20px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>{step.label}</div>
                              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>{step.desc}</div>
                            </div>
                            {step.time > 0 && (
                              <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '12px' }}>
                                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '16px', fontWeight: '700', color: step.color }}>
                                  {step.time} min
                                </div>
                                {step.fare > 0 && (
                                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '13px', color: '#00ff88' }}>₹{step.fare}</div>
                                )}
                                {step.fare === 0 && step.mode !== 'Walk' && (
                                  <div style={{ fontSize: '11px', color: 'var(--neon-green)', marginTop: '2px' }}>FREE</div>
                                )}
                              </div>
                            )}
                          </div>
                          <div style={{
                            fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px',
                            padding: '6px 10px', borderRadius: '6px',
                            background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-subtle)',
                            display: 'inline-block',
                          }}>
                            ℹ {step.detail}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Actions */}
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button className="btn-primary" style={{ fontSize: '13px', padding: '10px 22px' }}>
                    🎫 Book Now · ₹{activeRoute.totalFare}
                  </button>
                  {activeRoute.steps.some(s => s.mode === 'Metro') && (
                    <button className="btn-ghost" style={{ fontSize: '13px', padding: '10px 18px' }}>
                      💳 Smart Card · ₹{Math.round(activeRoute.totalFare * 0.9)}
                    </button>
                  )}
                  <button className="btn-ghost" style={{ fontSize: '13px', padding: '10px 18px' }}>
                    📤 Share Route
                  </button>
                </div>

                {/* Tips */}
                <div style={{ marginTop: '14px', padding: '12px 14px', borderRadius: 'var(--radius-md)', background: 'rgba(0,102,255,0.06)', border: '1px solid rgba(0,102,255,0.2)', display: 'flex', gap: '10px' }}>
                  <span style={{ fontSize: '18px', flexShrink: 0 }}>🤖</span>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <strong style={{ color: 'var(--neon-blue)' }}>AI Tip:</strong>{' '}
                    {activeRoute.steps.some(s => s.mode === 'Metro')
                      ? `Metro runs every 8–10 min during peak hours. Civil Court is the only interchange between Purple and Aqua lines. Smart Card saves 10% on every trip.`
                      : activeRoute.steps.some(s => s.mode === 'Bus')
                      ? `PMPL buses run 6:00 AM – 10:00 PM. Carry exact change or use Chalo app for QR ticketing. Avoid peak hours (8–10 AM, 5–8 PM) for faster journeys.`
                      : `Cab fares vary with demand — off-peak hours (10 AM–5 PM) typically have lower fares. Book via app for transparent pricing.`
                    }
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── PMPL Key Routes Info ── */}
      {!searched && (
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', fontFamily: 'Orbitron, monospace', letterSpacing: '0.08em' }}>KEY PMPL BUS ROUTES</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px' }}>
            {PMPL_ROUTES.slice(0, 8).map(r => (
              <div key={r.no} style={{ padding: '14px', borderRadius: 'var(--radius-md)', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,183,0,0.12)',
                    border: '1px solid rgba(255,183,0,0.3)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontFamily: 'Orbitron, monospace', fontSize: '11px',
                    fontWeight: '700', color: '#ffb700', flexShrink: 0,
                  }}>{r.no}</div>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--neon-amber)' }}>Every {r.freq}</div>
                </div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '2px', lineHeight: 1.3 }}>
                  {r.from} → {r.to}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', lineHeight: 1.4 }}>Via {r.via}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#00ff88', fontFamily: 'Orbitron, monospace' }}>₹{r.fare}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>~{r.time} min</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
