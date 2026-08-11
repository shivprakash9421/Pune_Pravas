import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

export default function AIChat() {
  const [messages, setMessages] = useState([
    { text: "Namaskar! I am your Pune Pravas AI Assistant. How can I help you navigate the city today?", sender: "ai" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes('ticket') || q.includes('buy') || q.includes('pass')) {
      return "You can buy Metro and Local train tickets, as well as PMPML digital passes, directly from their respective tabs in the sidebar menu. Simply select your origin and destination, and pay securely via UPI!";
    } else if (q.includes('time') || q.includes('last train') || q.includes('first train')) {
      return "The Pune Metro operates from 6:00 AM to 10:00 PM daily. The Pune-Lonavala local trains run from roughly 12:15 AM to 11:30 PM. Let me know which specific route you need!";
    } else if (q.includes('airport') || q.includes('aeromall')) {
      return "To reach Pune Airport (Lohegaon), you can take the Aqua Line Metro to Ramwadi Station, and from there, PMPML feeder buses (Route 34) run continuously to the Aeromall.";
    } else {
      return "I can help you with ticket bookings, live timetables, and transit routes around Pune. Could you provide a bit more detail about your journey?";
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage = { text: generateAIResponse(userMessage.text), sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 p-4 flex items-center gap-3">
        <div className="p-2 bg-indigo-500 rounded-full text-white">
          <Bot size={24} />
        </div>
        <div>
          <h2 className="text-white font-bold">Pravas AI Guide</h2>
          <p className="text-slate-400 text-xs">Always online • Ask me about routes & tickets</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot size={18} className="text-indigo-600" />
              </div>
            )}
            <div className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-sm' 
                : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm'
            }`}>
              {msg.text}
            </div>
            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                <User size={18} className="text-blue-600" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-4 justify-start animate-pulse">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
               <Bot size={18} className="text-indigo-600" />
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-sm shadow-sm flex gap-1">
              <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about tickets, timings, or routes..."
            className="flex-1 p-3 border border-slate-300 bg-slate-50 rounded-full focus:outline-none focus:border-indigo-500 px-6 text-slate-700"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-md"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}