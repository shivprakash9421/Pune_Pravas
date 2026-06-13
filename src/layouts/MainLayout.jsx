import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const NAV_ITEMS = [
  { path: '/', icon: '⬡', label: 'Home', glyph: 'home' },
  { path: '/cab', icon: '◈', label: 'Cab Auto', glyph: 'cab' },
  { path: '/metro', icon: '⬟', label: 'Metro', glyph: 'metro' },
  { path: '/pmpl', icon: '⬡', label: 'PMPL Bus', glyph: 'bus' },
  { path: '/local', icon: '🚆', label: 'Local Trains', glyph: 'metro' },
  { path: '/route-planner', icon: '◉', label: 'Route Planner', glyph: 'route' },
  { path: '/tickets', icon: '◈', label: 'Tickets', glyph: 'tickets' },
  { path: '/parking', icon: '⬟', label: 'Parking', glyph: 'parking' },
  { path: '/wallet', icon: '◈', label: 'Wallet', glyph: 'wallet' },
  { path: '/ai-chat', icon: '◉', label: 'AI Assistant', glyph: 'ai', accent: true },
  { path: '/profile', icon: '⬡', label: 'Profile', glyph: 'profile' },
];

const ICONS = {
  home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>,
  cab: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3v-5l2-5h14l2 5v5h-2M5 17a2 2 0 004 0M15 17a2 2 0 004 0"/><path d="M5 12h14"/></svg>,
  metro: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="13" rx="2"/><path d="M8 16v3m8-3v3M4 9h16M9 3v6m6-6v6"/></svg>,
  bus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 16V6a2 2 0 012-2h12a2 2 0 012 2v10l-2 2H6l-2-2z"/><path d="M4 12h16M9 18v2m6-2v2m-6-6h.01M15 12h.01"/></svg>,
  route: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M6 8v3a3 3 0 003 3h6a3 3 0 013 3v1"/></svg>,
  tickets: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 010-6h20a3 3 0 010 6m0 6a3 3 0 000 6H2a3 3 0 000-6"/><path d="M2 12h20M6 9v6M18 9v6"/></svg>,
  parking: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 010 6H9"/></svg>,
  wallet: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-5"/><path d="M16 12h5v4h-5a2 2 0 010-4z"/><circle cx="18" cy="14" r="1"/></svg>,
  ai: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 015 5v3a5 5 0 01-10 0V7a5 5 0 015-5z"/><path d="M9 10a3 3 0 006 0"/><path d="M8 21l1-5m6 5l-1-5m-4 0h4"/></svg>,
  profile: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  bell: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  menu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
};

export default function MainLayout({ children }) {
  const location = useLocation();
  const { user, unreadCount } = useApp();
  
  // Hardcoded layout constants for stability
  const SIDEBAR_EXPANDED = '260px';
  const SIDEBAR_COLLAPSED = '76px';
  const NAV_HEIGHT = '70px';

  // State
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Handle mobile screen sizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
        setSidebarOpen(false);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#060d1f', position: 'relative', overflow: 'hidden' }}>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 40 }} 
        />
      )}

      {/* ─── Sidebar ─── */}
      <aside style={{
        width: sidebarOpen ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED,
        minHeight: '100vh',
        background: 'rgba(6,13,31,0.95)',
        borderRight: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s ease',
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        zIndex: 50,
        overflowX: 'hidden',
        backdropFilter: 'blur(20px)',
        transform: isMobile && !sidebarOpen ? `translateX(-${SIDEBAR_EXPANDED})` : 'translateX(0)',
      }}>
        
        {/* Logo Area */}
        <div style={{
          padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', gap: '12px', minHeight: NAV_HEIGHT,
        }}>
          <div style={{
            width: '40px', height: '40px', flexShrink: 0,
            background: 'linear-gradient(135deg, #00f5ff, #0066ff)', borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', fontWeight: '800', color: '#000', fontFamily: 'Orbitron, monospace',
            boxShadow: '0 0 20px rgba(0,245,255,0.4)',
          }}>P</div>
          
          {sidebarOpen && (
            <div style={{ opacity: sidebarOpen ? 1 : 0, transition: 'opacity 0.2s' }}>
              <div style={{ fontFamily: 'Orbitron, monospace', fontWeight: '800', fontSize: '15px', color: '#00f5ff', letterSpacing: '0.1em', lineHeight: 1.2, textTransform: 'uppercase' }}>PUNE</div>
              <div style={{ fontFamily: 'Orbitron, monospace', fontWeight: '500', fontSize: '11px', color: '#94a3b8', letterSpacing: '0.2em', textTransform: 'uppercase' }}>PRAVAS</div>
            </div>
          )}

          {!isMobile && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                marginLeft: 'auto', background: 'transparent', border: 'none',
                color: '#94a3b8', cursor: 'pointer', padding: '4px',
                display: 'flex', flexShrink: 0, transition: 'color 0.2s',
              }}
            >
              <div style={{ width: '20px', height: '20px' }}>{ICONS.menu}</div>
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto', overflowX: 'hidden' }}>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path} to={item.path}
                onClick={() => isMobile && setSidebarOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '16px', padding: '12px',
                  borderRadius: '10px', marginBottom: '6px', textDecoration: 'none',
                  color: active ? '#00f5ff' : item.accent ? '#8b5cf6' : '#94a3b8',
                  background: active ? 'linear-gradient(90deg, rgba(0,245,255,0.12), rgba(0,102,255,0.06))' : 'transparent',
                  borderLeft: active ? '3px solid #00f5ff' : '3px solid transparent',
                  transition: 'all 0.2s ease', whiteSpace: 'nowrap',
                }}
              >
                <div style={{ width: '20px', height: '20px', flexShrink: 0 }}>{ICONS[item.glyph]}</div>
                {sidebarOpen && <span style={{ fontSize: '14px', fontWeight: active ? '600' : '500' }}>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px', height: '38px', flexShrink: 0, borderRadius: '50%',
            background: 'linear-gradient(135deg, #00f5ff, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', fontWeight: '700', color: '#000', border: '2px solid rgba(255,255,255,0.1)',
          }}>
            {user?.name?.[0] || 'U'}
          </div>
          {sidebarOpen && (
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name || 'User'}</div>
              <div style={{ fontSize: '11px', color: '#00f5ff' }}>{user?.tier || 'Pro'} Member</div>
            </div>
          )}
        </div>
      </aside>

      {/* ─── Main Content Area ─── */}
      <div style={{
        flex: 1,
        marginLeft: isMobile ? 0 : (sidebarOpen ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED),
        transition: 'margin-left 0.3s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column', minHeight: '100vh',
        position: 'relative', zIndex: 1,
      }}>
        
        {/* Top Header Bar */}
        <header style={{
          height: NAV_HEIGHT, background: 'rgba(6,13,31,0.9)',
          borderBottom: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', padding: '0 24px', gap: '20px',
          position: 'sticky', top: 0, zIndex: 30,
        }}>
          
          {/* Header Toggle (Crucial for mobile, handy for desktop) */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'transparent', border: 'none', color: '#fff',
              cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center'
            }}
          >
            <div style={{ width: '24px', height: '24px' }}>{ICONS.menu}</div>
          </button>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'Orbitron, monospace', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Pune Pravas
            </div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>
              {NAV_ITEMS.find(n => n.path === location.pathname)?.label || 'Dashboard'}
            </div>
          </div>

          {/* Status & Wallet */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '20px', background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 8px #00ff88', animation: 'pulse-glow 2s infinite' }} />
            <span style={{ fontSize: '13px', color: '#00ff88', fontWeight: '600' }}>Live</span>
          </div>

          <div style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.2)', fontSize: '14px', fontWeight: '700', color: '#00f5ff' }}>
            ₹{user?.balance?.toFixed(0) || 1241}
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}