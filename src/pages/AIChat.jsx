import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

export default function AIChat() {
  const [messages, setMessages] = useState([{ text: "Namaskar! I am your Pune Pravas AI. Ask me about routes, metro timings, or how to buy local train tickets.", sender: "ai" }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const getAIResponse = (req) => {
    const q = req.toLowerCase();
    if (q.includes('local') && q.includes('ticket')) return "To buy a Local Train ticket for Pune-Lonavala, go to the 'Local Train' tab. Once paid via UPI, a standard barcode ticket will be generated in your 'Tickets' section.";
    if (q.includes('metro') && q.includes('ticket')) return "Metro tickets generate a QR code! Book it in the 'Metro' tab. You'll scan this QR code directly at the Pune Metro AFC gates.";
    if (q.includes('bus') || q.includes('pmpml')) return "We track PMPML buses live! Go to the PMPML Bus tab to see the live map powered by Chartr GPS data.";
    if (q.includes('route') || q.includes('planner')) return "Use the 'Route Planner' tab. It connects directly to Google Maps to give you accurate transit walking and bus/metro combinations.";
    return "I can help with Metro tickets, Local train schedules, or finding your bus. What exactly are you looking for today?";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(p => [...p, { text: input, sender: 'user' }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages(p => [...p, { text: getAIResponse(input), sender: 'ai' }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col bg-white rounded-xl shadow border">
      <div className="bg-slate-900 p-4 flex items-center gap-3 text-white font-bold">
        <Bot size={24} className="text-indigo-400" /> Pravas AI Assistant
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-4 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-4 rounded-xl text-sm shadow-sm ${m.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && <div className="text-slate-400 text-sm italic pl-2">AI is typing...</div>}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleSend} className="p-4 bg-white border-t flex gap-2">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask anything..." className="flex-1 p-3 border rounded-full bg-slate-50" />
        <button type="submit" className="p-3 bg-indigo-600 text-white rounded-full"><Send size={20}/></button>
      </form>
    </div>
  );
}