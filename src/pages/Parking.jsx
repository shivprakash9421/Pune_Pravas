import React from 'react';
import { ParkingCircle, MapPin, Search, Navigation } from 'lucide-react';

export default function Parking() {
  const parkingSpots = [
    { name: 'FC Road Multi-level', distance: '0.8 km', total: 150, available: 42, price: '₹20/hr' },
    { name: 'JM Road Street Parking', distance: '1.2 km', total: 50, available: 5, price: '₹15/hr' },
    { name: 'Shivajinagar Station', distance: '2.5 km', total: 300, available: 120, price: '₹30/hr' },
    { name: 'Pune Central Mall', distance: '3.0 km', total: 500, available: 0, price: '₹40/hr' },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Smart Parking</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">Find and reserve parking slots in real-time.</p>
      </div>

      <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 shadow-[var(--shadow-card)] border border-[var(--color-border)] flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={20} />
          <input 
            type="text" 
            placeholder="Search destination to find nearby parking..." 
            className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-md)] focus:bg-white focus:border-[var(--color-primary)] transition-all outline-none font-medium"
          />
        </div>
        <button className="bg-[var(--color-bg-subtle)] border border-[var(--color-border)] hover:bg-[var(--color-border)] text-[var(--color-text-primary)] px-6 py-3 rounded-[var(--radius-md)] font-medium transition-colors flex items-center justify-center gap-2">
          <MapPin size={18} /> Near Me
        </button>
      </div>

      <div className="space-y-4">
        {parkingSpots.map((spot, idx) => {
          const isFull = spot.available === 0;
          const availabilityPercentage = (spot.available / spot.total) * 100;
          
          let statusColor = 'bg-[var(--color-success)]';
          if (isFull) statusColor = 'bg-[var(--color-danger)]';
          else if (availabilityPercentage < 20) statusColor = 'bg-[var(--color-warning)]';

          return (
            <div key={idx} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 shadow-sm hover:shadow-[var(--shadow-card-hover)] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${isFull ? 'bg-red-50 text-[var(--color-danger)]' : 'bg-blue-50 text-blue-600'}`}>
                  <ParkingCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text-primary)] text-lg">{spot.name}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] flex items-center gap-1 mt-1">
                    <Navigation size={14} /> {spot.distance} away
                  </p>
                </div>
              </div>

              <div className="flex-1 max-w-xs w-full">
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-[var(--color-text-secondary)]">Availability</span>
                  <span className={isFull ? 'text-[var(--color-danger)]' : 'text-[var(--color-text-primary)]'}>
                    {isFull ? 'FULL' : `${spot.available} / ${spot.total} slots`}
                  </span>
                </div>
                <div className="h-2 w-full bg-[var(--color-bg-subtle)] rounded-full overflow-hidden">
                  <div className={`h-full ${statusColor} rounded-full`} style={{ width: `${Math.max(availabilityPercentage, isFull ? 100 : 5)}%` }}></div>
                </div>
              </div>

              <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 border-[var(--color-border)] pt-4 md:pt-0">
                <span className="font-bold text-lg text-[var(--color-text-primary)]">{spot.price}</span>
                <button 
                  disabled={isFull}
                  className={`px-6 py-2 rounded-[var(--radius-sm)] font-medium text-sm transition-colors ${isFull ? 'bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)] cursor-not-allowed' : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white shadow-sm'}`}
                >
                  {isFull ? 'No Slots' : 'Reserve'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}