import React, { useState, useEffect, useRef } from 'react';

const CAB_TYPES = [
  { id: 'auto', name: 'Auto', icon: '🛺', base: 25, perKm: 12, capacity: 3, eta: '3 min', color: '#ffb700', desc: 'Affordable & quick' },
  { id: 'mini', name: 'Cab Mini', icon: '🚗', base: 50, perKm: 15, capacity: 4, eta: '5 min', color: '#00f5ff', desc: 'AC · Compact' },
  { id: 'sedan', name: 'Cab Sedan', icon: '🚙', base: 80, perKm: 18, capacity: 4, eta: '6 min', color: '#8b5cf6', desc: 'AC · Comfortable' },
  { id: 'suv', name: 'Cab SUV', icon: '🚐', base: 120, perKm: 22, capacity: 6, eta: '8 min', color: '#00ff88', desc: 'AC · Spacious' },
];

const NEARBY_DRIVERS = [
  { id: 1, name: 'Ravi Kumar', rating: 4.8, trips: 1240, vehicle: 'MH 12 AB 4521', type: 'auto', distance: '0.3 km', lat: 18.5250, lng: 73.8500 },
  { id: 2, name: 'Suresh Patil', rating: 4.9, trips: 2150, vehicle: 'MH 12 CD 7823', type: 'mini', distance: '0.5 km', lat: 18.5150, lng: 73.8600 },
  { id: 3, name: 'Amit Jadhav', rating: 4.7, trips: 890, vehicle: 'MH 12 EF 3311', type: 'sedan', distance: '0.8 km', lat: 18.5280, lng: 73.8650 },
];

export default function CabAuto() {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [step, setStep] = useState('search'); // search | select | confirm | booked

  // Map States
  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const routeLayerRef = useRef(null);
  const [isMapLoading, setIsMapLoading] = useState(true);

  const estimatedKm = 7.2;
  const selectedCab = CAB_TYPES.find(c => c.id === selectedType);
  const fare = selectedCab ? selectedCab.base + Math.round(estimatedKm * selectedCab.perKm) : 0;

  // 1. Initialize Robust OpenStreetMap (Leaflet)
  useEffect(() => {
    let isMounted = true;

    // Inject Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Inject Leaflet JS
    if (!document.getElementById('leaflet-script')) {
      const script = document.createElement('script');
      script.id = 'leaflet-script';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => { if (isMounted) initMap(); };
      document.body.appendChild(script);
    } else {
      // If already loaded, just initialize
      if (window.L) initMap();
      else setTimeout(initMap, 500);
    }

    function initMap() {
      if (!window.L || !mapContainerRef.current || mapInstance.current) return;

      // Create map
      mapInstance.current = window.L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false,
      }).setView([18.5204, 73.8567], 13); // Centered on Pune

      // Stunning Dark Mode CartoDB Map Tiles
      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(mapInstance.current);

      setIsMapLoading(false);
      drawNearbyDrivers();
    }

    function drawNearbyDrivers() {
      if (!window.L || !mapInstance.current) return;
      
      NEARBY_DRIVERS.forEach(driver => {
        const iconHTML = `<div style="width:24px;height:24px;background:rgba(255,183,0,0.15);border:1px solid rgba(255,183,0,0.5);border-radius:50%;display:flex;align-items:center;justify-center;font-size:12px;">🚕</div>`;
        const icon = window.L.divIcon({ className: 'custom-driver-icon', html: iconHTML, iconSize: [24, 24] });
        window.L.marker([driver.lat, driver.lng], { icon }).addTo(mapInstance.current);
      });
    }

    return () => { isMounted = false; };
  }, []);

  // 2. Draw Route when step changes
  useEffect(() => {
    if (!mapInstance.current || !window.L) return;

    // Clear old route & markers
    if (routeLayerRef.current) mapInstance.current.removeLayer(routeLayerRef.current);
    markersRef.current.forEach(m => mapInstance.current.removeLayer(m));
    markersRef.current = [];

    if (step === 'search') {
      mapInstance.current.setView([18.5204, 73.8567], 13);
      return;
    }

    // Mock Route Coordinates (Shivajinagar to Kothrud)
    const pLoc = [18.5314, 73.8446];
    const dLoc = [18.5074, 73.8077];

    // Create custom glowing markers
    const pIcon = window.L.divIcon({ className: 'p-icon', html: `<div style="width:16px;height:16px;background:#00ff88;border-radius:50%;box-shadow:0 0 15px #00ff88;"></div>` });
    const dIcon = window.L.divIcon({ className: 'd-icon', html: `<div style="width:16px;height:16px;background:#ff3366;border-radius:50%;box-shadow:0 0 15px #ff3366;"></div>` });

    const m1 = window.L.marker(pLoc, { icon: pIcon }).addTo(mapInstance.current);
    const m2 = window.L.marker(dLoc, { icon: dIcon }).addTo(mapInstance.current);
    markersRef.current = [m1, m2];

    // Draw Dashed Route Line
    routeLayerRef.current = window.L.polyline([pLoc, dLoc], { 
      color: '#00f5ff', 
      weight: 4, 
      dashArray: '10, 15', 
      opacity: 0.8 
    }).addTo(mapInstance.current);

    // Auto-zoom to fit the route on screen perfectly
    mapInstance.current.fitBounds(routeLayerRef.current.getBounds(), { padding: [60, 60] });

  }, [step]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '20px', alignItems: 'start' }}>

      {/* ─── LEFT PANEL ─── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Booking Form */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '20px', fontFamily: 'Orbitron, monospace', letterSpacing: '0.05em' }}>
            Book Ride
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                width: '10px', height: '10px', borderRadius: '50%',
                background: 'var(--neon-green)', boxShadow: '0 0 8px var(--neon-green)',
              }} />
              <input
                className="input-field"
                style={{ paddingLeft: '36px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)' }}
                placeholder="Enter pickup location..."
                value={pickup}
                onChange={e => { setPickup(e.target.value); setStep('search'); }}
              />
            </div>

            {/* Dotted connector */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'center' }}>
                {[0,1,2].map(i => <div key={i} style={{ width: '2px', height: '4px', background: 'var(--border-default)', borderRadius: '2px' }} />)}
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                width: '10px', height: '10px', borderRadius: '2px',
                background: 'var(--neon-red)', boxShadow: '0 0 8px var(--neon-red)',
              }} />
              <input
                className="input-field"
                style={{ paddingLeft: '36px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)' }}
                placeholder="Enter drop location..."
                value={drop}
                onChange={e => { setDrop(e.target.value); setStep('search'); }}
              />
            </div>

            <button
              className="btn-primary"
              style={{ marginTop: '8px', padding: '14px', fontSize: '15px', fontWeight: '700' }}
              onClick={() => setStep('select')}
              disabled={!pickup || !drop}
            >
              Find Rides
            </button>
          </div>
        </div>

        {/* Cab Types Selection */}
        {(step === 'select' || step === 'confirm' || step === 'booked') && (
          <div className="glass-card" style={{ padding: '20px', animation: 'slide-up 0.3s ease' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>
              Choose Ride Type
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {CAB_TYPES.map(cab => (
                <div
                  key={cab.id}
                  onClick={() => { setSelectedType(cab.id); setStep('confirm'); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '16px', borderRadius: '12px',
                    border: `1px solid ${selectedType === cab.id ? cab.color : 'var(--border-subtle)'}`,
                    background: selectedType === cab.id ? `${cab.color}15` : 'rgba(0,0,0,0.2)',
                    cursor: 'pointer', transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ fontSize: '28px' }}>{cab.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>{cab.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{cab.desc} · {cab.capacity} seats</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '18px', fontWeight: '800', color: cab.color }}>
                      ₹{cab.base + Math.round(estimatedKm * cab.perKm)}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ETA {cab.eta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirm Booking */}
        {step === 'confirm' && selectedCab && (
          <div style={{ animation: 'slide-up 0.3s ease' }}>
            <div style={{
              padding: '20px', borderRadius: '16px',
              background: `${selectedCab.color}10`, border: `1px solid ${selectedCab.color}40`,
              marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '600' }}>Estimated Fare</div>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '32px', fontWeight: '800', color: selectedCab.color }}>₹{fare}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Wallet Auto-Pay</div>
                <div style={{ fontSize: '13px', color: 'var(--neon-green)', marginTop: '4px', fontWeight: '700' }}>Bal: ₹1,241</div>
              </div>
            </div>
            <button className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', fontWeight: '700' }} onClick={() => setStep('booked')}>
              Confirm Booking
            </button>
          </div>
        )}

        {/* Booked Status */}
        {step === 'booked' && (
          <div className="glass-card" style={{ padding: '30px 24px', textAlign: 'center', animation: 'slide-up 0.3s ease', border: '1px solid rgba(0,255,136,0.3)' }}>
            <div style={{ width: '60px', height: '60px', background: '#00ff88', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 0 20px rgba(0,255,136,0.4)' }}>
               <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '20px', color: 'var(--neon-green)', marginBottom: '8px', fontWeight: '800' }}>RIDE CONFIRMED</div>
            <div style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Driver is on the way!</div>
            
            <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>{NEARBY_DRIVERS[0].name}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>{NEARBY_DRIVERS[0].vehicle} · ⭐ {NEARBY_DRIVERS[0].rating}</div>
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '28px', fontWeight: '800', color: 'var(--neon-cyan)', marginTop: '16px' }}>3 MIN</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Arriving in</div>
            </div>
            
            <button className="btn-ghost" style={{ width: '100%', padding: '14px', fontSize: '15px', fontWeight: '600' }} onClick={() => {setStep('search'); setSelectedType(null); setPickup(''); setDrop('');}}>
              Cancel Ride
            </button>
          </div>
        )}
      </div>

      {/* ─── RIGHT PANEL : MAP ─── */}
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden', position: 'sticky', top: '80px', height: 'calc(100vh - 120px)' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%', background: '#0f172a' }}>
          
          {/* Loading State */}
          {isMapLoading && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, background: '#0f172a' }}>
              <div style={{ color: '#00f5ff', fontSize: '16px', fontWeight: '700', animation: 'pulse-glow 1.5s infinite' }}>Loading Live Map...</div>
            </div>
          )}

          {/* Leaflet Map Target */}
          <div ref={mapContainerRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />

          {/* Map Overlay Stats */}
          <div style={{
            position: 'absolute', top: '20px', left: '20px',
            padding: '12px 16px', background: 'rgba(3,7,18,0.9)',
            borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)', zIndex: 400 // Leaflet overlays require higher z-index
          }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600', textTransform: 'uppercase' }}>Live Network</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--neon-amber)', animation: 'pulse-glow 2s infinite' }} />
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--neon-amber)' }}>{NEARBY_DRIVERS.length} Drivers Nearby</span>
            </div>
          </div>

          {/* User Prompt Overlay */}
          {step === 'search' && !isMapLoading && (
            <div style={{
              position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
              padding: '14px 24px', background: 'rgba(0,0,0,0.8)',
              borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff', fontSize: '14px', fontWeight: '600', zIndex: 400,
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
              Enter locations to see your route 📍
            </div>
          )}
        </div>
      </div>
      
      {/* Remove Leaflet marker backgrounds to keep our custom styling clean */}
      <style>{`
        .leaflet-div-icon { background: transparent; border: none; }
      `}</style>
    </div>
  );
}