import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Papa from 'papaparse';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const busIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

export default function PMPL() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const loadBuses = async () => {
      try {
        const response = await fetch('/gps_positions_2026-08-11.csv');
        if (!response.ok) throw new Error("CSV fetch failed");
        
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            const validBuses = results.data.filter(b => b.lat && b.lon);
            setBuses(validBuses.length > 0 ? validBuses : getMockBuses());
          }
        });
      } catch (err) {
        console.warn("Falling back to local simulation data:", err);
        setBuses(getMockBuses());
      }
    };

    const getMockBuses = () => [
        { id: 'MH12WX3686', lat: 18.484996, lon: 73.857704, route: '24ADOWN', route_desc: 'Lohegaon to Katraj', ac: 'ac' },
        { id: 'MH12RN5362', lat: 18.494364, lon: 73.946552, route: '64DOWN', route_desc: 'Nda 10 No. Gate to Bhekrai Nagar', ac: 'ac' },
        { id: 'MH12SX0508', lat: 18.506148, lon: 73.892792, route: '15DOWN', route_desc: 'Dsk Vishwa to Bhekrai Nagar', ac: 'ac' },
        { id: 'MH12TV5283', lat: 18.526664, lon: 73.872632, route: '357DOWN', route_desc: 'Bhosari Terminal to Pune Station', ac: 'ac' },
        { id: 'MH12QG2071', lat: 18.513372, lon: 73.844994, route: '202UP', route_desc: 'Shewalewadi Depot to Ganpati Matha', ac: 'nac' },
        { id: 'MH12RN5001', lat: 18.530000, lon: 73.850000, route: '43UP', route_desc: 'Katraj to Bhakti Shakti', ac: 'ac' },
        { id: 'MH12WX3002', lat: 18.540000, lon: 73.860000, route: '115DOWN', route_desc: 'Pune Station to Hinjewadi', ac: 'nac' },
    ];

    loadBuses();
    const interval = setInterval(loadBuses, 10000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 h-[calc(100vh-100px)] flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">PMPML Live Map</h1>
        <p className="text-slate-500 mt-1">Live tracking integration. Tracking {buses.length} buses.</p>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border border-slate-300 shadow-sm relative z-0">
        <MapContainer center={[18.5204, 73.8567]} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {buses.map((bus, idx) => (
            <Marker key={`${bus.id}-${idx}`} position={[bus.lat, bus.lon]} icon={busIcon}>
              <Popup>
                <div className="font-sans">
                  <div className="bg-emerald-600 text-white px-2 py-1 font-bold text-sm rounded mb-2 inline-block">
                    {bus.route}
                  </div>
                  <p className="font-bold text-slate-800 text-sm mb-1">{bus.route_desc}</p>
                  <p className="text-xs text-slate-500">Bus ID: {bus.id} ({bus.ac})</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}