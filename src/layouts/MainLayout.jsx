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
  close: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

export default function MainLayout({ children }) {
  const location = useLocation();
  const { user, unreadCount } = useApp();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 820);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 820;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location.pathname, isMobile]);

  const sidebarWidth = isMobile ? '280px' : isDesktopCollapsed ? '76px' : '260px';
  const marginLeft = isMobile ? '0px' : isDesktopCollapsed ? '76px' : '260px';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#060d1f', position: 'relative', overflow: 'hidden', maxWidth: '100vw' }}>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 90 }}
        />
      )}

      {/* ── Sidebar ── */}
      <aside style={{
        width: sidebarWidth,
        minHeight: '100vh',
        background: 'rgba(6,13,31,0.98)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        zIndex: 100,
        overflowX: 'hidden',
        overflowY: 'auto',
        backdropFilter: 'blur(20px)',
        transition: 'transform 0.3s ease, width 0.3s ease',
        transform: isMobile ? (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
      }}>

        {/* Logo */}
        <div style={{
          padding: '16px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          minHeight: '64px',
          flexShrink: 0,
        }}>
          <div style={{
            width: '38px', height: '38px', flexShrink: 0,
            background: 'linear-gradient(135deg, #00f5ff, #0066ff)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', fontWeight: '800', color: '#000',
            boxShadow: '0 0 16px rgba(0,245,255,0.3)',
          }}>P</div>

          {(!isDesktopCollapsed || isMobile) && (
            <div style={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
              <div style={{ fontWeight: '800', fontSize: '14px', color: '#00f5ff', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>PUNE</div>
              <div style={{ fontWeight: '500', fontSize: '10px', color: '#94a3b8', letterSpacing: '0.2em', textTransform: 'uppercase' }}>PRAVAS</div>
            </div>
          )}

          {isMobile ? (
            <button onClick={() => setSidebarOpen(false)} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px', flexShrink: 0 }}>
              <div style={{ width: '20px', height: '20px' }}>{ICONS.close}</div>
            </button>
          ) : (
            <button onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px', flexShrink: 0 }}>
              <div style={{ width: '20px', height: '20px' }}>{ICONS.menu}</div>
            </button>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto', overflowX: 'hidden' }}>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 10px',
                  borderRadius: '10px',
                  marginBottom: '4px',
                  textDecoration: 'none',
                  color: active ? '#00f5ff' : item.accent ? '#8b5cf6' : '#94a3b8',
                  background: active ? 'rgba(0,245,255,0.1)' : 'transparent',
                  borderLeft: active ? '3px solid #00f5ff' : '3px solid transparent',
                  transition: 'all 0.18s ease',
                  overflow: 'hidden',
                  minHeight: '44px',
                }}
              >
                <div style={{ width: '20px', height: '20px', flexShrink: 0 }}>{ICONS[item.glyph]}</div>
                {(!isDesktopCollapsed || isMobile) && (
                  <span style={{ fontSize: '13px', fontWeight: active ? '600' : '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div style={{
            width: '36px', height: '36px', flexShrink: 0, borderRadius: '50%',
            background: 'linear-gradient(135deg, #00f5ff, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', fontWeight: '700', color: '#000',
          }}>
            {user?.name?.[0] || 'U'}
          </div>
          {(!isDesktopCollapsed || isMobile) && (
            <div style={{ minWidth: 0, overflow: 'hidden' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name || 'User'}</div>
              <div style={{ fontSize: '11px', color: '#00f5ff' }}>{user?.tier || 'Pro'} Member</div>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div style={{
        flex: 1,
        marginLeft: marginLeft,
        transition: 'margin-left 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: `calc(100% - ${marginLeft})`,
        maxWidth: '100%',
        overflow: 'hidden',
      }}>

        {/* Header */}
        <header style={{
          height: '64px',
          background: 'rgba(6,13,31,0.92)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: '12px',
          position: 'sticky',
          top: 0,
          zIndex: 30,
          width: '100%',
          overflow: 'hidden',
        }}>

          {/* Hamburger — always visible */}
          <button
            onClick={() => isMobile ? setSidebarOpen(true) : setIsDesktopCollapsed(!isDesktopCollapsed)}
            style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', flexShrink: 0 }}
          >
            <div style={{ width: '22px', height: '22px' }}>{ICONS.menu}</div>
          </button>

          {/* Title */}
          <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
            <div style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '0.15em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Pune Pravas</div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {NAV_ITEMS.find(n => n.path === location.pathname)?.label || 'Dashboard'}
            </div>
          </div>

          {/* Live badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 10px', borderRadius: '20px', background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)', flexShrink: 0 }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00ff88', animation: 'pulse-glow 2s infinite', flexShrink: 0 }} />
            <span style={{ fontSize: '12px', color: '#00ff88', fontWeight: '600' }}>Live</span>
          </div>

          {/* Wallet */}
          <div style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.2)', fontSize: '13px', fontWeight: '700', color: '#00f5ff', flexShrink: 0 }}>
            ₹{user?.balance?.toFixed(0) || 1241}
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '16px', overflowX: 'hidden', overflowY: 'auto', width: '100%' }}>
          {children}
        </main>
      </div>
    </div>
  );
}