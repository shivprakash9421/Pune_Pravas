import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup 
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebase'; 

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handles Email/Password Sign in AND Sign up
  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }
      
      // Check if they are an admin
      const tokenResult = await userCredential.user.getIdTokenResult();
      if (tokenResult.claims.role === "admin") {
        navigate('/admin'); 
      } else {
        navigate('/'); 
      }
    } catch (err) {
      console.error(err);
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  // Handles Google Sign in
  const handleGoogleAuth = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  return (
    <div className="flex h-screen bg-[#0B1120] font-sans">
      
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-slate-50 items-center justify-center p-12">
        <div>
          <h1 className="text-5xl font-black text-slate-900 mb-4">Pune's transport,<br/><span className="text-blue-500">unified.</span></h1>
          <p className="text-slate-600 text-lg">Metro, PMPL bus, cab, parking, and route planning.</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <form onSubmit={handleAuth} className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? "Sign in" : "Create account"}
          </h2>
          <p className="text-slate-400 mb-8">Access your Pune Pravas dashboard</p>
          
          {error && <p className="text-white bg-red-900/50 border border-red-500 p-3 rounded-lg mb-6 text-sm">{error}</p>}

          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-white border border-slate-700 rounded-xl p-4 focus:border-teal-500 outline-none transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                Password
              </label>
              {isLogin && <button type="button" className="text-xs font-bold text-blue-500 hover:text-blue-400">Forgot password?</button>}
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-white border border-slate-700 rounded-xl p-4 focus:border-teal-500 outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-400 text-slate-900 font-bold py-4 rounded-xl hover:bg-emerald-500 transition-colors mb-6 disabled:opacity-50"
          >
            {loading ? "Processing..." : (isLogin ? "Sign in" : "Sign up")}
          </button>

          <div className="flex items-center justify-center space-x-4 mb-6">
            <hr className="w-1/3 border-slate-700" />
            <span className="text-slate-500 text-xs font-bold uppercase">OR</span>
            <hr className="w-1/3 border-slate-700" />
          </div>

          <button 
            type="button" 
            onClick={handleGoogleAuth}
            className="w-full bg-slate-800 text-white font-bold py-4 rounded-xl hover:bg-slate-700 transition-colors mb-8 flex items-center justify-center gap-3"
          >
            <span className="text-lg">G</span> Continue with Google
          </button>

          <p className="text-center text-slate-400 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" 
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-blue-500 hover:text-blue-400"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}