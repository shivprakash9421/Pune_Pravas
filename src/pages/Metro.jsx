import React, { useState, useEffect } from 'react';

// ─── REAL DATA ───────────────────────────────────────────

const PURPLE_LINE = [
  { id: 'pcmc',        name: 'PCMC Bhavan',              marathi: 'पिंपरी-चिंचवड महानगरपालिका भवन', type: 'elevated',   parking: true,  food: true,  interchange: false },
  { id: 'sant',        name: 'Sant Tukaram Nagar',        marathi: 'संत तुकाराम नगर',                type: 'elevated',   parking: false, food: false, interchange: false },
  { id: 'nashik',      name: 'Nashik Phata',              marathi: 'नाशिक फाटा',                    type: 'elevated',   parking: true,  food: false, interchange: false },
  { id: 'kasarwadi',   name: 'Kasarwadi',                 marathi: 'कासारवाडी',                      type: 'elevated',   parking: true,  food: false, interchange: false },
  { id: 'phugewadi',   name: 'Phugewadi',                 marathi: 'फुगेवाडी',                       type: 'elevated',   parking: false, food: false, interchange: false },
  { id: 'dapodi',      name: 'Dapodi',                    marathi: 'दापोडी',                        type: 'elevated',   parking: true,  food: false, interchange: false },
  { id: 'bopodi',      name: 'Bopodi',                    marathi: 'बोपोडी',                        type: 'elevated',   parking: true,  food: false, interchange: false },
  { id: 'khadki',      name: 'Khadki',                    marathi: 'खडकी',                          type: 'elevated',   parking: false, food: false, interchange: false },
  { id: 'range-hills', name: 'Range Hills',               marathi: 'रेंज हिल्स',                    type: 'elevated',   parking: false, food: false, interchange: false },
  { id: 'shivajinagar',name: 'Shivaji Nagar',             marathi: 'शिवाजी नगर',                    type: 'underground',parking: false, food: true,  interchange: false },
  { id: 'civil-court', name: 'Civil Court',               marathi: 'जिल्हा न्यायालय',               type: 'underground',parking: false, food: true,  interchange: true  },
  { id: 'kasba-peth',  name: 'Kasba Peth',                marathi: 'कसबा पेठ',                      type: 'underground',parking: false, food: false, interchange: false },
  { id: 'mandai',      name: 'Mandai',                    marathi: 'मंडई',                          type: 'underground',parking: false, food: false, interchange: false },
  { id: 'swargate',    name: 'Swargate',                  marathi: 'स्वारगेट',                      type: 'underground',parking: true,  food: true,  interchange: false },
];

const AQUA_LINE = [
  { id: 'vanaz',          name: 'Vanaz',                        marathi: 'वनाझ',                          type: 'elevated',   parking: true,  food: false, interchange: false },
  { id: 'anand-nagar',    name: 'Anand Nagar',                  marathi: 'आनंद नगर',                      type: 'elevated',   parking: false, food: false, interchange: false },
  { id: 'ideal-colony',   name: 'Ideal Colony',                 marathi: 'आयडियल कॉलनी',                  type: 'elevated',   parking: false, food: false, interchange: false },
  { id: 'nal-stop',       name: 'Nal Stop',                     marathi: 'नळ स्टॉप',                      type: 'elevated',   parking: false, food: false, interchange: false },
  { id: 'garware',        name: 'Garware College',              marathi: 'गरवारे महाविद्यालय',             type: 'elevated',   parking: false, food: false, interchange: false },
  { id: 'deccan',         name: 'Deccan Gymkhana',              marathi: 'डेक्कन जिमखाना',                type: 'elevated',   parking: false, food: false, interchange: false },
  { id: 'sambhaji',       name: 'Chhatrapati Sambhaji Udyan',   marathi: 'छत्रपती संभाजी उद्यान',         type: 'elevated',   parking: false, food: false, interchange: false },
  { id: 'pmc-bhavan',     name: 'PMC Bhavan',                   marathi: 'पुणे महानगरपालिका भवन',          type: 'elevated',   parking: false, food: false, interchange: false },
  { id: 'mangalwar',      name: 'Mangalwar Peth',               marathi: 'मंगळवार पेठ',                  type: 'elevated',   parking: false, food: false, interchange: false },
  { id: 'pune-railway',   name: 'Pune Railway Station',         marathi: 'पुणे रेल्वे स्थानक',            type: 'elevated',   parking: false, food: false, interchange: false },
  { id: 'ruby-hall',      name: 'Ruby Hall Clinic',             marathi: 'रुबी हॉल क्लिनिक',             type: 'elevated',   parking: false, food: false, interchange: false },
  { id: 'bund-garden',    name: 'Bund Garden',                  marathi: 'बंड गार्डन',                    type: 'elevated',   parking: false, food: false, interchange: false },
  { id: 'yerwada',        name: 'Yerwada',                      marathi: 'येरवडा',                        type: 'elevated',   parking: false, food: false, interchange: false },
  { id: 'kalyani-nagar',  name: 'Kalyani Nagar',                marathi: 'कल्याणी नगर',                  type: 'elevated',   parking: false, food: false, interchange: false },
  { id: 'ramwadi',        name: 'Ramwadi',                      marathi: 'रामवाडी',                       type: 'elevated',   parking: true,  food: true,  interchange: false },
];

const ALL_STATIONS = [...PURPLE_LINE, ...AQUA_LINE];

function calcFareByStops(stops) {
  if (stops === 0) return 0;
  if (stops <= 2) return 10;
  if (stops <= 4) return 15;
  if (stops <= 6) return 20;
  if (stops <= 8) return 25;
  if (stops <= 10) return 30;
  return 35;
}

// Multi-line aware routing function
function calculateRouteDetails(fromId, toId) {
  const fromPurple = PURPLE_LINE.find(s => s.id === fromId);
  const fromAqua = AQUA_LINE.find(s => s.id === fromId);
  const toPurple = PURPLE_LINE.find(s => s.id === toId);
  const toAqua = AQUA_LINE.find(s => s.id === toId);

  let path = [];
  let lineName = '';
  let lineColor = '';

  if (fromPurple && toPurple) {
    const fi = PURPLE_LINE.findIndex(s => s.id === fromId);
    const ti = PURPLE_LINE.findIndex(s => s.id === toId);
    path = PURPLE_LINE.slice(Math.min(fi, ti), Math.max(fi, ti) + 1);
    if (fi > ti) path.reverse();
    lineName = 'Purple Line';
    lineColor = '#8b5cf6';
  } else if (fromAqua && toAqua) {
    const fi = AQUA_LINE.findIndex(s => s.id === fromId);
    const ti = AQUA_LINE.findIndex(s => s.id === toId);
    path = AQUA_LINE.slice(Math.min(fi, ti), Math.max(fi, ti) + 1);
    if (fi > ti) path.reverse();
    lineName = 'Aqua Line';
    lineColor = '#00b4d8';
  } else {
    const isFromPurple = !!fromPurple;
    const L1 = isFromPurple ? PURPLE_LINE : AQUA_LINE;
    const L2 = isFromPurple ? AQUA_LINE : PURPLE_LINE;

    const fi = L1.findIndex(s => s.id === fromId);
    const i1 = L1.findIndex(s => s.id === 'civil-court');
    const i2 = L2.findIndex(s => s.id === 'civil-court');
    const ti = L2.findIndex(s => s.id === toId);

    let path1 = L1.slice(Math.min(fi, i1), Math.max(fi, i1) + 1);
    if (fi > i1) path1.reverse();

    let path2 = L2.slice(Math.min(i2, ti), Math.max(i2, ti) + 1);
    if (i2 > ti) path2.reverse();

    path2.shift(); // Remove duplicate Civil Court

    path = [...path1, ...path2];
    lineName = 'Multi-Line (via Civil Court)';
    lineColor = '#ffb700'; 
  }

  const stops = path.length - 1;
  const timeEst = Math.round(stops * 1.75) + (lineName.includes('Multi') ? 5 : 0);
  const fare = calcFareByStops(stops);

  return { from: path[0], to: path[path.length - 1], fare, time: timeEst, stops, path, line: lineName, lineColor };
}

const PASSES = [
  { name: 'Day Pass',        price: '₹100',  desc: 'Unlimited travel · 1 line · 24 hrs',      color: '#00f5ff' },
  { name: 'Purple Monthly',  price: '₹1,500',desc: 'Unlimited · Purple Line · 30 days',       color: '#8b5cf6', popular: true },
  { name: 'Aqua Monthly',    price: '₹1,200',desc: 'Unlimited · Aqua Line · 30 days',         color: '#00f5ff' },
  { name: 'Smart Card',      price: '₹100',  desc: '10% off every ride · Refundable deposit', color: '#00ff88' },
  { name: 'Senior Citizen',  price: '50% off',desc: '60+ age · Valid ID required',            color: '#ffb700' },
];

const FARE_TABLE = [
  { range: '1–2 stops',  km: '~1–3 km',  fare: '₹10' },
  { range: '3–4 stops',  km: '~4–6 km',  fare: '₹15' },
  { range: '5–6 stops',  km: '~7–9 km',  fare: '₹20' },
  { range: '7–8 stops',  km: '~10–12 km',fare: '₹25' },
  { range: '9–10 stops', km: '~13–15 km',fare: '₹30' },
  { range: '11+ stops',  km: '15+ km',   fare: '₹35' },
];

const FAQ = [
  { q: 'Operating hours?',               a: '6:00 AM – 10:00 PM daily, including Sundays and public holidays.' },
  { q: 'Peak hour frequency?',           a: 'Every 8–10 minutes during peak hours. 12–15 minutes off-peak.' },
  { q: 'Interchange station?',           a: 'Civil Court is the only interchange between Purple & Aqua lines. Free if completed within 30 minutes.' },
  { q: 'Smart card discount?',           a: '10% off all rides. Purchase and recharge at any station (min ₹100, max ₹3,000 balance).' },
  { q: 'Women\'s coach?',                a: 'Coach 1 is reserved exclusively for women at all times.' },
  { q: 'Luggage limit?',                 a: 'Up to 15 kg per person. No extra charges within limit.' },
  { q: 'Wheelchair accessible?',         a: 'All stations have ramps, wide gates, and elevators on every level.' },
  { q: 'Parking at stations?',           a: '₹20/day for 2-wheelers, ₹40/day for 4-wheelers at select stations.' },
  { q: 'Can I get a refund?',            a: 'Unused tokens non-refundable. Smart card balance refunded minus ₹50 processing fee.' },
  { q: 'Helpline?',                      a: '1800 270 5501 (toll-free) | Emergency: 112 | Email: customercare.pmrp@mahametro.org' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Metro() {
  const [tab, setTab] = useState('planner');
  const [selectedLine, setSelectedLine] = useState(1);
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [routeResult, setRouteResult] = useState(null);
  const [stationSearch, setStationSearch] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [time, setTime] = useState(new Date());
  
  // Modals state
  const [ticketModal, setTicketModal] = useState(null);
  const [paymentModal, setPaymentModal] = useState(null);
  const [paymentStep, setPaymentStep] = useState('select'); // 'select', 'processing', 'success'
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const lineColor = selectedLine === 1 ? '#8b5cf6' : '#00b4d8';

  const hour = time.getHours();
  const isOperating = hour >= 6 && hour < 22;
  const nextEvent = isOperating
    ? `Last train at 10:00 PM · ${22 - hour - 1}h ${60 - time.getMinutes()}m remaining`
    : 'Opens at 6:00 AM';

  function handleFindRoute() {
    if (!fromStation || !toStation || fromStation === toStation) return;
    const res = calculateRouteDetails(fromStation, toStation);
    setRouteResult(res);
    setTab('planner');
  }

  // Handle opening the payment modal
  function initiatePayment(routeData, isSmartCard = false) {
    const finalFare = isSmartCard ? Math.round(routeData.fare * 0.9) : routeData.fare;
    setPaymentModal({ ...routeData, amountToPay: finalFare, isSmartCard });
    setPaymentStep('select');
  }

  // Handle the mock payment process
  function processPayment(methodName) {
    setSelectedPaymentMethod(methodName);
    setPaymentStep('processing');
    
    // Simulate API delay
    setTimeout(() => {
      setPaymentStep('success');
      
      // Auto-close payment and open ticket after success
      setTimeout(() => {
        setTicketModal(paymentModal);
        setPaymentModal(null);
        setPaymentStep('select'); // reset
      }, 1200);
    }, 2000);
  }

  const selectInputStyle = {
    cursor: 'pointer',
    fontSize: '16px',
    padding: '14px',
    colorScheme: 'dark',
    backgroundColor: '#13151a',
    color: '#ffffff',
    border: '1px solid #334155',
    borderRadius: '8px',
    outline: 'none'
  };

  const optionGroupStyle = { backgroundColor: '#0f111a', fontWeight: 'bold' };
  const optionStyle = { backgroundColor: '#13151a', color: '#e2e8f0', padding: '10px' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'Space Grotesk, sans-serif' }}>

      {/* ── Live Status Banner ── */}
      <div style={{
        padding: '20px 30px',
        borderRadius: 'var(--radius-lg)',
        background: isOperating
          ? 'linear-gradient(90deg, rgba(0,255,136,0.08), rgba(0,245,255,0.06))'
          : 'rgba(255,51,102,0.06)',
        border: `1px solid ${isOperating ? 'rgba(0,255,136,0.3)' : 'rgba(255,51,102,0.3)'}`,
        display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: isOperating ? 'var(--neon-green)' : 'var(--neon-red)', boxShadow: `0 0 10px ${isOperating ? 'var(--neon-green)' : 'var(--neon-red)'}`, animation: 'pulse-glow 2s infinite' }} />
          <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '18px', fontWeight: '800', letterSpacing: '1px', color: isOperating ? 'var(--neon-green)' : 'var(--neon-red)' }}>
            {isOperating ? 'METRO IN SERVICE' : 'METRO CLOSED'}
          </span>
        </div>
        <div style={{ height: '24px', width: '2px', background: 'var(--border-default)' }} />
        <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)' }}>
          <span>Time: {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
          <span style={{ color: 'var(--text-secondary)' }}>Status: {nextEvent}</span>
          <span style={{ color: 'var(--neon-amber)', fontWeight: '700' }}></span>
        </div>
      </div>

      {/* ── Line Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {[
          { line: 1, name: 'Purple Line', route: 'PCMC Bhavan ⇄ Swargate', color: '#8b5cf6', km: '17.4 km', stations: 14, time: '~35 min' },
          { line: 2, name: 'Aqua Line',   route: 'Vanaz ⇄ Ramwadi',        color: '#00b4d8', km: '11.4 km', stations: 16, time: '~25 min' },
        ].map(l => {
          const isSelected = selectedLine === l.line;
          return (
            <div key={l.line} onClick={() => setSelectedLine(l.line)} style={{
              padding: '24px 30px', borderRadius: 'var(--radius-lg)', cursor: 'pointer',
              border: `2px solid ${isSelected ? l.color : 'var(--border-subtle)'}`,
              background: isSelected ? l.color : 'rgba(0,0,0,0.2)',
              color: isSelected ? '#ffffff' : 'var(--text-primary)',
              transition: 'all 0.3s ease',
              boxShadow: isSelected ? `0 8px 24px ${l.color}40` : 'none'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <span style={{ fontFamily: 'Orbitron, monospace', fontWeight: '800', fontSize: '20px' }}>{l.name}</span>
                <span style={{ marginLeft: 'auto', fontSize: '13px', fontWeight: '700', background: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(0,255,136,0.1)', color: isSelected ? '#fff' : 'var(--neon-green)', padding: '4px 10px', borderRadius: '12px' }}>Active</span>
              </div>
              <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', opacity: 0.9 }}>{l.route}</div>
              <div style={{ display: 'flex', gap: '24px' }}>
                {[['Distance', l.km], ['Stations', `${l.stations}`], ['Time', l.time]].map(([label, val]) => (
                  <div key={val}>
                    <span style={{ fontSize: '13px', opacity: 0.8, marginRight: '6px' }}>{label}:</span>
                    <span style={{ fontSize: '15px', fontWeight: '700' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.4)', padding: '6px', borderRadius: 'var(--radius-md)', width: 'fit-content', border: '1px solid var(--border-subtle)' }}>
        {[
          { id: 'planner',  label: 'Journey Planner' },
          { id: 'stations', label: 'All Stations' },
          { id: 'fares',    label: 'Fares & Passes' },
          { id: 'faq',      label: 'FAQ' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '12px 24px', borderRadius: 'var(--radius-sm)', border: 'none',
            background: tab === t.id ? `${lineColor}33` : 'transparent',
            color: tab === t.id ? lineColor : 'var(--text-secondary)',
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: tab === t.id ? '700' : '500',
            fontSize: '15px', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
          }}>{t.label}</button>
        ))}
      </div>

      {/* ══ TAB: JOURNEY PLANNER ══ */}
      {tab === 'planner' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <div className="glass-card" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>From Station</label>
                <select className="input-field" value={fromStation} onChange={e => { setFromStation(e.target.value); setRouteResult(null); }} style={{ ...selectInputStyle, width: '100%' }}>
                  <option value="" style={optionStyle}>Select departure</option>
                  <optgroup label="Purple Line" style={{...optionGroupStyle, color: '#8b5cf6'}}>
                    {PURPLE_LINE.map(s => <option key={s.id} value={s.id} style={optionStyle}>{s.name} — {s.marathi}</option>)}
                  </optgroup>
                  <optgroup label="Aqua Line" style={{...optionGroupStyle, color: '#00b4d8'}}>
                    {AQUA_LINE.map(s => <option key={s.id} value={s.id} style={optionStyle}>{s.name} — {s.marathi}</option>)}
                  </optgroup>
                </select>
              </div>

              <button 
                onClick={() => { const tmp = fromStation; setFromStation(toStation); setToStation(tmp); setRouteResult(null); }}
                style={{
                  height: '52px', width: '52px', borderRadius: '12px', border: '1px solid #334155',
                  background: '#1e293b', color: '#38bdf8', cursor: 'pointer',
                  fontSize: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s', flexShrink: 0
                }}
                title="Swap origin and destination"
              >
                ⇄
              </button>

              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>To Station</label>
                <select className="input-field" value={toStation} onChange={e => { setToStation(e.target.value); setRouteResult(null); }} style={{ ...selectInputStyle, width: '100%' }}>
                  <option value="" style={optionStyle}>Select destination</option>
                  <optgroup label="Purple Line" style={{...optionGroupStyle, color: '#8b5cf6'}}>
                    {PURPLE_LINE.map(s => <option key={s.id} value={s.id} style={optionStyle}>{s.name} — {s.marathi}</option>)}
                  </optgroup>
                  <optgroup label="Aqua Line" style={{...optionGroupStyle, color: '#00b4d8'}}>
                    {AQUA_LINE.map(s => <option key={s.id} value={s.id} style={optionStyle}>{s.name} — {s.marathi}</option>)}
                  </optgroup>
                </select>
              </div>

              <button className="btn-primary" onClick={handleFindRoute} disabled={!fromStation || !toStation || fromStation === toStation}
                style={{ height: '52px', padding: '0 32px', fontSize: '16px', fontWeight: '700', opacity: (!fromStation || !toStation || fromStation === toStation) ? 0.5 : 1 }}>
                Find Route
              </button>
            </div>
          </div>

          {routeResult && (
            <div style={{ animation: 'slide-up 0.3s ease' }}>
              <div style={{
                padding: '24px 32px', borderRadius: 'var(--radius-lg)',
                background: `${routeResult.lineColor}15`, border: `1px solid ${routeResult.lineColor}50`,
                display: 'flex', gap: '40px', flexWrap: 'wrap', marginBottom: '20px', alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>Route Path</div>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)' }}>
                    {routeResult.from.name} → {routeResult.to.name}
                  </div>
                </div>
                {[
                  { label: 'Fare', value: `₹${routeResult.fare}`, color: '#00ff88' },
                  { label: 'Travel Time', value: `~${routeResult.time} min`, color: '#00f5ff' },
                  { label: 'Stops', value: `${routeResult.stops} stops`, color: routeResult.lineColor },
                ].map(item => (
                  <div key={item.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>{item.label}</div>
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '24px', fontWeight: '800', color: item.color }}>{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="glass-card" style={{ padding: '24px 30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ fontSize: '15px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Station Path
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '700', padding: '6px 12px', background: `${routeResult.lineColor}22`, color: routeResult.lineColor, borderRadius: '8px' }}>
                    {routeResult.line}
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {routeResult.path.map((station, i) => {
                    const isFirst = i === 0;
                    const isLast = i === routeResult.path.length - 1;
                    const isInterchange = station.id === 'civil-court' && routeResult.line.includes('Multi');
                    const nodeColor = isFirst ? 'var(--neon-green)' : isLast ? 'var(--neon-red)' : isInterchange ? '#ffb700' : `${routeResult.lineColor}99`;

                    return (
                      <div key={station.id} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '24px', flexShrink: 0 }}>
                          <div style={{
                            width: isFirst || isLast || isInterchange ? '22px' : '14px',
                            height: isFirst || isLast || isInterchange ? '22px' : '14px',
                            borderRadius: '50%', zIndex: 1, background: nodeColor,
                            border: `3px solid ${isFirst || isLast || isInterchange ? nodeColor : routeResult.lineColor}`,
                            boxShadow: (isFirst || isLast || isInterchange) ? `0 0 12px ${nodeColor}` : 'none',
                            marginTop: '2px',
                          }} />
                          {i < routeResult.path.length - 1 && (
                            <div style={{ width: '3px', flex: 1, background: `${routeResult.lineColor}60`, minHeight: '30px' }} />
                          )}
                        </div>
                        <div style={{ flex: 1, paddingBottom: i < routeResult.path.length - 1 ? '16px' : '0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '18px', fontWeight: isFirst || isLast || isInterchange ? '800' : '600', color: isFirst || isLast ? '#fff' : isInterchange ? '#ffb700' : 'var(--text-secondary)' }}>
                              {station.name}
                            </span>
                            {station.interchange && <span className="badge badge-amber" style={{ fontSize: '12px', padding: '4px 8px' }}>Interchange</span>}
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '2px' }}>{station.marathi}</div>
                        </div>
                        {(isFirst || isLast) && (
                          <div style={{ fontSize: '15px', color: isFirst ? 'var(--neon-green)' : 'var(--neon-red)', fontWeight: '700', flexShrink: 0 }}>
                            {isFirst ? 'Depart' : 'Arrive'}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '30px', display: 'flex', gap: '16px' }}>
                  <button className="btn-primary" onClick={() => initiatePayment(routeResult, false)} style={{ fontSize: '16px', fontWeight: '700', padding: '14px 28px' }}>Book Ticket ₹{routeResult.fare}</button>
                  <button className="btn-ghost" onClick={() => initiatePayment(routeResult, true)} style={{ fontSize: '16px', fontWeight: '700', padding: '14px 24px' }}>Use Smart Card ₹{Math.round(routeResult.fare * 0.9)}</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══ TAB: ALL STATIONS ══ */}
      {tab === 'stations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {fromStation && toStation && fromStation !== toStation && (
            <div style={{ 
              background: 'linear-gradient(90deg, rgba(139,92,246,0.15), rgba(0,180,216,0.15))', border: `1px solid ${lineColor}88`, 
              padding: '20px 30px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
              boxShadow: `0 8px 32px rgba(0,0,0,0.3)`
            }}>
              <div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600' }}>Journey Selected</div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>
                  {ALL_STATIONS.find(s => s.id === fromStation)?.name} <span style={{ color: lineColor }}>→</span> {ALL_STATIONS.find(s => s.id === toStation)?.name}
                </div>
              </div>
              <button onClick={handleFindRoute} style={{ background: '#fff', color: '#000', padding: '12px 24px', borderRadius: '8px', fontSize: '15px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>
                Calculate Route & Book
              </button>
            </div>
          )}

          <input className="input-field" style={{ maxWidth: '400px', fontSize: '16px', padding: '14px' }}
            placeholder="Search stations in English or मराठी..."
            value={stationSearch} onChange={e => setStationSearch(e.target.value)}
          />

          {[
            { line: 1, color: '#8b5cf6', name: 'Purple Line', route: 'PCMC Bhavan → Swargate', list: stationSearch ? PURPLE_LINE.filter(s => s.name.toLowerCase().includes(stationSearch.toLowerCase()) || s.marathi.includes(stationSearch)) : PURPLE_LINE },
            { line: 2, color: '#00b4d8', name: 'Aqua Line',   route: 'Vanaz → Ramwadi',        list: stationSearch ? AQUA_LINE.filter(s => s.name.toLowerCase().includes(stationSearch.toLowerCase()) || s.marathi.includes(stationSearch)) : AQUA_LINE },
          ].map(lineData => lineData.list.length > 0 && (
            <div key={lineData.line}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: lineData.color, boxShadow: `0 0 12px ${lineData.color}` }} />
                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '18px', fontWeight: '800', color: lineData.color }}>{lineData.name}</span>
                <span style={{ fontSize: '15px', color: 'var(--text-muted)', fontWeight: '600' }}>{lineData.route}</span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
                {lineData.list.map((station, i) => {
                  const isFrom = fromStation === station.id;
                  const isTo = toStation === station.id;

                  return (
                    <div key={station.id} className="glass-card" style={{
                      padding: '20px 24px',
                      border: station.interchange ? `1px solid #ffb70066` : undefined,
                      background: station.interchange ? 'rgba(255,183,0,0.06)' : undefined,
                      display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                        <div style={{
                          width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                          background: `${lineData.color}20`, border: `2px solid ${lineData.color}40`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: 'Orbitron, monospace', fontSize: '15px', fontWeight: '800', color: lineData.color,
                        }}>{i + 1}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>{station.name}</div>
                          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>{station.marathi}</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                        <button 
                          onClick={() => { setFromStation(station.id); setSelectedLine(lineData.line); }}
                          style={{ 
                            flex: 1, padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
                            background: isFrom ? lineData.color : `${lineData.color}15`, 
                            color: isFrom ? '#fff' : lineData.color, 
                            border: `1px solid ${isFrom ? lineData.color : `${lineData.color}50`}`
                          }}
                        >
                          {isFrom ? 'Selected Origin' : 'Set Origin'}
                        </button>
                        <button 
                          onClick={() => setToStation(station.id)}
                          style={{ 
                            flex: 1, padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
                            background: isTo ? lineData.color : 'rgba(255,255,255,0.05)', 
                            color: isTo ? '#fff' : 'var(--text-secondary)', 
                            border: `1px solid ${isTo ? lineData.color : 'var(--border-subtle)'}`
                          }}
                        >
                          {isTo ? 'Selected Dest' : 'Set Dest'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ══ TAB: FARES & PASSES ══ */}
      {tab === 'fares' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card" style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Official Fare Chart</h3>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Range: ₹10 – ₹35 · No peak surcharge · Children under 3 ft travel free
            </div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {FARE_TABLE.map(f => (
                <div key={f.range} style={{
                  padding: '20px 24px', borderRadius: 'var(--radius-md)', textAlign: 'center',
                  background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-subtle)', minWidth: '130px',
                }}>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '28px', fontWeight: '800', color: lineColor, marginBottom: '6px' }}>{f.fare}</div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>{f.range}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>{f.km}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '16px 20px', borderRadius: 'var(--radius-md)', background: 'rgba(255,183,0,0.08)', border: '1px solid rgba(255,183,0,0.3)', fontSize: '15px', fontWeight: '600', color: 'var(--neon-amber)' }}>
              Smart Card saves 10% on every ride. Purchase at any station for ₹100 deposit (fully refundable).
            </div>
          </div>

          <div>
            <div style={{ fontSize: '16px', color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'Orbitron, monospace', fontWeight: '600' }}>
              Passes & Subscriptions
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
              {PASSES.map(p => (
                <div key={p.name} className="glass-card" style={{
                  padding: '30px', position: 'relative', overflow: 'hidden',
                  border: `2px solid ${p.popular ? p.color + '88' : 'var(--border-subtle)'}`,
                  background: p.popular ? `${p.color}10` : undefined,
                }}>
                  {p.popular && (
                    <div style={{ position: 'absolute', top: '0', right: '20px', background: p.color, color: '#000', fontSize: '12px', fontWeight: '800', padding: '6px 16px', borderRadius: '0 0 10px 10px' }}>
                      BEST VALUE
                    </div>
                  )}
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '26px', fontWeight: '800', color: p.color, marginBottom: '8px' }}>{p.price}</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>{p.name}</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.4' }}>{p.desc}</div>
                  <button className="btn-ghost" style={{ width: '100%', fontSize: '15px', fontWeight: '700', padding: '12px', borderColor: p.color + '66', color: p.color }}>
                    Select {p.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ TAB: FAQ ══ */}
      {tab === 'faq' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '800px' }}>
          <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Real data sourced from Pune Metro Rail Corporation (PMRC)
          </div>
          {FAQ.map((item, i) => (
            <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${openFaq === i ? lineColor + '66' : 'var(--border-subtle)'}`,
              background: openFaq === i ? `${lineColor}08` : 'rgba(0,0,0,0.15)',
              cursor: 'pointer', overflow: 'hidden', transition: 'all 0.2s',
            }}>
              <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '16px', fontWeight: openFaq === i ? '700' : '600', color: openFaq === i ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                  {item.q}
                </span>
                <span style={{ fontSize: '24px', fontWeight: '300', color: lineColor, transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
              </div>
              {openFaq === i && (
                <div style={{ padding: '0 24px 20px', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, animation: 'fade-in 0.2s ease', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}

          <div style={{
            marginTop: '16px', padding: '24px 30px', borderRadius: 'var(--radius-lg)',
            background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-subtle)',
            display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center',
          }}>
            <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-muted)' }}>Need more help?</span>
            <a href="tel:18002705501" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: 'var(--radius-md)', background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)', color: 'var(--neon-green)', textDecoration: 'none', fontSize: '15px', fontWeight: '700' }}>
            </a>
            <a href="mailto:customercare.pmrp@mahametro.org" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: 'var(--radius-md)', background: 'rgba(0,245,255,0.1)', border: '1px solid var(--border-default)', color: 'var(--neon-cyan)', textDecoration: 'none', fontSize: '15px', fontWeight: '600' }}>
              Email Support
            </a>
          </div>
        </div>
      )}

      {/* ══ MOCK PAYMENT MODAL ══ */}
      {paymentModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div style={{
            background: '#1a1d24', borderRadius: '20px', width: '100%', maxWidth: '420px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)', border: '1px solid #334155',
            overflow: 'hidden', color: '#ffffff', animation: 'fade-in 0.2s ease-out'
          }}>
            {/* Header */}
            <div style={{ padding: '24px', borderBottom: '1px solid #334155', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', marginBottom: '8px' }}>
                Complete Payment
              </div>
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '36px', fontWeight: '800', color: paymentModal.isSmartCard ? '#ffb700' : '#00ff88' }}>
                ₹{paymentModal.amountToPay}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                {paymentModal.from.name} → {paymentModal.to.name}
              </div>
            </div>

            {/* Content Based on Step */}
            <div style={{ padding: '30px' }}>
              
              {/* Step 1: Select Method */}
              {paymentStep === 'select' && (
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px', color: '#e2e8f0' }}>Select Payment Method</div>
                  
                  {paymentModal.isSmartCard ? (
                    <button 
                      onClick={() => processPayment('Smart Card Wallet')}
                      style={{
                        width: '100%', padding: '16px', borderRadius: '12px', cursor: 'pointer',
                        background: '#2d2d2d', border: '1px solid #ffb700', color: '#fff',
                        display: 'flex', alignItems: 'center', gap: '16px', fontSize: '16px', fontWeight: '700',
                        marginBottom: '12px'
                      }}
                    >
                      <div style={{ width: '32px', height: '32px', background: '#ffb700', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '18px' }}>💳</div>
                      Pay via Smart Card Wallet
                    </button>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {/* Google Pay */}
                      <button onClick={() => processPayment('Google Pay')} style={{
                        width: '100%', padding: '16px', borderRadius: '12px', cursor: 'pointer',
                        background: '#ffffff', border: 'none', color: '#3c4043',
                        display: 'flex', alignItems: 'center', gap: '16px', fontSize: '16px', fontWeight: '700'
                      }}>
                        <div style={{ width: '32px', height: '32px', display: 'flex', gap: '2px', alignItems: 'center' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ea4335' }}/>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbc04' }}/>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34a853' }}/>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4285f4' }}/>
                        </div>
                        Google Pay
                      </button>

                      {/* PhonePe */}
                      <button onClick={() => processPayment('PhonePe')} style={{
                        width: '100%', padding: '16px', borderRadius: '12px', cursor: 'pointer',
                        background: '#5f259f', border: 'none', color: '#ffffff',
                        display: 'flex', alignItems: 'center', gap: '16px', fontSize: '16px', fontWeight: '700'
                      }}>
                        <div style={{ width: '32px', height: '32px', border: '2px solid #fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>पे</div>
                        PhonePe
                      </button>

                      {/* Paytm */}
                      <button onClick={() => processPayment('Paytm')} style={{
                        width: '100%', padding: '16px', borderRadius: '12px', cursor: 'pointer',
                        background: '#00b9f1', border: 'none', color: '#ffffff',
                        display: 'flex', alignItems: 'center', gap: '16px', fontSize: '16px', fontWeight: '700'
                      }}>
                        <div style={{ width: '32px', height: '32px', background: '#002970', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '12px' }}>Pay</div>
                        Paytm
                      </button>

                      {/* Other UPI */}
                      <button onClick={() => processPayment('Other UPI')} style={{
                        width: '100%', padding: '16px', borderRadius: '12px', cursor: 'pointer',
                        background: '#2d2d2d', border: '1px solid #4ade80', color: '#4ade80',
                        display: 'flex', alignItems: 'center', gap: '16px', fontSize: '16px', fontWeight: '700'
                      }}>
                        <div style={{ width: '32px', height: '32px', border: '2px solid #4ade80', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>UPI</div>
                        Other UPI Apps
                      </button>
                    </div>
                  )}

                  <button 
                    onClick={() => setPaymentModal(null)} 
                    style={{ width: '100%', padding: '16px', marginTop: '20px', background: 'transparent', color: '#94a3b8', border: 'none', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Step 2: Processing */}
              {paymentStep === 'processing' && (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ 
                    width: '60px', height: '60px', borderRadius: '50%', border: '4px solid #334155', borderTopColor: '#00f5ff',
                    margin: '0 auto 24px', animation: 'spin 1s linear infinite'
                  }} />
                  <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Processing Payment...</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>Securely connecting to {selectedPaymentMethod}</div>
                </div>
              )}

              {/* Step 3: Success */}
              {paymentStep === 'success' && (
                <div style={{ textAlign: 'center', padding: '40px 0', animation: 'scale-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
                  <div style={{ 
                    width: '80px', height: '80px', borderRadius: '50%', background: '#00ff88',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
                    boxShadow: '0 0 30px rgba(0, 255, 136, 0.4)'
                  }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: '#00ff88', marginBottom: '8px' }}>Payment Successful!</div>
                  <div style={{ fontSize: '15px', color: '#94a3b8' }}>Generating your Metro ticket...</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══ MOCK QR TICKET MODAL ══ */}
      {ticketModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div style={{
            background: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '380px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)', overflow: 'hidden', color: '#1a1a1a',
            animation: 'slide-up 0.3s ease'
          }}>
            <div style={{ background: '#ffb700', padding: '20px', textAlign: 'center', color: '#1a1a1a' }}>
              <h2 style={{ margin: 0, fontFamily: 'Orbitron, monospace', fontSize: '24px', fontWeight: '800', letterSpacing: '1px' }}>PUNE METRO</h2>
              <p style={{ margin: '4px 0 0', fontSize: '14px', fontWeight: '700', opacity: 0.9 }}>Digital QR Ticket</p>
            </div>
            
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', fontWeight: '700' }}>Origin</div>
                  <div style={{ fontSize: '18px', fontWeight: '800' }}>{ticketModal.from.name}</div>
                </div>
                <div style={{ padding: '0 10px', color: '#ffb700', fontSize: '24px', fontWeight: '800' }}>→</div>
                <div style={{ flex: 1, textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', fontWeight: '700' }}>Destination</div>
                  <div style={{ fontSize: '18px', fontWeight: '800' }}>{ticketModal.to.name}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <div style={{
                  width: '180px', height: '180px', background: '#fff', border: '2px solid #eee', borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundImage: 'repeating-linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%, #222), repeating-linear-gradient(45deg, #222 25%, #fff 25%, #fff 75%, #222 75%, #222)',
                  backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px'
                }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px', background: '#f8f9fa', padding: '16px', borderRadius: '12px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#666', fontWeight: '700' }}>Fare</div>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: '#ffb700' }}>₹{ticketModal.amountToPay || ticketModal.fare}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#666', fontWeight: '700' }}>Platform</div>
                  <div style={{ fontSize: '20px', fontWeight: '800' }}>{ticketModal.from.id === 'pcmc' || ticketModal.from.id === 'vanaz' ? '1' : '2'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#666', fontWeight: '700' }}>Date</div>
                  <div style={{ fontSize: '15px', fontWeight: '800' }}>{time.toLocaleDateString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#666', fontWeight: '700' }}>Time Issued</div>
                  <div style={{ fontSize: '15px', fontWeight: '800' }}>{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                </div>
              </div>

              <button 
                onClick={() => setTicketModal(null)} 
                style={{ width: '100%', padding: '16px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}
              >
                Close Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes scale-in { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}