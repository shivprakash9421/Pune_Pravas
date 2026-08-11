import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrainTrack, ArrowDownUp, Clock, CheckCircle2 } from 'lucide-react';
import { purchaseTicket } from '../services/tickets';

const LOCAL_STATIONS = ['Pune Junction', 'Shivajinagar', 'Khadki', 'Dapodi', 'Kasarwadi', 'Pimpri', 'Chinchwad', 'Akurdi', 'Dehu Road', 'Begdewadi', 'Ghorawadi', 'Talegaon', 'Vadgaon', 'Kanhe', 'Kamshet', 'Malavli', 'Lonavala'];

const StationSelect = ({ label, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{label}</label>
      <div onClick={() => setIsOpen(!isOpen)} className="w-full p-3 rounded-lg border border-red-400 bg-white text-slate-800 cursor-pointer flex justify-between items-center shadow-sm">
        <span>{value || 'Select Station...'}</span>
        <span className="text-slate-400 text-xs">▼</span>
      </div>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {options.map((st) => (
            <div key={st} onClick={() => { onChange(st); setIsOpen(false); }} className={`p-3 hover:bg-red-50 cursor-pointer text-sm ${value === st ? 'bg-red-600 text-white hover:bg-red-700' : 'text-slate-700'}`}>
              {st}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Local() {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [isTowardsLonavala, setIsTowardsLonavala] = useState(true);
  
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle');

  // Calculates a realistic fare based on station indices
  const fare = (from && to && from !== to) ? (() => {
    const diff = Math.abs(LOCAL_STATIONS.indexOf(from) - LOCAL_STATIONS.indexOf(to));
    return diff <= 5 ? 5 : diff <= 10 ? 10 : 15;
  })() : 0;

  const handleBook = () => {
    if (!from || !to || from === to) return alert('Please select valid stations.');
    setShowPayment(true);
  };

  const processUPI = async () => {
    setPaymentStatus('processing');
    setTimeout(async () => {
      try {
        await purchaseTicket({ type: 'metro', from, to, route: 'Local Train' }); // Saving as 'metro' type structure for UI parsing
        setPaymentStatus('success');
        setTimeout(() => navigate('/tickets'), 1500);
      } catch (err) {
        alert(err.message);
        setShowPayment(false);
        setPaymentStatus('idle');
      }
    }, 2000);
  };

  // Live timetable schedules based on direction
  const schedules = isTowardsLonavala 
    ? [{ id: '99818', time: '15:00', arr: '16:20' }, { id: '99906', time: '15:47', arr: '17:05' }, { id: '99820', time: '16:25', arr: '17:45' }, { id: '99822', time: '17:20', arr: '18:38' }] 
    : [{ id: '99813', time: '14:50', arr: '16:10' }, { id: '99815', time: '15:30', arr: '16:50' }, { id: '99817', time: '16:30', arr: '17:50' }, { id: '99819', time: '17:30', arr: '18:50' }];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Pune Local Train</h1>
          <p className="text-slate-500 mt-1">Pune ⇌ Lonavala suburban railway network.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 relative z-10">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrainTrack className="text-red-600" size={24} />
            <h2 className="text-lg font-bold text-slate-800">Book Local Ticket</h2>
          </div>

          <div className="space-y-6 relative">
            <StationSelect label="Departing From" value={from} onChange={setFrom} options={LOCAL_STATIONS} />
            <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-20">
              <button onClick={() => { setFrom(to); setTo(from); }} className="bg-white border border-slate-200 p-2 rounded-full shadow-md hover:bg-slate-50">
                <ArrowDownUp size={16} className="text-slate-600" />
              </button>
            </div>
            <StationSelect label="Going To" value={to} onChange={setTo} options={LOCAL_STATIONS} />
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Fare</p>
              <p className="text-3xl font-bold text-slate-800">₹{fare}</p>
            </div>
            <button onClick={handleBook} disabled={!fare} className="px-8 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors">
              Proceed to Pay
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-700 rounded-xl p-1 flex shadow-sm">
            <button onClick={() => setIsTowardsLonavala(true)} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${isTowardsLonavala ? 'bg-white text-slate-800' : 'text-slate-300 hover:text-white'}`}>To Lonavala</button>
            <button onClick={() => setIsTowardsLonavala(false)} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${!isTowardsLonavala ? 'bg-white text-slate-800' : 'text-slate-300 hover:text-white'}`}>To Pune</button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            {schedules.map((train, idx) => (
              <div key={idx} className="flex justify-between items-start mb-4 border-b border-slate-100 pb-3 last:border-0 last:mb-0 last:pb-0">
                <div>
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">Local {train.id}</span>
                  <p className="text-sm font-semibold text-slate-800 mt-2">Departs {train.time}</p>
                  <p className="text-xs text-slate-500">{isTowardsLonavala ? 'From Pune Jn' : 'From Lonavala'}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-600 flex items-center gap-1 justify-end"><Clock size={12}/> Scheduled</span>
                  <p className="text-xs text-slate-500 mt-2">Arr. {train.arr}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* UPI Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
            {paymentStatus === 'idle' && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-800">Pay ₹{fare}</h3>
                  <button onClick={() => setShowPayment(false)} className="text-slate-400 hover:text-slate-600">✕</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI'].map(app => (
                    <button key={app} onClick={processUPI} className="p-4 border border-slate-200 rounded-lg font-medium text-slate-700 hover:border-red-500 hover:bg-red-50 transition-colors">{app}</button>
                  ))}
                </div>
              </>
            )}
            {paymentStatus === 'processing' && (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-lg font-bold text-slate-800">Processing Payment...</h3>
              </div>
            )}
            {paymentStatus === 'success' && (
              <div className="text-center py-12">
                <CheckCircle2 size={56} className="text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-800">Payment Successful!</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}