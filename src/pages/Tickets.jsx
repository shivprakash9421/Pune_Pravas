import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Barcode from 'react-barcode';
import { TrainFront, TrainTrack, Bus } from 'lucide-react';
import { subscribeToMyTickets, markTicketUsed } from '../services/tickets';

const ICONS = {
  metro: <TrainFront size={24} className="text-purple-600" />,
  local: <TrainTrack size={24} className="text-red-600" />,
  bus: <Bus size={24} className="text-emerald-600" />
};

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => subscribeToMyTickets(setTickets), []);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <h1 className="text-3xl font-bold text-slate-800">My Tickets</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Ticket List */}
        <div className="space-y-4">
          {tickets.map(ticket => (
            <div 
              key={ticket.id} 
              onClick={() => setSelectedTicket(ticket)}
              className={`p-4 bg-white rounded-xl shadow-sm border-2 cursor-pointer transition-all ${
                selectedTicket?.id === ticket.id ? 'border-blue-500' : 'border-slate-200'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  {ticket.route === 'Local Train' ? ICONS.local : (ticket.type === 'metro' ? ICONS.metro : ICONS.bus)}
                  <span className="font-bold text-slate-800 uppercase tracking-wide">
                    {ticket.route === 'Local Train' ? 'Pune Local' : ticket.type}
                  </span>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                  {ticket.status}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-700">{ticket.from} ➔ {ticket.to}</p>
              <p className="text-xs text-slate-500 mt-1">₹{ticket.fare} • {new Date(ticket.purchasedAt).toLocaleString()}</p>
            </div>
          ))}
          {tickets.length === 0 && <p className="text-slate-500">No tickets purchased yet.</p>}
        </div>

        {/* Selected Ticket View */}
        {selectedTicket && (
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center sticky top-24 h-fit animate-fade-in">
            <h2 className="text-xl font-bold text-slate-800 mb-6 uppercase tracking-widest border-b pb-4">
              {selectedTicket.route === 'Local Train' ? 'Unreserved Ticketing System' : 'Pune Metro QR Ticket'}
            </h2>
            
            {/* Conditional Ticket Generation */}
            <div className="flex justify-center mb-6">
              {selectedTicket.type === 'metro' && selectedTicket.route !== 'Local Train' ? (
                <div className="p-4 border-4 border-purple-100 rounded-xl bg-white shadow-inner">
                   <QRCodeSVG value={selectedTicket.id} size={180} />
                </div>
              ) : (
                <div className="bg-white overflow-hidden">
                   <Barcode value={selectedTicket.id.slice(0, 10).toUpperCase()} width={2} height={80} displayValue={true} />
                </div>
              )}
            </div>

            <div className="space-y-2 mb-8 text-left bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider">Journey</p>
              <p className="text-lg font-bold text-slate-800">{selectedTicket.from} <span className="text-slate-400 mx-2">➔</span> {selectedTicket.to}</p>
              
              <div className="flex justify-between mt-4 pt-4 border-t border-slate-200">
                <div>
                  <p className="text-xs text-slate-500 uppercase">Fare</p>
                  <p className="text-xl font-bold text-slate-800">₹{selectedTicket.fare}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase">Date</p>
                  <p className="text-sm font-bold text-slate-800">{new Date(selectedTicket.purchasedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {selectedTicket.status !== 'used' && (
              <button 
                onClick={() => markTicketUsed(selectedTicket.id)}
                className="w-full py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
              >
                Mark as Used (Demo)
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}