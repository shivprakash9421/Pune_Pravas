import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bus, Clock } from 'lucide-react';
import { purchaseTicket } from '../services/tickets';

export default function PMPL() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [busy, setBusy] = useState(false);

  const handleBuyPass = async () => {
    setBusy(true);
    try {
      await purchaseTicket({ type: 'pass' });
      navigate('/tickets');
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  };

  const popularRoutes = [
    { num: '43', time: '15 min', route: 'Katraj - Bhakti Shakti' },
    { num: '115', time: '20 min', route: 'Pune Station - Hinjewadi' },
    { num: '155', time: '10 min', route: 'Swargate - Pune Station' },
    { num: '2A', time: '12 min', route: 'Shivajinagar - Katraj' }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">PMPML Bus Network</h1>
        <p className="text-slate-500 mt-1">Live tracking, routes, and daily passes for city buses.</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search bus number or stop name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-800"
          />
        </div>
        <button className="px-8 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors">
          Track Bus
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4">Popular Routes</h2>
          <div className="grid grid-cols-2 gap-4">
            {popularRoutes.map((route, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors cursor-pointer">
                <div className="flex justify-between items-center mb-3">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 font-bold rounded">{route.num}</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1"><Clock size={12}/> {route.time}</span>
                </div>
                <p className="text-sm font-semibold text-slate-700 leading-tight">{route.route}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4">Daily and Monthly Passes</h2>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-orange-50 text-orange-500 rounded-full">
                <Bus size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">PMPML Digital Pass</h3>
                <p className="text-sm text-slate-500 mt-1">Travel unlimited on any PMPML route for the duration of your pass.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6 text-center">
              <div className="border border-slate-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Daily Pass</p>
                <p className="text-2xl font-bold text-slate-800">INR 50</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Monthly Pass</p>
                <p className="text-2xl font-bold text-slate-800">INR 1400</p>
              </div>
            </div>

            <button 
              onClick={handleBuyPass}
              disabled={busy}
              className="w-full py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              {busy ? 'Processing...' : 'Purchase Pass'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}