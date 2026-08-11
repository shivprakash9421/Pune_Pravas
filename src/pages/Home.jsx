import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Map, TrainFront, Bus, Car, ChevronRight, Clock, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAppContext();

  const quickActions = [
    { label: 'Plan Route', icon: Map, color: 'text-blue-500', bg: 'bg-blue-50', path: '/route-planner' },
    { label: 'Metro', icon: TrainFront, color: 'text-purple-500', bg: 'bg-purple-50', path: '/metro' },
    { label: 'PMPL Bus', icon: Bus, color: 'text-emerald-500', bg: 'bg-emerald-50', path: '/pmpl' },
    { label: 'Cabs & Auto', icon: Car, color: 'text-amber-500', bg: 'bg-amber-50', path: '/cab-auto' },
  ];

  // ...keep everything from your current file's return statement onward,
  // EXCEPT delete this whole block right before the final closing </div>:
  //
  // {/* 4. TEMPORARY DEVELOPER UI ... */}
  // <div className="bg-red-50 border border-red-200 ...">...Make Me Admin...</div>
}