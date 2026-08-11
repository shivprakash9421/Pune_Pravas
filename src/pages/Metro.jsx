import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrainFront, ArrowDownUp, CheckCircle2 } from 'lucide-react';
import { purchaseTicket } from '../services/tickets';

const PURPLE_LINE = ['PCMC Bhavan', 'Sant Tukaram Nagar', 'Nashik Phata', 'Kasarwadi', 'Phugewadi', 'Dapodi', 'Bopodi', 'Khadki', 'Range Hills', 'Shivaji Nagar', 'Civil Court', 'Budhwar Peth', 'Mandai', 'Swargate'];
const AQUA_LINE = ['Vanaz', 'Anand Nagar', 'Ideal Colony', 'Nal Stop', 'Garware College', 'Deccan Gymkhana', 'Chhatrapati Sambhaji Udyan', 'PMC Bhavan', 'Civil Court', 'Mangalwar Peth', 'Pune Railway Station', 'Ruby Hall Clinic', 'Bund Garden', 'Yerawada', 'Kalyani Nagar', 'Ramwadi'];
const ALL_STATIONS = [...new Set([...PURPLE_LINE, ...AQUA_LINE])].sort();

// Custom Dropdown Component to prevent clipping
const StationSelect = ({ label, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 rounded-lg border border-emerald-500 bg-white text-slate-800 cursor-pointer flex justify-between items-center shadow-sm"
      >
        <span>{value || 'Select Station...'}</span>
        <span className="text-slate-400 text-xs">▼</span>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {options.map((st) => (
            <div 
              key={st}
              onClick={() => { onChange(st); setIsOpen(false); }}
              className={`p-3 hover:bg-blue-50 cursor-pointer text-sm ${value === st ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-slate-700'}`}
            >
              {st}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Metro() {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success

  const fare = (from && to && from !== to) ? Math.floor(Math.random() * 20) + 10 : 0;

  const handleBook = () => {
    if (!from || !to || from === to) return alert('Please select valid stations.');
    setShowPayment(true);
  };

  const processUPI = async (app) => {
    setPaymentStatus('processing');
    // Simulate network delay
    setTimeout(async () => {
      try {
        await purchaseTicket({ type: 'metro', from, to });
        setPaymentStatus('success');
        setTimeout(() => navigate('/tickets'), 1500);
      } catch (err) {
        alert(err.message);
        setShowPayment(false);
        setPaymentStatus('idle');
      }
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Pune Metro</h1>
        <p className="text-slate-500 mt-1">Book QR tickets and check live train frequencies.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 relative z-10">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrainFront className="text-emerald-600" size={24} />
            <h2 className="text-lg font-bold text-slate-800">Book Metro Ticket</h2>
          </div>

          <div className="space-y-6 relative">
            <StationSelect label="Departing From" value={from} onChange={setFrom} options={ALL_STATIONS} />
            
            <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-20">
              <button 
                onClick={() => { setFrom(to); setTo(from); }}
                className="bg-white border border-slate-200 p-2 rounded-full shadow-md hover:bg-slate-50 transition-colors"
              >
                <ArrowDownUp size={16} className="text-slate-600" />
              </button>
            </div>

            <StationSelect label="Going To" value={to} onChange={setTo} options={ALL_STATIONS} />
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Fare</p>
              <p className="text-3xl font-bold text-slate-800">₹{fare}</p>
            </div>
            <button 
              onClick={handleBook}
              disabled={!fare}
              className="px-8 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
            >
              Proceed to Pay
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 mb-2">Network Status</h3>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 border-l-4 border-l-purple-600">
            <h4 className="font-bold text-purple-700 mb-1">Purple Line</h4>
            <p className="text-sm text-slate-600 mb-3">PCMC Bhavan ⇌ Swargate</p>
            <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">Normal Service</span>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 border-l-4 border-l-cyan-500">
            <h4 className="font-bold text-cyan-700 mb-1">Aqua Line</h4>
            <p className="text-sm text-slate-600 mb-3">Vanaz ⇌ Ramwadi</p>
            <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">Normal Service</span>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 border-l-4 border-l-slate-300">
            <h4 className="font-bold text-slate-700 mb-1">Line 3</h4>
            <p className="text-sm text-slate-600 mb-3">Hinjewadi ⇌ Civil Court</p>
            <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">Under Construction</span>
          </div>
        </div>
      </div>

      {/* UPI Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl animate-fade-in">
            {paymentStatus === 'idle' && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-800">Pay ₹{fare}</h3>
                  <button onClick={() => setShowPayment(false)} className="text-slate-400 hover:text-slate-600">✕</button>
                </div>
                <p className="text-sm text-slate-500 mb-4">Select UPI App to pay securely</p>
                <div className="grid grid-cols-2 gap-3">
                  {['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI'].map(app => (
                    <button key={app} onClick={() => processUPI(app)} className="p-4 border border-slate-200 rounded-lg font-medium text-slate-700 hover:border-emerald-500 hover:bg-emerald-50 transition-colors">
                      {app}
                    </button>
                  ))}
                </div>
              </>
            )}
            {paymentStatus === 'processing' && (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-lg font-bold text-slate-800">Processing Payment...</h3>
                <p className="text-sm text-slate-500">Please do not close this window.</p>
              </div>
            )}
            {paymentStatus === 'success' && (
              <div className="text-center py-12">
                <CheckCircle2 size={56} className="text-emerald-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-800">Payment Successful!</h3>
                <p className="text-sm text-slate-500 mt-2">Generating your ticket QR...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}