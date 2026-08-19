import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Navigation } from 'lucide-react';
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
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [appliedSource, setAppliedSource] = useState('');
  const [appliedDestination, setAppliedDestination] = useState('');

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

  const handleSearch = (e) => {
    e.preventDefault();
    setAppliedSource(source.trim());
    setAppliedDestination(destination.trim());
  };

  const handleClear = () => {
    setSource('');
    setDestination('');
    setAppliedSource('');
    setAppliedDestination('');
  };

  const isFiltering = appliedSource !== '' || appliedDestination !== '';

  const filteredBuses = useMemo(() => {
    if (!isFiltering) return buses;

    const src = appliedSource.toLowerCase();
    const dest = appliedDestination.toLowerCase();

    return buses.filter((bus) => {
      const routeText = `${bus.route || ''} ${bus.route_desc || ''}`.toLowerCase();
      const matchesSource = src === '' || routeText.includes(src);
      const matchesDestination = dest === '' || routeText.includes(dest);
      return matchesSource && matchesDestination;
    });
  }, [buses, isFiltering, appliedSource, appliedDestination]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 h-[calc(100vh-100px)] flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">PMPML Live Map</h1>
        <p className="text-slate-500 mt-1">
          {error ? (
            <span className="text-red-500">{error}</span>
          ) : isFiltering ? (
            `Showing ${filteredBuses.length} of ${buses.length} buses matching your route.`
          ) : (
            `Tracking ${buses.length} buses live.`
          )}
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Source</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="E.g., Swargate"
              className="w-full p-3 border border-slate-300 bg-slate-50 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-800"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="E.g., Katraj"
              className="w-full p-3 border border-slate-300 bg-slate-50 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-800"
            />
          </div>
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="px-8 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Navigation size={18} />
              Find Buses
            </button>
            {isFiltering && (
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-3 border border-slate-300 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border border-slate-300 shadow-sm relative z-0">
        <MapContainer center={[18.5204, 73.8567]} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filteredBuses.map((bus, idx) => (
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
        {isFiltering && filteredBuses.length === 0 && !error && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/90 px-6 py-4 rounded-xl shadow-md text-center">
              <p className="text-slate-700 font-medium">No live buses found for this route right now.</p>
              <p className="text-slate-500 text-sm mt-1">Try different stop names, or clear the search.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
