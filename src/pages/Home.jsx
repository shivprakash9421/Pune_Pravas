import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PuneLiveMap from '../components/PuneLiveMap';

const QUICK_ACTIONS = [
  { label: 'Book Cab', detail: 'Nearby cars and autos', path: '/cab', icon: 'cab', color: '#22c1c3' },
  { label: 'Metro Pass', detail: 'Recharge and trips', path: '/metro', icon: 'metro', color: '#6d7df2' },
  { label: 'PMPL Bus', detail: 'Routes and arrivals', path: '/pmpl', icon: 'bus', color: '#42d3a7' },
  { label: 'Parking', detail: 'Live slot finder', path: '/parking', icon: 'parking', color: '#f5b84b' },
  { label: 'Route Plan', detail: 'Compare travel modes', path: '/route-planner', icon: 'route', color: '#ef6461' },
  { label: 'Local Trains', detail: 'Suburban schedule', path: '/local-trains', icon: 'train', color: '#8b79f6' },
];

const LIVE_DATA = [
  { label: 'Metro trains', value: '24', unit: 'active', trend: '+2 from last hour', color: '#6d7df2' },
  { label: 'PMPL buses', value: '142', unit: 'on route', trend: '-3 from last hour', color: '#42d3a7' },
  { label: 'Available cabs', value: '89', unit: 'nearby', trend: '+12 from last hour', color: '#22c1c3' },
  { label: 'Parking slots', value: '318', unit: 'free', trend: '-45 from last hour', color: '#f5b84b' },
];

const RECENT_TRIPS = [
  { id: 1, type: 'Metro', from: 'Swargate', to: 'Shivajinagar', time: '08:45 AM', fare: 'Rs 28', color: '#6d7df2' },
  { id: 2, type: 'Cab', from: 'FC Road', to: 'COEP', time: 'Yesterday', fare: 'Rs 65', color: '#22c1c3' },
  { id: 3, type: 'Bus', from: 'Deccan', to: 'Kothrud', time: '2 days ago', fare: 'Rs 18', color: '#42d3a7' },
];

const TICKERS = [
  'Metro Line 1 has a minor delay at Swargate station.',
  'PMPL Route 50 is running on schedule.',
  'Cab demand is high near Shivajinagar.',
  'Bund Garden parking has 45 open slots.',
  'Route suggestion: save 12 minutes with Bus 125.',
];

const ActionIcon = ({ name }) => {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' };
  const icons = {
    cab: <svg {...common}><path d="M5 17H3v-4.5L5.2 7h13.6L21 12.5V17h-2" /><path d="M7 17a2 2 0 1 0 0 .1M17 17a2 2 0 1 0 0 .1M5 12h14" /></svg>,
    metro: <svg {...common}><rect x="4" y="3" width="16" height="13" rx="2.5" /><path d="M8 16 6.5 20M16 16l1.5 4M8 8h8M9 12h.01M15 12h.01" /></svg>,
    bus: <svg {...common}><path d="M5 16V6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5V16l-2 2H7l-2-2Z" /><path d="M5 11h14M8 18v2M16 18v2M8.5 14h.01M15.5 14h.01" /></svg>,
    parking: <svg {...common}><rect x="4" y="4" width="16" height="16" rx="2.5" /><path d="M10 17V7h4a3 3 0 0 1 0 6h-4" /></svg>,
    route: <svg {...common}><circle cx="6" cy="6" r="2.2" /><circle cx="18" cy="18" r="2.2" /><path d="M6 8v3a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v1" /></svg>,
    ai: <svg {...common}><rect x="5" y="8" width="14" height="11" rx="3" /><path d="M9 8V5m6 3V5M9.5 13h.01M14.5 13h.01M10 16h4" /></svg>,
    train: <svg {...common}><rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16M12 3v8M8 19l-2 3M18 22l-2-3M8 15h.01M16 15h.01"/></svg>
  };
  return icons[name] || null;
};

export default function Home() {
  const { user } = useApp();
  const [time, setTime] = useState(new Date());
  const [tickerIdx, setTickerIdx] = useState(0);

  useEffect(() => {
    const clock = setInterval(() => setTime(new Date()), 1000);
    const ticker = setInterval(() => setTickerIdx((idx) => (idx + 1) % TICKERS.length), 4500);
    return () => {
      clearInterval(clock);
      clearInterval(ticker);
    };
  }, []);

  const formattedDate = time.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  // Safe fallback if user name is missing
  const firstName = user?.name ? user.name.split(' ')[0] : 'Explorer';

  return (
    <div className="home-page relative">
      <section className="hero-panel">
        <div className="hero-content">
          <div className="eyebrow">{formattedDate}</div>
          <h1 className="hero-title">Welcome back, {firstName}</h1>
          <p className="hero-copy">A cleaner view of Pune mobility: metro, PMPL, cabs, parking, and route planning in one place.</p>
          <div className="hero-actions">
            <Link to="/route-planner" className="btn-primary"><ActionIcon name="route" />Plan journey</Link>
            <Link to="/ai-chat" className="btn-secondary"><ActionIcon name="ai" />Ask MobilityAI</Link>
          </div>
        </div>
        <div className="hero-clock">
          <div className="clock-time">{time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</div>
          <div className="clock-label">Network live</div>
        </div>
      </section>

      <section className="ticker" aria-live="polite">
        <div className="ticker-label">Live update</div>
        <div className="ticker-text">{TICKERS[tickerIdx]}</div>
      </section>

      <section className="stats-grid" aria-label="Network status">
        {LIVE_DATA.map((item) => (
          <article className="stat-card" key={item.label}>
            <div className="stat-label">{item.label}</div>
            <div className="stat-value">
              <span className="stat-number" style={{ color: item.color }}>{item.value}</span>
              <span className="stat-unit">{item.unit}</span>
            </div>
            <div className="stat-trend">{item.trend}</div>
          </article>
        ))}
      </section>

      <section>
        <div className="section-head"><h2 className="section-title">Quick access</h2></div>
        <div className="quick-grid">
          {QUICK_ACTIONS.map((action) => (
            <Link key={action.path} to={action.path} className="action-card" style={{ '--action-color': action.color }}>
              <span className="action-icon"><ActionIcon name={action.icon} /></span>
              <span>
                <span className="action-label">{action.label}</span>
                <span className="action-meta">{action.detail}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="dashboard-grid">
        {/* Recent Trips Widget */}
        <article className="panel map-panel">
          <div className="section-head">
            <h2 className="section-title">Recent trips</h2>
            <Link to="/tickets" className="badge badge-cyan">View all</Link>
          </div>
          <div className="trip-list">
            {RECENT_TRIPS.map((trip) => (
              <div className="trip-row" key={trip.id}>
                <div className="trip-mode" style={{ '--mode-color': trip.color }}>{trip.type.charAt(0)}</div>
                <div>
                  <div className="trip-route">{trip.from} to {trip.to}</div>
                  <div className="trip-meta">{trip.time} | {trip.type}</div>
                </div>
                <div className="trip-fare">{trip.fare}<div className="trip-status">Done</div></div>
              </div>
            ))}
          </div>
        </article>

        {/* Real Mappls Live Map Component */}
        <PuneLiveMap />

      </section>

      {/* Floating AI Chat Button */}
      <Link 
        to="/ai-chat" 
        className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-transform hover:scale-110"
        style={{ 
          background: 'linear-gradient(135deg, #5a8dee, #8b79f6)', 
          color: '#ffffff',
          boxShadow: '0 8px 30px rgba(90, 141, 238, 0.4)'
        }}
        aria-label="Open AI Assistant"
      >
        <div className="w-8 h-8">
          <ActionIcon name="ai" />
        </div>
      </Link>
    </div>
  );
}