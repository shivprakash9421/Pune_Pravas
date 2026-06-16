import React, { useState, useRef, useEffect } from 'react';

const SUGGESTIONS = [
  'What is the fastest route from FC Road to COEP?',
  'Compare metro vs bus for Kothrud to Hinjewadi',
  'How do I get a monthly PMPL pass?',
  'Is parking available near Shivajinagar station?',
  'What time does the last metro leave Swargate?',
];

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const BotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="9" cy="16" r="1"/><circle cx="15" cy="16" r="1"/>
    <path d="M9 7V5m6 2V5M12 5a2 2 0 100-4 2 2 0 000 4z"/>
  </svg>
);

const buildLocalReply = (message) => {
  const text = message.toLowerCase();

  if (text.includes('parking')) {
    return 'For Shivajinagar and nearby central areas, check live parking before leaving. Bund Garden, JM Road, and station-side lots usually work best for short stays. Reserve early during evening peak hours.';
  }
  if (text.includes('pass') || text.includes('monthly')) {
    return 'For regular PMPL use, a monthly pass is usually better value than daily tickets. Keep your ID ready, choose the route or all-route option, and renew before the last active day to avoid queue time.';
  }
  if (text.includes('metro') && text.includes('bus')) {
    return 'Metro is usually faster and more predictable for corridor travel. PMPL is better for last-mile coverage and lower fare. For Kothrud to Hinjewadi, compare total walking time before choosing.';
  }
  if (text.includes('last metro') || text.includes('time')) {
    return 'Metro timings vary by line and station. For planning, keep a 15 minute buffer near closing time and confirm the last train from the station screen before entry.';
  }
  if (text.includes('fastest') || text.includes('route')) {
    return 'For fastest travel, choose metro where both ends are close to stations, then use PMPL or auto for the final stretch. Avoid cab-only routes around FC Road and Shivajinagar during peak traffic.';
  }

  return 'A good default is to compare three things: total travel time, walking distance, and fare. For Pune, metro plus a short PMPL or auto connection is often the most reliable balanced route.';
};

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello. I am MobilityAI, your smart transport assistant for Pune. I can help you plan routes, find the best transport options, check schedules, and answer any questions about PMPL, Metro, and Cab services. How can I assist you today?",
      time: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');

    const userMsg = { role: 'user', content: msg, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 450));
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: buildLocalReply(msg),
        time: new Date(),
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I am experiencing connectivity issues. Please check your connection and try again.',
        time: new Date(),
        error: true,
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px - 48px)', maxHeight: '800px', minHeight: '480px', width: '100%' }}>

      {/* Header */}
      <div className="glass-card" style={{
        padding: '16px 20px',
        display: 'flex', alignItems: 'center', gap: '14px',
        borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        borderBottom: 'none', flexShrink: 0,
      }}>
        <div className="icon-circle" style={{
          width: '44px', height: '44px',
          background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))',
          border: 'none', color: '#fff',
          boxShadow: '0 0 20px rgba(0,102,255,0.4)',
        }}>
          <BotIcon />
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '15px' }}>MobilityAI</div>
          <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--neon-green)' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />
            Pune transport expert
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          <span className="badge badge-cyan">Smart</span>
          <span className="badge badge-green">Live</span>
        </div>
      </div>

      {/* Messages */}
      <div className="glass-card" style={{
        flex: 1, overflowY: 'auto', padding: '20px', borderRadius: 0,
        border: '1px solid var(--border-default)', borderTop: 'none', borderBottom: 'none',
        display: 'flex', flexDirection: 'column', gap: '16px', minHeight: 0,
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
            gap: '12px', alignItems: 'flex-start',
          }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
              background: msg.role === 'user'
                ? 'linear-gradient(135deg, var(--neon-cyan), var(--neon-blue))'
                : 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: '700', color: '#000',
            }}>
              {msg.role === 'user' ? 'U' : <BotIcon />}
            </div>

            <div style={{
              maxWidth: '78%',
              padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
              background: msg.role === 'user'
                ? 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(0,102,255,0.15))'
                : 'rgba(0,0,0,0.3)',
              border: `1px solid ${msg.role === 'user' ? 'rgba(0,245,255,0.3)' : 'var(--border-subtle)'}`,
              ...(msg.error ? { borderColor: 'rgba(255,51,102,0.3)' } : {}),
              minWidth: 0,
            }}>
              <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0, wordBreak: 'break-word' }}>
                {msg.content}
              </p>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                {msg.time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <BotIcon />
            </div>
            <div style={{
              padding: '14px 18px', borderRadius: '4px 16px 16px 16px',
              background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)',
              display: 'flex', gap: '5px', alignItems: 'center',
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: 'var(--neon-cyan)',
                  animation: `pulse-glow 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div style={{
          padding: '12px 16px', background: 'rgba(6,13,31,0.9)',
          border: '1px solid var(--border-subtle)', borderTop: 'none', borderBottom: 'none',
          display: 'flex', gap: '8px', overflowX: 'auto', flexShrink: 0,
        }}>
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              onClick={() => sendMessage(s)}
              style={{
                padding: '7px 14px', borderRadius: '20px',
                background: 'var(--neon-cyan-dim)', border: '1px solid var(--border-default)',
                color: 'var(--text-secondary)', fontSize: '12px', cursor: 'pointer',
                whiteSpace: 'nowrap', flexShrink: 0,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="glass-card" style={{
        padding: '14px 16px', borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
        borderTop: 'none', display: 'flex', gap: '10px', alignItems: 'flex-end', flexShrink: 0,
      }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask about routes, schedules, fares, parking..."
          rows={1}
          style={{
            flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)', color: 'var(--text-primary)',
            fontSize: '14px', padding: '12px 14px', resize: 'none', outline: 'none',
            lineHeight: 1.5, maxHeight: '120px', overflowY: 'auto', minWidth: 0,
          }}
          onInput={e => {
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
          }}
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
          className="btn-primary"
          style={{ padding: '12px 18px', opacity: (!input.trim() || loading) ? 0.5 : 1, flexShrink: 0 }}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}