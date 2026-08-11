import React, { useState } from 'react';
import { Map, Navigation } from 'lucide-react';

export default function RoutePlanner() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [mapUrl, setMapUrl] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!origin || !destination) return;
    
    // Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual key from Google Cloud Console.
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
    const encodedOrigin = encodeURIComponent(origin + ', Pune, Maharashtra');
    const encodedDest = encodeURIComponent(destination + ', Pune, Maharashtra');
    
    const url = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${encodedOrigin}&destination=${encodedDest}&mode=transit`;
    setMapUrl(url);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto h-[calc(100vh-120px)] flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Route Planner</h1>
        <p className="text-slate-500 mt-1">Find the best transit routes across Pune.</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Starting Point</label>
            <input 
              type="text" 
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="E.g., Swargate" 
              className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Destination</label>
            <input 
              type="text" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="E.g., Hinjewadi Phase 1" 
              className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
            />
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Navigation size={18} />
              Get Directions
            </button>
          </div>
        </form>
      </div>

      <div className="flex-1 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden relative min-h-[400px]">
        {mapUrl ? (
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={mapUrl}
            title="Google Maps Directions"
          ></iframe>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
            <Map size={48} className="mb-4 opacity-50" />
            <p>Enter your origin and destination to view the route.</p>
          </div>
        )}
      </div>
    </div>
  );
}