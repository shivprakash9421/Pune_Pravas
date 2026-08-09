import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [authMode, setAuthMode] = useState('login');
  const [authMethod, setAuthMethod] = useState('email');
  const navigate = useNavigate();

  // Explicitly defined to completely eliminate the ReferenceError
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login form submitted');
  };

  const handleGoogleAuth = () => {
    console.log('Google Auth clicked');
  };

  return (
    <div className="min-h-screen flex w-full font-sans">
      {/* Left Pane - Light Theme */}
      <div className="hidden lg:flex flex-col w-[55%] bg-[#F4F4F5] p-12 justify-center relative">
        <div className="max-w-xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-16">
            <div className="h-10 w-10 bg-[#00D4FF] rounded-lg flex items-center justify-center font-black text-xl text-black">
              P
            </div>
            <div>
              <h1 className="font-black text-xl tracking-wide text-[#0B1120] leading-none">PUNE PRAVAS</h1>
              <p className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase mt-0.5">Smart Mobility Platform</p>
            </div>
          </div>

          <h2 className="text-5xl font-black text-[#0B1120] leading-tight tracking-tight mb-2">
            Pune's transport,<br />
            <span className="text-[#00A3FF]">unified.</span>
          </h2>
          <p className="text-slate-600 mt-6 text-lg max-w-md leading-relaxed">
            Metro, PMPL bus, cab, parking, and route planning — one dashboard, real-time data.
          </p>

          <ul className="mt-12 space-y-4">
            <li className="flex items-center gap-3 text-slate-700 font-medium">
              <div className="h-2 w-2 rounded-full bg-[#00D4FF]"></div>
              Live metro & bus tracking
            </li>
            <li className="flex items-center gap-3 text-slate-700 font-medium">
              <div className="h-2 w-2 rounded-full bg-[#00D4FF]"></div>
              Multi-mode route comparison
            </li>
            <li className="flex items-center gap-3 text-slate-700 font-medium">
              <div className="h-2 w-2 rounded-full bg-[#FFB800]"></div>
              Smart parking slot finder
            </li>
          </ul>

          <div className="absolute bottom-12 left-12 text-xs text-slate-400 font-medium">
            Pune, Maharashtra • MH 12
          </div>
        </div>
      </div>

      {/* Right Pane - Dark Theme */}
      <div className="flex-1 flex flex-col justify-center bg-[#0B1120] px-8 sm:px-16 lg:px-24">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold text-white mb-2">
            {authMode === 'login' ? 'Sign in' : 'Create account'}
          </h2>
          <p className="text-slate-400 text-sm mb-8">
            Access your Pune Pravas dashboard
          </p>

          <div className="flex p-1 bg-[#151E32] rounded-lg mb-8 border border-slate-800">
            <button
              onClick={() => setAuthMethod('email')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                authMethod === 'email' 
                  ? 'bg-[#1E293B] text-[#00D4FF] shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setAuthMethod('phone')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                authMethod === 'phone' 
                  ? 'bg-[#1E293B] text-[#00D4FF] shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Phone
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {authMethod === 'email' ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full bg-[#0B1120] border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-colors placeholder:text-slate-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
                    {authMode === 'login' && (
                      <a href="#" className="text-xs font-medium text-[#00D4FF] hover:text-white transition-colors">Forgot password?</a>
                    )}
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full bg-[#0B1120] border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-colors placeholder:text-slate-600"
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#0B1120] border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-colors placeholder:text-slate-600"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#34D399] hover:bg-[#059669] text-[#0B1120] font-bold py-3 px-4 rounded-lg transition-colors mt-4"
            >
              {authMode === 'login' ? 'Sign in' : 'Sign up'}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center space-x-4">
            <div className="h-px bg-slate-800 flex-1"></div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">OR</span>
            <div className="h-px bg-slate-800 flex-1"></div>
          </div>

          <button 
            onClick={handleGoogleAuth}
            className="w-full mt-8 bg-[#151E32] hover:bg-[#1E293B] border border-slate-800 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-3 cursor-pointer"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <p className="mt-8 text-center text-sm text-slate-400">
            {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setAuthModel ? null : setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              onMouseDown={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              className="text-[#00D4FF] font-bold hover:text-white transition-colors cursor-pointer"
            >
              {authMode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}