import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrainFront, ArrowDownUp } from 'lucide-react';
import { purchaseTicket } from '../services/tickets';

const PURPLE_LINE = ['PCMC Bhavan', 'Sant Tukaram Nagar', 'Nashik Phata', 'Kasarwadi', 'Phugewadi', 'Dapodi', 'Bopodi', 'Khadki', 'Range Hill', 'Shivaji Nagar', 'Civil Court', 'Budhwar Peth', 'Mandai', 'Swargate'];
const AQUA_LINE = ['Vanaz', 'Anand Nagar', 'Ideal Colony', 'Nal Stop', 'Garware College', 'Deccan Gymkhana', 'Chhatrapati Sambhaji Udyan', 'PMC Bhavan', 'Civil Court', 'Mangalwar Peth', 'Pune Railway Station', 'Ruby Hall Clinic', 'Bund Garden', 'Yerawada', 'Kalyani Nagar', 'Ramwadi'];
const ALL_STATIONS = [...new Set([...PURPLE_LINE, ...AQUA_LINE])].sort();

export default function Metro() {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [busy, setBusy] = useState(false);

  const calculateFare = () => {
    if (!from || !to || from === to) return 0;
    return Math.floor(Math.random() * 20) + 10; // Placeholder for actual distance logic
  };

  const fare = calculateFare();

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleBook = async () => {
    if (!from || !to || from === to) return alert('Please select valid stations.');
    setBusy(true);
    try {
      await purchaseTicket({ type: 'metro', from, to });
      navigate('/tickets');
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Pune Metro</h1>
        <p className="text-slate-500 mt-1">Book QR tickets and check live train frequencies.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrainFront className="text-emerald-600" size={24} />
            <h2 className="text-lg font-bold text-slate-800">Book Metro Ticket</h2>
          </div>

          <div className="space-y-4 relative">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Departing From</label>
              <select 
                value={from} 
                onChange={(e) => setFrom(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:border-emerald-500 text-slate-800"
              >
                <option value="">Select Station...</option>
                {ALL_STATIONS.map(st => <option key={`from-${st}`} value={st}>{st}</option>)}
              </select>
            </div>

            <button 
              onClick={handleSwap}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-slate-200 p-2 rounded-full shadow-sm hover:bg-slate-50 z-10"
            >
              <ArrowDownUp size={16} className="text-slate-600" />
            </button>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 pt-2">Going To</label>
              <select 
                value={to} 
                onChange={(e) => setTo(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:border-emerald-500 text-slate-800"
              >
                <option value="">Select Station...</option>
                {ALL_STATIONS.map(st => <option key={`to-${st}`} value={st}>{st}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Fare</p>
              <p className="text-3xl font-bold text-slate-800">INR {fare}</p>
            </div>
            <button 
              onClick={handleBook}
              disabled={busy || !fare}
              className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
            >
              {busy ? 'Processing...' : 'Proceed to Pay'}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 mb-2">Network Status</h3>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 border-l-4 border-l-purple-600">
            <h4 className="font-bold text-purple-700 mb-1">Purple Line</h4>
            <p className="text-sm text-slate-600 mb-2">PCMC Bhavan - Swargate</p>
            <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">Normal Service</span>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 border-l-4 border-l-cyan-500">
            <h4 className="font-bold text-cyan-700 mb-1">Aqua Line</h4>
            <p className="text-sm text-slate-600 mb-2">Vanaz - Ramwadi</p>
            <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">Normal Service</span>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 border-l-4 border-l-slate-300">
            <h4 className="font-bold text-slate-700 mb-1">Line 3</h4>
            <p className="text-sm text-slate-600 mb-2">Hinjewadi - Civil Court</p>
            <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">Under Construction</span>
          </div>
        </div>
      </div>
    </div>
  );
}