import React, { useEffect, useRef, useState } from 'react';
import { getLiveBuses } from '../services/pmpml';

const API_BASE = 'https://punepravas.onrender.com';

export default function PuneLiveMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mapEngine, setMapEngine] = useState('Loading...');
  const [debugError, setDebugError] = useState('');

  useEffect(() => {
    let isMounted = true;
    let renderAttempts = 0;

    const initMap = async () => {
      try {
        const tokenRes = await fetch(`${API_BASE}/mappls/token`);
        if (!tokenRes.ok) throw new Error(`HTTP ${tokenRes.status}: ${await tokenRes.text()}`);

        const { access_token: token } = await tokenRes.json();
        if (!token) throw new Error('Backend did not return a Mappls token');

        if (!document.getElementById('mappls-script')) {
          const script = document.createElement('script');
          script.id = 'mappls-script';
          script.src = `https://apis.mappls.com/advancedmaps/api/${token}/map_sdk?layer=vector&v=3.0`;
          script.async = true;
          script.onload = () => { if (isMounted) renderMappls(); };
          script.onerror = () => { if (isMounted) { setDebugError('Failed to load Mappls script.'); loadFallbackMap(); } };
          document.body.appendChild(script);
        } else {
          renderMappls();
        }
      } catch (error) {
        console.error('Mappls loading failed:', error);
        if (isMounted) {
          setDebugError(error.message || 'Network error while fetching Mappls token.');
          loadFallbackMap();
        }
      }
    };

    const renderMappls = () => {
      if (window.mappls && mapRef.current) {
        mapInstanceRef.current = new window.mappls.Map(mapRef.current, {
          center: [18.5204, 73.8567],
          zoom: 12,
          zoomControl: true,
          hybrid: true,
        });
        setMapEngine('Mappls Active');
        setIsLoading(false);
      } else if (renderAttempts < 20) {
        renderAttempts += 1;
        setTimeout(renderMappls, 500);
      } else {
        setDebugError('Mappls SDK never became ready.');
        loadFallbackMap();
      }
    };

    const loadFallbackMap = () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = `
          <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
            src="https://www.openstreetmap.org/export/embed.html?bbox=73.7567%2C18.4204%2C73.9567%2C18.6204&amp;layer=mapnik&amp;marker=18.5204%2C73.8567"
            style="border: 1px solid black; filter: invert(90%) hue-rotate(180deg) brightness(85%) contrast(85%);">
          </iframe>`;
        setMapEngine('Fallback Map Active');
        setIsLoading(false);
      }
    };

    initMap();
    return () => { isMounted = false; };
  }, []);

  // Once the real map is up, poll live bus positions and plot them.
  useEffect(() => {
    if (mapEngine !== 'Mappls Active' || !mapInstanceRef.current) return;
    let cancelled = false;

    const refreshBuses = async () => {
      try {
        const buses = await getLiveBuses();
        if (cancelled) return;
        markersRef.current.forEach(m => m.remove?.());
        markersRef.current = buses
          .filter(b => b.lat && b.lng)
          .map(b => new window.mappls.Marker({
            map: mapInstanceRef.current,
            position: { lat: b.lat, lng: b.lng },
            popupHtml: `Route ${b.routeNumber || '?'}`,
          }));
      } catch (err) {
        console.warn('Could not refresh live buses:', err.message);
      }
    };

    refreshBuses();
    const interval = setInterval(refreshBuses, 15000); // matches backend cache TTL
    return () => { cancelled = true; clearInterval(interval); };
  }, [mapEngine]);

  return (
    <div style={{ padding: '24px', borderRadius: '16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>PUNE LIVE MAP</h3>
          {debugError && (
            <div style={{ fontSize: '11px', color: '#ff3366', marginTop: '4px', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Mappls Err: {debugError}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '12px', background: mapEngine.includes('Mappls') ? 'rgba(0,255,136,0.1)' : 'rgba(255,183,0,0.1)', border: `1px solid ${mapEngine.includes('Mappls') ? 'rgba(0,255,136,0.3)' : 'rgba(255,183,0,0.3)'}` }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: mapEngine.includes('Mappls') ? '#00ff88' : '#ffb700', animation: 'pulse-glow 2s infinite' }} />
          <span style={{ fontSize: '12px', color: mapEngine.includes('Mappls') ? '#00ff88' : '#ffb700', fontWeight: '700' }}>{mapEngine}</span>
        </div>
      </div>
      <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
        {isLoading && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', zIndex: 10 }}>
            <div style={{ color: '#00f5ff', fontSize: '16px', fontWeight: '700', animation: 'pulse-glow 1.5s infinite' }}>Initializing Pune Map Data...</div>
          </div>
        )}
        <div ref={mapRef} style={{ width: '100%', height: '100%', background: '#0f172a' }} />
      </div>
    </div>
  );
}