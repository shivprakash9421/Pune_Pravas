import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
// CRITICAL: This must point to the file we just created above
import { auth } from '../firebase/firebase'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      console.log("Attempting to log in...", email);
      
      // 1. Log in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Success! Logged in as:", userCredential.user.email);
      
      // 2. Check for Admin role
      const tokenResult = await userCredential.user.getIdTokenResult();
      
      if (tokenResult.claims.role === "admin") {
        navigate("/admin"); // Route to admin dashboard
      } else {
        navigate("/"); // Route to home
      }
      
    } catch (error) {
      console.error("FIREBASE ERROR:", error.code, error.message);
      alert("Login Failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#0B1120] font-sans">
      <div className="w-full flex items-center justify-center p-8">
        <form onSubmit={handleLogin} className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-2">Sign in</h2>
          <p className="text-slate-400 mb-8">Access your Pune Pravas dashboard</p>

          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-white border border-slate-700 rounded-xl p-4 focus:border-teal-500 outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-8">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-white border border-slate-700 rounded-xl p-4 focus:border-teal-500 outline-none"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-400 text-slate-900 font-bold py-4 rounded-xl hover:bg-emerald-500 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}