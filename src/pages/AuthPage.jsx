import React, { useState } from 'react';

export default function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    onLogin();
  };

  const labelStyle = {
    display: 'block',
    fontSize: '11px',
    fontWeight: '700',
    color: '#8b9cb8',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '6px',
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(0,8,20,0.6)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '8px',
    padding: '11px 14px',
    color: '#f5f7fb',
    fontFamily: 'inherit',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.15s',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#e6e6e6', position: 'relative' }}>

      {/* Left branding panel */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 64px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ maxWidth: '400px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '52px' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '10px', flexShrink: 0,
              background: 'linear-gradient(135deg, #00f5ff, #0055ff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', fontWeight: '800', color: '#000',
              boxShadow: '0 0 18px rgba(0,245,255,0.3)',
            }}>P</div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '16px', color: '#0f172a', letterSpacing: '0.08em', textTransform: 'uppercase' }}>PUNE PRAVAS</div>
              <div style={{ fontSize: '11px', color: '#64748b', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Smart Mobility Platform</div>
            </div>
          </div>

          <h1 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: '850', lineHeight: 1.06, color: '#0f172a', marginBottom: '16px' }}>
            Pune's transport,<br />
            <span style={{ color: '#0ea5e9' }}>unified.</span>
          </h1>

          <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, maxWidth: '340px' }}>
            Metro, PMPL bus, cab, parking, and route planning — one dashboard, real-time data.
          </p>

          <div style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              ['Live metro & bus tracking', '#22c1c3'],
              ['Multi-mode route comparison', '#42d3a7'],
              ['Smart parking slot finder', '#f5b84b'],
            ].map(([label, color]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                <span style={{ fontSize: '13px', color: '#334155', fontWeight: '500' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '32px', left: '64px', fontSize: '11px', color: '#94a3b8' }}>
          Pune, Maharashtra · MH 12
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: '1px', background: 'rgba(0,0,0,0.1)', alignSelf: 'stretch', margin: '40px 0' }} />

      {/* Right form panel — dark, floats over light bg */}
      <div style={{
        width: '420px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 44px',
        position: 'relative',
        zIndex: 1,
        background: 'rgba(5,11,26,0.97)',
        borderLeft: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '21px', fontWeight: '800', color: '#f5f7fb', marginBottom: '6px' }}>
            {isLogin ? 'Sign in' : 'Create account'}
          </h2>
          <p style={{ fontSize: '13px', color: '#8b9cb8' }}>
            {isLogin ? 'Access your Pune Pravas dashboard' : 'Join the smart mobility network'}
          </p>
        </div>

        {/* Method toggle */}
        <div style={{
          display: 'flex', gap: '2px', marginBottom: '22px',
          padding: '3px', background: 'rgba(255,255,255,0.04)',
          borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)',
        }}>
          {['email', 'phone'].map(m => (
            <button key={m} onClick={() => setAuthMethod(m)} style={{
              flex: 1, padding: '8px', borderRadius: '6px', border: 'none',
              background: authMethod === m ? 'rgba(34,193,195,0.14)' : 'transparent',
              color: authMethod === m ? '#22c1c3' : '#8b9cb8',
              fontFamily: 'inherit', fontSize: '13px',
              fontWeight: authMethod === m ? '700' : '500',
              cursor: 'pointer', transition: 'all 0.15s',
              textTransform: 'capitalize',
            }}>
              {m === 'email' ? 'Email' : 'Phone'}
            </button>
          ))}
        </div>

        {authMethod === 'email' && (
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {!isLogin && (
              <div>
                <label style={labelStyle}>Full name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Shivprakash Chavan" style={inputStyle} required
                  onFocus={e => e.target.style.borderColor = '#22c1c3'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
              </div>
            )}
            <div>
              <label style={labelStyle}>Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" style={inputStyle} required
                onFocus={e => e.target.style.borderColor = '#22c1c3'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={labelStyle}>Password</label>
                {isLogin && (
                  <button type="button" style={{ fontSize: '12px', color: '#22c1c3', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Forgot password?
                  </button>
                )}
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" style={inputStyle} required
                onFocus={e => e.target.style.borderColor = '#22c1c3'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
            </div>
            <button type="submit" style={{
              width: '100%', height: '44px', marginTop: '4px', fontSize: '14px',
              fontWeight: '800', borderRadius: '8px', border: '1px solid rgba(66,211,167,0.5)',
              background: 'linear-gradient(135deg, #42d3a7, #22c1c3)', color: '#06111f', cursor: 'pointer',
            }}>
              {isLogin ? 'Sign in' : 'Create account'}
            </button>
          </form>
        )}

        {authMethod === 'phone' && (
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={labelStyle}>Phone number</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ ...inputStyle, width: '58px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b5c0cf', fontSize: '13px' }}>+91</div>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="98765 43210" style={{ ...inputStyle, flex: 1 }} required
                  onFocus={e => e.target.style.borderColor = '#22c1c3'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
              </div>
            </div>
            <button type="submit" style={{
              width: '100%', height: '44px', marginTop: '4px', fontSize: '14px',
              fontWeight: '800', borderRadius: '8px', border: '1px solid rgba(66,211,167,0.5)',
              background: 'linear-gradient(135deg, #42d3a7, #22c1c3)', color: '#06111f', cursor: 'pointer',
            }}>
              Send OTP
            </button>
          </form>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '22px 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          <span style={{ fontSize: '11px', color: '#8b9cb8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
        </div>

        <button onClick={() => onLogin()} style={{
          width: '100%', height: '44px', borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.05)', color: '#f5f7fb',
          fontFamily: 'inherit', fontSize: '13px', fontWeight: '600',
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '10px', transition: 'background 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.09)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: '#8b9cb8' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setIsLogin(!isLogin)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#22c1c3', fontFamily: 'inherit', fontSize: '13px', fontWeight: '700',
          }}>
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .auth-left { display: none !important; }
        }
      `}</style>
    </div>
  );
}