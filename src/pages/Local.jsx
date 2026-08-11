import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrainTrack, ArrowDownUp, CheckCircle2 } from 'lucide-react';
import { purchaseTicket } from '../services/tickets';

const LOCAL_STATIONS = ['Pune Jn', 'Shivajinagar', 'Khadki', 'Dapodi', 'Kasarwadi', 'Pimpri', 'Chinchvad', 'Akurdi', 'Dehu Road', 'Begdaewai', 'Ghorawadi', 'Talegaon', 'Vadgaon', 'Kanhe', 'Kamshet', 'Malavli', 'Lonavala'];

export default function Local() {
  const navigate = useNavigate();
  const [from, setFrom] = useState('Pune Jn');
  const [to, setTo] = useState('Lonavala');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle');
  
  const fare = 15;

  const processUPI = () => {
    setPaymentStatus('processing');
    setTimeout(async () => {
      await purchaseTicket({ type: 'local', from, to, route: 'Local Train' });
      setPaymentStatus('success');
      setTimeout(() => navigate('/tickets'), 1500); // Wait 1.5s on success before redirecting
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20">
      <h1 className="text-3xl font-bold text-slate-800">Pune Local Train (Live)</h1>
      
      <div className="grid lg:grid-cols-3 gap-8 relative z-10">
        {/* Ticketing Column */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-fit">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
            <TrainTrack className="text-red-600" /> Book Local Ticket
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase">From</label>
              <select value={from} onChange={e => setFrom(e.target.value)} className="w-full p-3 mt-1 border rounded-lg bg-slate-50">
                {LOCAL_STATIONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase">To</label>
              <select value={to} onChange={e => setTo(e.target.value)} className="w-full p-3 mt-1 border rounded-lg bg-slate-50">
                {LOCAL_STATIONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="pt-4 border-t flex justify-between items-center">
              <span className="text-2xl font-bold text-slate-800">₹{fare}</span>
              <button onClick={() => setShowPayment(true)} className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700">Pay Now</button>
            </div>
          </div>
        </div>

        {/* etrain.info Style Live Tracker */}
        <div className="lg:col-span-2 bg-[#fdfaf2] border border-[#e5d9c5] rounded-xl overflow-hidden shadow-sm">
          <div className="bg-[#d47835] text-white p-3 font-bold flex justify-between text-sm">
            <span>PUNE LNL LOCAL (99810)</span>
            <span>Running Status</span>
          </div>
          <div className="bg-[#f5e3c8] text-[#8c4914] text-xs font-bold text-center py-2 border-b border-[#e5d9c5]">
            Train has reached destination LONAVALA (LNL) at 09:31
          </div>
          
          <div className="p-4">
            <div className="relative border-l-2 border-green-500 ml-4 space-y-6 pb-4">
              {LOCAL_STATIONS.slice(1, 8).map((station, idx) => (
                <div key={station} className="relative pl-6">
                  {/* Green Node */}
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-green-500 border-4 border-[#fdfaf2]"></div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-700">{idx + 1}. {station}</p>
                      <p className="text-xs text-slate-500 uppercase">{82 - (idx * 5)} kms • Platform: {(idx % 3) + 1}</p>
                    </div>
                    <div className="text-right text-xs">
                      <p>A <span className="font-mono font-medium">08:{(10 + (idx*5)).toString().padStart(2, '0')}</span> <span className="text-red-500 font-bold">(-2m)</span></p>
                      <p>D <span className="font-mono font-medium">08:{(11 + (idx*5)).toString().padStart(2, '0')}</span> <span className="text-red-500 font-bold">(-2m)</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* UPI Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
            {paymentStatus === 'idle' && (
              <>
                <h3 className="text-xl font-bold mb-4">Pay ₹{fare}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Google Pay', 'PhonePe', 'Paytm'].map(app => (
                    <button key={app} onClick={processUPI} className="p-4 border rounded-lg hover:border-red-500 font-bold">{app}</button>
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