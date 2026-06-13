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
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '6px',
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(12,22,40,0.8)',
    border: '1px solid var(--color-border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: '11px 14px',
    color: 'var(--color-text-primary)',
    fontFamily: 'inherit',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.15s',
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'radial-gradient(circle at 20% 10%, rgba(34,193,195,0.09), transparent 35%), radial-gradient(circle at 80% 90%, rgba(109,125,242,0.1), transparent 35%), linear-gradient(180deg, #08111f 0%, #060e1a 100%)',
      position: 'relative',
    }}>
      <div className="app-background" />

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
            <div className="brand-mark">P</div>
            <div>
              <div className="brand-name" style={{ fontSize: '15px', letterSpacing: '0.08em' }}>PUNE PRAVAS</div>
              <div className="brand-subtitle">Smart Mobility Platform</div>
            </div>
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: '850',
            lineHeight: 1.06,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}>
            Pune's transport,<br />
            <span style={{ color: 'var(--color-primary)' }}>unified.</span>
          </h1>

          <p style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
            maxWidth: '340px',
          }}>
            Metro, PMPL bus, cab, parking, and route planning — one dashboard, real-time data.
          </p>

          <div style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              ['Live metro & bus tracking', 'var(--color-primary)'],
              ['Multi-mode route comparison', 'var(--color-success)'],
              ['Smart parking slot finder', 'var(--color-warning)'],
            ].map(([label, color]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '32px', left: '64px', fontSize: '11px', color: 'var(--color-text-muted)' }}>
          Pune, Maharashtra · MH 12
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: '1px', background: 'var(--color-border-subtle)', alignSelf: 'stretch', margin: '40px 0' }} />

      {/* Right form panel */}
      <div style={{
        width: '420px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 44px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '21px', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '6px' }}>
            {isLogin ? 'Sign in' : 'Create account'}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
            {isLogin ? 'Access your Pune Pravas dashboard' : 'Join the smart mobility network'}
          </p>
        </div>

        {/* Method toggle */}
        <div style={{
          display: 'flex', gap: '2px', marginBottom: '22px',
          padding: '3px', background: 'rgba(255,255,255,0.04)',
          borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)',
        }}>
          {['email', 'phone'].map(m => (
            <button key={m} onClick={() => setAuthMethod(m)} style={{
              flex: 1, padding: '8px', borderRadius: '6px', border: 'none',
              background: authMethod === m ? 'rgba(34,193,195,0.12)' : 'transparent',
              color: authMethod === m ? 'var(--color-primary)' : 'var(--color-text-muted)',
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
                  onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                  onBlur={e => e.target.style.borderColor = 'var(--color-border-subtle)'} />
              </div>
            )}
            <div>
              <label style={labelStyle}>Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" style={inputStyle} required
                onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                onBlur={e => e.target.style.borderColor = 'var(--color-border-subtle)'} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={labelStyle}>Password</label>
                {isLogin && (
                  <button type="button" style={{
                    fontSize: '12px', color: 'var(--color-primary)',
                    background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  }}>Forgot password?</button>
                )}
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" style={inputStyle} required
                onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                onBlur={e => e.target.style.borderColor = 'var(--color-border-subtle)'} />
            </div>
            <button type="submit" className="btn-primary"
              style={{ width: '100%', height: '44px', marginTop: '4px', fontSize: '14px' }}>
              {isLogin ? 'Sign in' : 'Create account'}
            </button>
          </form>
        )}

        {authMethod === 'phone' && (
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={labelStyle}>Phone number</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{
                  ...inputStyle, width: '58px', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-text-secondary)', fontSize: '13px',
                }}>+91</div>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="98765 43210" style={{ ...inputStyle, flex: 1 }} required
                  onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                  onBlur={e => e.target.style.borderColor = 'var(--color-border-subtle)'} />
              </div>
            </div>
            <button type="submit" className="btn-primary"
              style={{ width: '100%', height: '44px', marginTop: '4px', fontSize: '14px' }}>
              Send OTP
            </button>
          </form>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '22px 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--color-border-subtle)' }} />
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--color-border-subtle)' }} />
        </div>

        <button onClick={() => onLogin()} style={{
          width: '100%', height: '44px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-default)',
          background: 'rgba(255,255,255,0.04)',
          color: 'var(--color-text-primary)',
          fontFamily: 'inherit', fontSize: '13px', fontWeight: '600',
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '10px', transition: 'background 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: 'var(--color-text-muted)' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setIsLogin(!isLogin)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--color-primary)', fontFamily: 'inherit',
            fontSize: '13px', fontWeight: '700',
          }}>
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .auth-left { display: none !important; }
          .auth-divider { display: none !important; }
          .auth-right { width: 100% !important; padding: 40px 24px !important; }
        }
      `}</style>
    </div>
  );
}