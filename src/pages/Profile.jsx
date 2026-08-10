import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';

export default function Profile() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="p-8 text-white w-full">
      <h1 className="text-4xl font-bold mb-2">My Profile</h1>
      <p className="text-slate-400 mb-8">Manage your Pune Pravas account and settings.</p>
      
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-md">
        <h2 className="text-xl font-bold mb-4">Account Actions</h2>
        <button 
          onClick={handleSignOut} 
          className="w-full bg-red-500/10 text-red-500 border border-red-500 font-bold py-3 rounded-xl hover:bg-red-500 hover:text-white transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}