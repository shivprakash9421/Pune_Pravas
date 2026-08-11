import React, { useState } from 'react';
import { Map, Navigation } from 'lucide-react';

export default function RoutePlanner() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [mapUrl, setMapUrl] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!origin || !destination) return;
    
    // Replace this string with your Google Maps Embed API key
    const apiKey = 'YOUR_API_KEY_HERE'; 
    const encodedOrigin = encodeURIComponent(origin + ', Pune, Maharashtra');
    const encodedDest = encodeURIComponent(destination + ', Pune, Maharashtra');
    
    // Official Google Maps Embed syntax for Transit routes
    const url = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${encodedOrigin}&destination=${encodedDest}&mode=transit`;
    setMapUrl(url);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto flex flex-col h-[calc(100vh-100px)]">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Route Planner</h1>
        <p className="text-slate-500 mt-1">Find the best transit routes across Pune using Google Maps.</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Starting Point</label>
            <input 
              type="text" 
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="E.g., Swargate Station" 
              className="w-full p-3 border border-slate-300 bg-slate-50 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Destination</label>
            <input 
              type="text" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="E.g., Hinjewadi Phase 1" 
              className="w-full p-3 border border-slate-300 bg-slate-50 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
            />
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md">
              <Navigation size={18} />
              Get Directions
            </button>
          </div>
        </form>
      </div>

      <div className="flex-1 bg-slate-200 rounded-xl border border-slate-300 overflow-hidden relative shadow-inner">
        {mapUrl ? (
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={mapUrl}
            title="Google Maps Transit Directions"
          ></iframe>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
            <Map size={64} className="mb-4 opacity-40 text-blue-500" />
            <p className="text-lg font-medium">Enter your origin and destination above</p>
            <p className="text-sm mt-1">Live traffic and transit routes will load here.</p>
          </div>
        )}
      </div>
    </div>
  );
}