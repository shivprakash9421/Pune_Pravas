import React, { useState } from 'react';
import { Car, MapPin, Search, Navigation } from 'lucide-react';

export default function CabAuto() {
  const [vehicleType, setVehicleType] = useState('all');

  const rides = [
    { type: 'Auto', provider: 'Ola', eta: '3 min', price: '₹45', surge: false },
    { type: 'Auto', provider: 'Uber', eta: '5 min', price: '₹42', surge: false },
    { type: 'Cab Mini', provider: 'Uber', eta: '4 min', price: '₹120', surge: true },
    { type: 'Cab Sedan', provider: 'Ola', eta: '8 min', price: '₹140', surge: false },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Cabs & Autos</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">Compare prices across ride-hailing apps instantly.</p>
      </div>

      <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] border border-[var(--color-border)] p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={20} />
            <input type="text" placeholder="Pickup location" className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-md)] focus:bg-white focus:border-[var(--color-primary)] transition-all outline-none" />
          </div>
          <div className="flex-1 relative">
            <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" size={20} />
            <input type="text" placeholder="Drop destination" className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-md)] focus:bg-white focus:border-[var(--color-primary)] transition-all outline-none" />
          </div>
          <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-8 py-3 rounded-[var(--radius-md)] font-medium transition-colors shadow-sm flex items-center justify-center gap-2">
            <Search size={18} /> Compare
          </button>
        </div>

        <div className="flex gap-2 mt-6 pt-6 border-t border-[var(--color-border)]">
          {['All', 'Auto', 'Cab Mini', 'Cab Sedan'].map(type => (
            <button 
              key={type} onClick={() => setVehicleType(type.toLowerCase())}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${vehicleType === type.toLowerCase() ? 'bg-[var(--color-navy)] text-white border-[var(--color-navy)]' : 'bg-[var(--color-bg)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-border-strong)]'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {rides.map((ride, idx) => (
          <div key={idx} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 shadow-sm hover:shadow-[var(--shadow-card-hover)] transition-all flex flex-col justify-between h-40 relative overflow-hidden group">
            {ride.surge && <div className="absolute top-0 right-0 bg-[var(--color-danger)] text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">SURGE</div>}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Car size={16} className="text-[var(--color-text-secondary)]" />
                <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">{ride.provider}</span>
              </div>
              <h3 className="font-bold text-lg text-[var(--color-text-primary)]">{ride.type}</h3>
              <p className="text-sm text-[var(--color-success)] font-medium mt-1">{ride.eta} away</p>
            </div>
            <div className="flex items-end justify-between mt-4">
              <span className="text-2xl font-bold text-[var(--color-text-primary)]">{ride.price}</span>
              <button className="text-[var(--color-primary)] font-medium text-sm hover:underline">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}