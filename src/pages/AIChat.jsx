import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

const GREETING = "Namaskar! I am your Pune Pravas AI. Ask me about routes, metro timings, buses, parking, or how to buy local train tickets.";

const SUGGESTIONS = [
  "How do I buy a metro ticket?",
  "How do I track a PMPML bus?",
  "How do I plan a route?",
  "How do I book parking?",
];

// Ordered rule list: first matching rule wins. Keep more specific rules above
// their broader fallbacks (e.g. "local ticket" before a bare "ticket" rule).
const RULES = [
  {
    test: (q) => /\b(hi|hello|hey|namaskar|namaste)\b/.test(q),
    reply: "Namaskar! How can I help you get around Pune today?",
  },
  {
    test: (q) => /\b(thank|thanks|thank you)\b/.test(q),
    reply: "You're welcome! Let me know if you need anything else.",
  },
  {
    test: (q) => q.includes('local') && (q.includes('ticket') || q.includes('train')),
    reply: "To buy a Local Train ticket for Pune-Lonavala, go to the 'Local Train' tab, pick your stations, and pay via UPI — a barcode ticket will appear in 'Tickets'.",
  },
  {
    test: (q) => q.includes('metro') && (q.includes('ticket') || q.includes('fare') || q.includes('book')),
    reply: "Metro tickets generate a QR code! Book them in the 'Metro' tab and scan the QR code directly at the Pune Metro AFC gates.",
  },
  {
    test: (q) => q.includes('metro'),
    reply: "The 'Metro' tab shows live train frequencies and lets you book QR tickets for the Pune Metro.",
  },
  {
    test: (q) => q.includes('bus') || q.includes('pmpml') || q.includes('pmpl'),
    reply: "We track PMPML buses live! Open the 'PMPML Bus' tab to see the live map, or use its Source/Destination search to find buses on your route.",
  },
  {
    test: (q) => q.includes('route') || q.includes('planner') || q.includes('direction'),
    reply: "Use the 'Route Planner' tab — enter your starting point and destination and it connects to Google Maps for transit, driving, or walking directions.",
  },
  {
    test: (q) => q.includes('cab') || q.includes('auto') || q.includes('taxi') || q.includes('ola') || q.includes('uber'),
    reply: "Check the 'Cab & Auto' tab to compare live prices across ride-hailing apps before you book.",
  },
  {
    test: (q) => q.includes('park'),
    reply: "Head to the 'Parking' tab to find and reserve parking slots near you in real-time.",
  },
  {
    test: (q) => q.includes('wallet') || q.includes('balance') || q.includes('recharge') || q.includes('add money'),
    reply: "Your 'Wallet' tab shows your MobilityOS balance and payment methods — you can top it up there.",
  },
  {
    test: (q) => q.includes('ticket'),
    reply: "All your booked tickets (metro, local train, bus) live in the 'Tickets' tab with their QR/barcodes.",
  },
  {
    test: (q) => q.includes('notification') || q.includes('alert'),
    reply: "Trip updates and network alerts show up in the 'Notifications' tab (the bell icon).",
  },
  {
    test: (q) => q.includes('profile') || q.includes('account'),
    reply: "You can update your details or sign out from the 'Profile' page.",
  },
];

const getAIResponse = (question) => {
  const q = question.toLowerCase();
  const rule = RULES.find((r) => r.test(q));
  if (rule) return rule.reply;
  return "I can help with Metro tickets, Local train schedules, PMPML buses, parking, or your wallet. Could you tell me a bit more about what you're looking for?";
};

export default function AIChat() {
  const [messages, setMessages] = useState([{ text: GREETING, sender: 'ai' }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, isTyping]);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    setMessages((p) => [...p, { text: trimmed, sender: 'user' }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages((p) => [...p, { text: getAIResponse(trimmed), sender: 'ai' }]);
      setIsTyping(false);
      inputRef.current?.focus();
    }, 700);
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col bg-white rounded-xl shadow border">
      <div className="bg-slate-900 p-4 flex items-center gap-3 text-white font-bold">
        <Bot size={24} className="text-indigo-400" /> Pravas AI Assistant
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex items-end gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.sender === 'ai' && (
              <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
            )}
            <div className={`p-4 rounded-xl text-sm shadow-sm max-w-[80%] ${m.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>
              {m.text}
            </div>
            {m.sender === 'user' && (
              <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0">
                <User size={16} />
              </div>
            )}
          </div>
        ))}
        {isTyping && <div className="text-slate-400 text-sm italic pl-2">AI is typing...</div>}
        {messages.length === 1 && !isTyping && (
          <div className="flex flex-wrap gap-2 pl-9">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => sendMessage(s)}
                className="text-xs px-3 py-1.5 rounded-full border border-indigo-200 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleSend} className="p-4 bg-white border-t flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          disabled={isTyping}
          className="flex-1 p-3 border rounded-full bg-slate-50 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isTyping || !input.trim()}
          className="p-3 bg-indigo-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}