import React, { useState } from 'react';
import { Navigation } from 'lucide-react';

export default function RoutePlanner() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [mapUrl, setMapUrl] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!origin || !destination) return;
    
    // REPLACE WITH YOUR GOOGLE MAPS API KEY
    const apiKey = 'YOUR_API_KEY_HERE'; 
    const encodedOrigin = encodeURIComponent(origin + ', Pune, Maharashtra');
    const encodedDest = encodeURIComponent(destination + ', Pune, Maharashtra');
    
    const url = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${encodedOrigin}&destination=${encodedDest}&mode=transit`;
    setMapUrl(url);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-[calc(100vh-100px)] space-y-4">
      <h1 className="text-3xl font-bold text-slate-800">Google Route Planner</h1>
      
      <form onSubmit={handleSearch} className="bg-white p-4 rounded-xl shadow-sm flex gap-4">
        <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Starting point (e.g., Swargate)" className="flex-1 p-3 border rounded-lg" />
        <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination (e.g., Viman Nagar)" className="flex-1 p-3 border rounded-lg" />
        <button type="submit" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg flex items-center gap-2">
          <Navigation size={18}/> Navigate
        </button>
      </form>

      <div className="flex-1 bg-slate-200 rounded-xl overflow-hidden shadow-inner">
        {mapUrl ? (
          <iframe width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen src={mapUrl} title="Google Maps Transit"></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500">Enter locations to load Google Maps.</div>
        )}
      </div>
    </div>
  );
}