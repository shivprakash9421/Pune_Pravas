import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getLiveBuses } from '../services/pmpml';

const busIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

export default function PMPL() {
  const [buses, setBuses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadBuses = async () => {
      try {
        const live = await getLiveBuses();
        if (cancelled) return;
        setBuses(live.filter(b => b.lat && b.lon));
        setError('');
      } catch (err) {
        if (!cancelled) setError(err.message || 'Could not load live buses.');
      }
    };

    loadBuses();
    const interval = setInterval(loadBuses, 15000); // matches backend cache TTL
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 h-[calc(100vh-100px)] flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">PMPML Live Map</h1>
        <p className="text-slate-500 mt-1">
          {error ? <span className="text-red-500">{error}</span> : `Tracking ${buses.length} buses live.`}
        </p>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border border-slate-300 shadow-sm relative z-0">
        <MapContainer center={[18.5204, 73.8567]} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {buses.map((bus, idx) => (
            <Marker key={`${bus.id || idx}`} position={[bus.lat, bus.lon]} icon={busIcon}>
              <Popup>
                <div className="font-sans">
                  <div className="bg-emerald-600 text-white px-2 py-1 font-bold text-sm rounded mb-2 inline-block">
                    {bus.route || bus.routeNumber || '?'}
                  </div>
                  <p className="font-bold text-slate-800 text-sm mb-1">{bus.route_desc || ''}</p>
                  <p className="text-xs text-slate-500">Bus ID: {bus.id}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}