import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Papa from 'papaparse';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom bus icon
const busIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function PMPL() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    // Reads the CSV directly from your public folder continuously (simulated polling)
    const loadBuses = () => {
      Papa.parse('/gps_positions_2026-08-11.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          // Filter out rows missing coordinates
          const validBuses = results.data.filter(b => b.lat && b.lon);
          setBuses(validBuses);
        }
      });
    };

    loadBuses();
    const interval = setInterval(loadBuses, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 h-[calc(100vh-100px)] flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">PMPML Live Map</h1>
        <p className="text-slate-500 mt-1">Live tracking via Chartr CSV integration. Tracking {buses.length} buses.</p>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border border-slate-300 shadow-sm relative z-0">
        <MapContainer center={[18.5204, 73.8567]} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {buses.map((bus, idx) => (
            <Marker key={`${bus.id}-${idx}`} position={[bus.lat, bus.lon]} icon={busIcon}>
              <Popup>
                <div className="font-sans">
                  <div className="bg-emerald-600 text-white px-2 py-1 font-bold text-sm rounded mb-2 inline-block">
                    {bus.route}
                  </div>
                  <p className="font-bold text-slate-800 text-sm mb-1">{bus.route_desc}</p>
                  <p className="text-xs text-slate-500">Bus ID: {bus.id}</p>
                  <p className="text-xs text-slate-500">Type: {bus.ac}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}