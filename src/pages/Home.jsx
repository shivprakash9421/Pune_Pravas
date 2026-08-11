import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, TrainFront, Bus, Car, Ticket, Clock, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAppContext();

  const quickActions = [
    { label: 'Plan Route', icon: Map, color: 'text-blue-500', bg: 'bg-blue-50', path: '/route-planner' },
    { label: 'Pune Metro', icon: TrainFront, color: 'text-purple-500', bg: 'bg-purple-50', path: '/metro' },
    { label: 'PMPML Bus', icon: Bus, color: 'text-emerald-500', bg: 'bg-emerald-50', path: '/pmpl' },
    { label: 'Local Train', icon: TrainFront, color: 'text-red-500', bg: 'bg-red-50', path: '/local-train' },
    { label: 'Cabs & Auto', icon: Car, color: 'text-amber-500', bg: 'bg-amber-50', path: '/cab-auto' },
    { label: 'My Tickets', icon: Ticket, color: 'text-indigo-500', bg: 'bg-indigo-50', path: '/tickets' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-20 md:pb-0">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-[var(--radius-lg)] shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Welcome back, {user?.displayName?.split(' ')[0] || 'Traveler'}! 👋
          </h1>
          <p className="text-slate-500 mt-1">Where are we heading in Pune today?</p>
        </div>
      </div>

      {/* Transport Services Grid */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4 px-1">Transport Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center justify-center p-5 bg-white rounded-[var(--radius-lg)] shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all group"
            >
              <div className={`p-4 rounded-full ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                <action.icon size={28} />
              </div>
              <span className="mt-3 font-medium text-slate-700">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Status Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-5 rounded-[var(--radius-lg)] shadow-sm border border-slate-200">
           <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
             <Clock size={18} className="text-slate-400" />
             Live Network Status
           </h3>
           <div className="space-y-3">
             <div className="flex justify-between items-center text-sm p-3 bg-purple-50 text-purple-700 rounded-lg font-medium">
               <span> Purple Line (PCMC ↔ Swargate)</span>
               <span className="px-2 py-1 bg-white rounded shadow-sm text-xs">Active</span>
             </div>
             <div className="flex justify-between items-center text-sm p-3 bg-cyan-50 text-cyan-700 rounded-lg font-medium">
               <span>Aqua Line (Vanaz ↔ Ramwadi)</span>
               <span className="px-2 py-1 bg-white rounded shadow-sm text-xs">Active</span>
             </div>
             <div className="flex justify-between items-center text-sm p-3 bg-emerald-50 text-emerald-700 rounded-lg font-medium">
               <span>PMPML Routes</span>
               <span className="px-2 py-1 bg-white rounded shadow-sm text-xs">Live</span>
             </div>
           </div>
        </div>

        <div className="bg-white p-5 rounded-[var(--radius-lg)] shadow-sm border border-slate-200">
           <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
             <MapPin size={18} className="text-slate-400" />
             Lonavala Local Info
           </h3>
           <div className="flex flex-col gap-3 justify-center items-center h-32 text-slate-500 text-sm">
             <p className="text-center">Pune ↔ Lonavala local train timetables<br/>and ticket booking available.</p>
             <button onClick={() => navigate('/local-train')} className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors">
               View Schedule
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}