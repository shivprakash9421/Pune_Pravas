import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Map, TrainFront, Bus, Car, ChevronRight, Clock, MapPin, Ticket } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAppContext();

  const quickActions = [
    { label: 'Plan Route', icon: Map, color: 'text-blue-500', bg: 'bg-blue-50', path: '/route-planner' },
    { label: 'Metro', icon: TrainFront, color: 'text-purple-500', bg: 'bg-purple-50', path: '/metro' },
    { label: 'PMPL Bus', icon: Bus, color: 'text-emerald-500', bg: 'bg-emerald-50', path: '/pmpl' },
    { label: 'Cabs & Auto', icon: Car, color: 'text-amber-500', bg: 'bg-amber-50', path: '/cab-auto' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in font-sans">
      
      {/* Header & Wallet Summary */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Welcome back, {user?.displayName?.split(' ')[0] || 'Traveler'}
          </h1>
          <p className="text-slate-500 font-medium mt-1">Where are we heading in Pune today?</p>
        </div>
        
        <div 
          onClick={() => navigate('/wallet')}
          className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-5 shadow-sm hover:shadow-md transition-all cursor-pointer w-full md:w-auto"
        >
          <div className="h-12 w-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
            <Wallet size={24} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Wallet Balance</p>
            <p className="text-2xl font-black text-slate-900 leading-none">₹450.00</p>
          </div>
          <ChevronRight size={20} className="text-slate-300 ml-4" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => navigate(action.path)}
            className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 shadow-sm hover:shadow-md hover:border-teal-200 transition-all group"
          >
            <div className={`h-14 w-14 rounded-full ${action.bg} ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <action.icon size={28} strokeWidth={2} />
            </div>
            <span className="font-bold text-slate-700 tracking-wide">{action.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Journey Widget */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-400"></div>
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <TrainFront size={20} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Metro Aqua Line</h3>
                <p className="text-sm font-semibold text-emerald-500 flex items-center gap-1.5 mt-0.5">
                  <Clock size={14} strokeWidth={2.5} /> On Time
                </p>
              </div>
            </div>
            <span className="bg-slate-100 text-slate-600 text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">
              Live Trip
            </span>
          </div>
          
          <div className="pl-4 border-l-2 border-dashed border-slate-200 ml-5 space-y-6 relative mt-2">
            <div className="relative">
              <div className="absolute -left-[23px] top-1 h-3.5 w-3.5 rounded-full bg-slate-300 ring-4 ring-white"></div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Origin</p>
              <p className="font-bold text-slate-900 text-lg">Vanaz Station</p>
              <p className="text-sm font-medium text-slate-500">Boarded at 2:15 PM</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[23px] top-1 h-3.5 w-3.5 rounded-full border-[3px] border-teal-500 bg-white ring-4 ring-white"></div>
              <p className="text-[11px] font-bold text-teal-600 uppercase tracking-widest">Next Stop</p>
              <p className="font-bold text-slate-900 text-lg">Deccan Gymkhana</p>
              <p className="text-sm font-medium text-slate-500">Arriving in 2 mins</p>
            </div>
          </div>
        </div>

        {/* Saved Locations */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Saved Places</h2>
            <button className="text-teal-600 hover:text-teal-700 font-bold text-sm">Add</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
              <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                <MapPin size={18} strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-bold text-slate-900">Home</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Kothrud, Pune</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
              <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                <MapPin size={18} strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-bold text-slate-900">Office</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Hinjewadi IT Park</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}