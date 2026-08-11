import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrainTrack, ArrowDownUp, Clock } from 'lucide-react';
import { purchaseTicket } from '../services/tickets';

const LOCAL_STATIONS = ['Pune Jn', 'Shivaji Nagar', 'Khadki', 'Dapodi', 'Kasarwadi', 'Pimpri', 'Chinchwad', 'Akurdi', 'Dehu Road', 'Begdewadi', 'Ghorawadi', 'Talegaon', 'Vadgaon', 'Kanhe', 'Kamshet', 'Malavli', 'Lonavala'];

export default function Local() {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [busy, setBusy] = useState(false);

  const calculateFare = () => {
    if (!from || !to || from === to) return 0;
    const startIndex = LOCAL_STATIONS.indexOf(from);
    const endIndex = LOCAL_STATIONS.indexOf(to);
    const diff = Math.abs(startIndex - endIndex);
    return diff <= 5 ? 5 : diff <= 10 ? 10 : 15; 
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
      await purchaseTicket({ type: 'metro', from, to, route: 'Local Train' });
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
        <h1 className="text-3xl font-bold text-slate-800">Pune Local Train</h1>
        <p className="text-slate-500 mt-1">Pune to Lonavala suburban railway network.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrainTrack className="text-red-600" size={24} />
            <h2 className="text-lg font-bold text-slate-800">Book Local Ticket</h2>
          </div>

          <div className="space-y-4 relative">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Departing From</label>
              <select 
                value={from} 
                onChange={(e) => setFrom(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:border-red-500 text-slate-800"
              >
                <option value="">Select Station...</option>
                {LOCAL_STATIONS.map(st => <option key={`from-${st}`} value={st}>{st}</option>)}
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
                className="w-full p-3 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:border-red-500 text-slate-800"
              >
                <option value="">Select Station...</option>
                {LOCAL_STATIONS.map(st => <option key={`to-${st}`} value={st}>{st}</option>)}
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
              className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              {busy ? 'Processing...' : 'Proceed to Pay'}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 mb-2">Upcoming Departures</h3>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <div className="flex justify-between items-start mb-4 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">Local 99816</span>
                <p className="text-sm font-semibold text-slate-800 mt-2">Departs 3:00 PM</p>
                <p className="text-xs text-slate-500">From Pune Jn</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1 justify-end"><Clock size={12}/> Scheduled</span>
                <p className="text-xs text-slate-500 mt-2">Arr. Lonavala 4:38 PM</p>
              </div>
            </div>
            <div className="flex justify-between items-start mb-4 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">Local 99818</span>
                <p className="text-sm font-semibold text-slate-800 mt-2">Departs 5:15 PM</p>
                <p className="text-xs text-slate-500">From Pune Jn</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1 justify-end"><Clock size={12}/> Scheduled</span>
                <p className="text-xs text-slate-500 mt-2">Arr. Lonavala 6:53 PM</p>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">Local 99822</span>
                <p className="text-sm font-semibold text-slate-800 mt-2">Departs 7:05 PM</p>
                <p className="text-xs text-slate-500">From Pune Jn</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1 justify-end"><Clock size={12}/> Scheduled</span>
                <p className="text-xs text-slate-500 mt-2">Arr. Lonavala 8:43 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}