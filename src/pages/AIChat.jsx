import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

export default function AIChat() {
  const [messages] = useState([
    { role: 'ai', content: 'Hello! I am your Pune Pravas assistant. I can help you plan routes, check ticket balances, or find parking.' },
    { role: 'user', content: 'What is the fastest way from FC Road to Viman Nagar right now?' },
    { role: 'ai', content: 'Currently, the fastest route (45 mins) is taking an Auto to Shivajinagar Metro Station, riding the Aqua line to Ramwadi, and then taking a quick feeder bus. The total cost will be approximately ₹80.' }
  ]);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] animate-fade-in max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">AI Assistant</h1>
        <p className="text-[var(--color-text-secondary)] mt-1 mb-6">Ask anything about Pune transit and your wallet.</p>
      </div>

      <div className="flex-1 bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] border border-[var(--color-border)] flex flex-col overflow-hidden">
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center ${msg.role === 'ai' ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]' : 'bg-[var(--color-navy)] text-white'}`}>
                {msg.role === 'ai' ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className={`max-w-[75%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] rounded-tr-none' : 'bg-white border border-[var(--color-border)] text-[var(--color-text-secondary)] shadow-sm rounded-tl-none'}`}>
                <p className="leading-relaxed text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-[var(--color-bg)] border-t border-[var(--color-border)]">
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Ask about routes, fares, or parking..." 
              className="w-full pl-4 pr-12 py-4 bg-white border border-[var(--color-border-strong)] rounded-full focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] shadow-sm transition-all"
            />
            <button className="absolute right-2 h-10 w-10 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-full flex items-center justify-center transition-colors">
              <Send size={18} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}