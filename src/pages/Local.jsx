import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrainTrack, ArrowDownUp, CheckCircle2 } from 'lucide-react';
import { purchaseTicket } from '../services/tickets';

const LOCAL_STATIONS = ['Pune Jn', 'Shivajinagar', 'Khadki', 'Dapodi', 'Kasarwadi', 'Pimpri', 'Chinchvad', 'Akurdi', 'Dehu Road', 'Begdaewai', 'Ghorawadi', 'Talegaon', 'Vadgaon', 'Kanhe', 'Kamshet', 'Malavli', 'Lonavala'];

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
             <div key={st} onClick={() => { onChange(st); setIsOpen(false); }} className={`p-3 hover:bg-red-50 cursor-pointer text-sm ${value === st ? 'bg-red-600 text-white hover:bg-red-700' : 'text-slate-700'}`}>{st}</div>
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
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle');
  const [timeState, setTimeState] = useState(new Date());

  // Updates real-time simulation every minute
  useEffect(() => {
    const timer = setInterval(() => setTimeState(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const fare = (from && to && from !== to) ? (() => {
    const diff = Math.abs(LOCAL_STATIONS.indexOf(from) - LOCAL_STATIONS.indexOf(to));
    return diff <= 5 ? 5 : diff <= 10 ? 10 : 15;
  })() : 0;

  const handleBook = () => {
    if (!from || !to || from === to) return alert('Please select valid stations.');
    setShowPayment(true);
  };

  const processUPI = async (app) => {
    setPaymentStatus('processing');
    setTimeout(async () => {
      try {
        await purchaseTicket({ type: 'local', from, to, route: 'Local Train' });
      } catch (err) {
        // Offline Fallback for Local Tickets
        const fallbackTicket = {
            id: 'UT' + Math.floor(Math.random()*1000000000).toString(16).toUpperCase(),
            type: 'local', from, to, fare, route: 'Local Train',
            purchasedAt: new Date().toISOString(), status: 'valid'
        };
        const existing = JSON.parse(localStorage.getItem('local_tickets') || '[]');
        localStorage.setItem('local_tickets', JSON.stringify([fallbackTicket, ...existing]));
      }
      setPaymentStatus('success');
      setTimeout(() => navigate('/tickets'), 1500);
    }, 2000);
  };

  // Real-time Tracker Logic
  const startHour = timeState.getHours();
  let startMin = timeState.getMinutes() - 35; // Simulated: Train departed 35 mins ago
  let adjHour = startHour;
  if (startMin < 0) {
      startMin += 60;
      adjHour -= 1;
  }
  
  const generateLiveTimes = (index) => {
      let minOffset = index * 5; 
      let arrM = startMin + minOffset;
      let arrH = adjHour + Math.floor(arrM / 60);
      arrM = arrM % 60;
      
      let depM = arrM + 1;
      let depH = arrH + Math.floor(depM / 60);
      depM = depM % 60;
      
      const format = (h, m) => `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      
      const arrTime = format(arrH, arrM);
      const depTime = format(depH, depM);
      
      // Determine if station has passed based on real clock
      const totalCurrentMins = timeState.getHours() * 60 + timeState.getMinutes();
      const totalArrMins = arrH * 60 + arrM;
      
      let status = "Scheduled";
      let colorClass = "text-slate-500";
      
      if (totalCurrentMins > totalArrMins) {
          status = "Passed";
          colorClass = "text-green-600";
      } else if (totalCurrentMins === totalArrMins) {
          status = "At Station";
          colorClass = "text-red-500 font-bold animate-pulse";
      }

      return { arrTime, depTime, status, colorClass };
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20">
      <h1 className="text-3xl font-bold text-slate-800">Pune Local Train (Live)</h1>
      
      <div className="grid lg:grid-cols-3 gap-8 relative z-10">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-fit">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6"><TrainTrack className="text-red-600" /> Book Local Ticket</h2>
          <div className="space-y-6 relative">
            <StationSelect label="Departing From" value={from} onChange={setFrom} options={LOCAL_STATIONS} />
            <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-20">
              <button onClick={() => { setFrom(to); setTo(from); }} className="bg-white border border-slate-200 p-2 rounded-full shadow-md">
                <ArrowDownUp size={16} className="text-slate-600" />
              </button>
            </div>
            <StationSelect label="Going To" value={to} onChange={setTo} options={LOCAL_STATIONS} />
          </div>
          <div className="mt-8 flex items-center justify-between border-t pt-6">
            <span className="text-3xl font-bold text-slate-800">₹{fare}</span>
            <button onClick={handleBook} disabled={!fare} className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 disabled:opacity-50">Pay Now</button>
          </div>
        </div>

        {/* Dynamic Real-Time Tracker mimicking etrain.info */}
        <div className="lg:col-span-2 bg-[#fdfaf2] border border-[#e5d9c5] rounded-xl overflow-hidden shadow-sm">
          <div className="bg-[#d47835] text-white p-3 font-bold flex justify-between text-sm">
            <span>PUNE LNL LOCAL (99810)</span>
            <span>Live Running Status</span>
          </div>
          <div className="bg-[#f5e3c8] text-[#8c4914] text-xs font-bold text-center py-2 border-b border-[#e5d9c5]">
            Last Updated: {timeState.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
          
          <div className="p-4 overflow-y-auto max-h-[500px]">
            <div className="relative border-l-2 border-green-500 ml-4 space-y-6 pb-4">
              {LOCAL_STATIONS.slice(1, 10).map((station, idx) => {
                const times = generateLiveTimes(idx);
                return (
                  <div key={station} className="relative pl-6">
                    <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-[#fdfaf2] ${times.status === 'Passed' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-700">{idx + 1}. {station}</p>
                        <p className="text-xs text-slate-500 uppercase">{82 - (idx * 5)} kms • Platform: {(idx % 3) + 1}</p>
                        <p className={`text-xs mt-1 ${times.colorClass}`}>{times.status}</p>
                      </div>
                      <div className="text-right text-xs">
                        <p>A <span className="font-mono font-medium">{times.arrTime}</span> <span className="text-red-500 font-bold">(-2m)</span></p>
                        <p>D <span className="font-mono font-medium">{times.depTime}</span> <span className="text-red-500 font-bold">(-2m)</span></p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

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
                    <button key={app} onClick={() => processUPI(app)} className="p-4 border rounded-lg hover:border-red-500 font-bold">{app}</button>
                  ))}
                </div>
              </>
            )}
            {paymentStatus === 'processing' && (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-lg font-bold">Processing Payment...</h3>
              </div>
            )}
            {paymentStatus === 'success' && (
              <div className="text-center py-12">
                <CheckCircle2 size={56} className="text-emerald-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Payment Successful!</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}