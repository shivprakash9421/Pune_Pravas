import React, { useEffect, useRef, useState } from 'react';

export default function PuneLiveMap() {
  const mapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapEngine, setMapEngine] = useState('Loading...'); // 'mappls', 'fallback', or 'Loading...'
  const [debugError, setDebugError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      const CLIENT_ID = '96dHZVzsAuu8O9TxaPoRFf3E6dbWfs7HBRyNEPKVYIY9xPX_Dl9vEXrmC78ds4yyBllLY9odIjUqqg7n3ePVfw=='; 
      const CLIENT_SECRET = 'lrFxl-iSEg-p5awuKbhDfVztaljsUvr54Ih2ux7axVhPhgsp1tqa67v7bnE7cKHWinImm_eo6bY5Rx33Pjgre1ClDr3QnKUy';

      try {
        // Step 1: Fetch Token
        const tokenRes = await fetch('/mappls-token/api/security/oauth/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
          })
        });

        if (!tokenRes.ok) {
          const errData = await tokenRes.text();
          throw new Error(`HTTP ${tokenRes.status}: ${errData}`);
        }

        const tokenData = await tokenRes.json();
        const token = tokenData.access_token;

        // Step 2: Inject Mappls SDK Script
        if (!document.getElementById('mappls-script')) {
          const script = document.createElement('script');
          script.id = 'mappls-script';
          script.src = `https://apis.mappls.com/advancedmaps/api/${token}/map_sdk?layer=vector&v=3.0`;
          script.async = true;
          script.onload = () => { if (isMounted) renderMappls(); };
          script.onerror = () => { throw new Error("Failed to load Mappls script tag."); };
          document.body.appendChild(script);
        } else {
          renderMappls();
        }

      } catch (error) {
        console.error('Mappls loading failed:', error);
        if (isMounted) {
          setDebugError(error.message || "Network/CORS Error. Did Vite restart?");
          loadFallbackMap(); // Automatically switch to backup map
        }
      }
    };

    const renderMappls = () => {
      if (window.mappls && mapRef.current) {
        new window.mappls.Map(mapRef.current, {
          center: [18.5204, 73.8567], // Pune
          zoom: 12,
          zoomControl: true,
          hybrid: true,
        });
        setMapEngine('Mappls Active');
        setIsLoading(false);
      } else {
        setTimeout(renderMappls, 500);
      }
    };

    const loadFallbackMap = () => {
      // If Mappls fails, load an interactive iframe of OpenStreetMap centered on Pune
      if (mapRef.current) {
        mapRef.current.innerHTML = `
          <iframe 
            width="100%" 
            height="100%" 
            frameborder="0" 
            scrolling="no" 
            marginheight="0" 
            marginwidth="0" 
            src="https://www.openstreetmap.org/export/embed.html?bbox=73.7567%2C18.4204%2C73.9567%2C18.6204&amp;layer=mapnik&amp;marker=18.5204%2C73.8567" 
            style="border: 1px solid black; filter: invert(90%) hue-rotate(180deg) brightness(85%) contrast(85%);">
          </iframe>
        `;
        setMapEngine('Fallback Map Active');
        setIsLoading(false);
      }
    };

    initMap();
    return () => { isMounted = false; };
  }, []);

  return (
    <div style={{ padding: '24px', borderRadius: '16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
            PUNE LIVE MAP
          </h3>
          {debugError && (
            <div style={{ fontSize: '11px', color: '#ff3366', marginTop: '4px', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Mappls Err: {debugError}
            </div>
          )}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '12px', background: mapEngine.includes('Mappls') ? 'rgba(0,255,136,0.1)' : 'rgba(255,183,0,0.1)', border: `1px solid ${mapEngine.includes('Mappls') ? 'rgba(0,255,136,0.3)' : 'rgba(255,183,0,0.3)'}` }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: mapEngine.includes('Mappls') ? '#00ff88' : '#ffb700', animation: 'pulse-glow 2s infinite' }} />
          <span style={{ fontSize: '12px', color: mapEngine.includes('Mappls') ? '#00ff88' : '#ffb700', fontWeight: '700' }}>
            {mapEngine}
          </span>
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
        
        {isLoading && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', zIndex: 10 }}>
            <div style={{ color: '#00f5ff', fontSize: '16px', fontWeight: '700', animation: 'pulse-glow 1.5s infinite' }}>
              Initializing Pune Map Data...
            </div>
          </div>
        )}

        {/* The map injects here */}
        <div ref={mapRef} style={{ width: '100%', height: '100%', background: '#0f172a' }} />
      </div>
    </div>
  );
}