import React, { useState, useEffect, useMemo } from 'react';

// --- Enhanced Data Models ---
// Added distances (km) from Pune and typical local platform numbers
const STATIONS = [
  { name: "Pune Jn", km: 0, pf: "6" },
  { name: "Shivaji Nagar", km: 2, pf: "1" },
  { name: "Khadki", km: 6, pf: "1" },
  { name: "Dapodi", km: 8, pf: "2" },
  { name: "Kasarwadi", km: 11, pf: "1" },
  { name: "Pimpri", km: 14, pf: "1" },
  { name: "Chinchwad", km: 16, pf: "2" },
  { name: "Akurdi", km: 20, pf: "1" },
  { name: "Dehu Road", km: 25, pf: "3" },
  { name: "Begdewadi", km: 28, pf: "1" },
  { name: "Ghorawadi", km: 31, pf: "1" },
  { name: "Talegaon", km: 34, pf: "2" },
  { name: "Vadgaon", km: 38, pf: "1" },
  { name: "Kanhe", km: 43, pf: "1" },
  { name: "Kamshet", km: 48, pf: "1" },
  { name: "Malavli", km: 56, pf: "1" },
  { name: "Lonavala", km: 64, pf: "3" }
];

// Mock Schedule with base departure times (we calculate intermediate stops dynamically)
const SCHEDULES = {
  PUNE_LON: [
    { no: "99808", time: "06:30" }, { no: "99810", time: "08:05" }, 
    { no: "99814", time: "11:15" }, { no: "99816", time: "15:00" }, 
    { no: "99818", time: "17:15" }, { no: "99822", time: "19:05" }
  ],
  LON_PUNE: [
    { no: "99807", time: "07:30" }, { no: "99809", time: "08:20" }, 
    { no: "99811", time: "10:05" }, { no: "99815", time: "14:50" }, 
    { no: "99817", time: "17:30" }, { no: "99819", time: "19:35" }
  ]
};

// Train speed constant for simulation (mins per km)
const MINS_PER_KM = 1.3; 
const STOP_DURATION = 1; // 1 min halt

// --- Helper Functions ---
const parseTime = (timeStr) => {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};

const formatTime = (totalMins) => {
  const h = Math.floor(totalMins / 60) % 24;
  const m = Math.floor(totalMins % 60);
  const d = new Date();
  d.setHours(h, m);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

// --- Icons ---
const TrainIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#00f5ff" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-3.5-3.58-4-8-4s-8 .5-8 4v8zm4 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm8 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
    <path d="M12 2L12 4M8 22L10 18M16 22L14 18" stroke="#00f5ff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function Local() {
  const [direction, setDirection] = useState('PUNE_LON');
  const [currentMins, setCurrentMins] = useState(0);
  const [selectedTrain, setSelectedTrain] = useState(null); // Holds details of clicked train

  // Live Clock Update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentMins(now.getHours() * 60 + now.getMinutes());
    };
    updateTime();
    const int = setInterval(updateTime, 30000); // update every 30s
    return () => clearInterval(int);
  }, []);

  // Generate full route with arrival/dep times for a specific train
  const generateTrainRoute = (train, dir) => {
    const routeStations = dir === 'PUNE_LON' ? STATIONS : [...STATIONS].reverse();
    let accumMins = parseTime(train.time);
    let prevKm = routeStations[0].km;

    return routeStations.map((station, index) => {
      const distance = Math.abs(station.km - prevKm);
      const travelTime = distance * MINS_PER_KM;
      
      accumMins += travelTime;
      const arr = accumMins;
      accumMins += (index === 0 || index === routeStations.length - 1) ? 0 : STOP_DURATION;
      const dep = accumMins;
      prevKm = station.km;

      let status = 'UPCOMING';
      if (currentMins > dep) status = 'PASSED';
      else if (currentMins >= arr && currentMins <= dep) status = 'HALTED';
      else if (index > 0 && currentMins > (arr - travelTime) && currentMins < arr) status = 'RUNNING';

      return {
        ...station,
        arr: formatTime(arr),
        dep: formatTime(dep),
        arrRaw: arr,
        depRaw: dep,
        status
      };
    });
  };

  // Compute list of all trains and their current summary status
  const activeTrainsList = useMemo(() => {
    return SCHEDULES[direction].map(train => {
      const route = generateTrainRoute(train, direction);
      const start = route[0];
      const end = route[route.length - 1];
      
      let currentStatusStr = `Departs ${start.dep} from ${start.name}`;
      let state = 'UPCOMING';
      
      if (currentMins >= end.arrRaw) {
        currentStatusStr = `Reached ${end.name} at ${end.arr}`;
        state = 'COMPLETED';
      } else if (currentMins >= start.depRaw) {
        state = 'ACTIVE';
        const runningTowards = route.find(s => s.status === 'RUNNING' || s.status === 'HALTED' || s.status === 'UPCOMING');
        if (runningTowards) {
          currentStatusStr = runningTowards.status === 'HALTED' 
            ? `At ${runningTowards.name} (PF ${runningTowards.pf})` 
            : `Next stop: ${runningTowards.name} at ${runningTowards.arr}`;
        }
      }

      return { ...train, route, currentStatusStr, state, start, end };
    }).filter(t => t.state !== 'COMPLETED'); // Hide completed trains
  }, [direction, currentMins]);


  // --- Render Functions ---

  const renderTrainList = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.4)', padding: '12px 16px', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '18px', color: '#fff', margin: 0 }}>Pune ⇄ Lonavala</h2>
        <button 
          onClick={() => setDirection(d => d === 'PUNE_LON' ? 'LON_PUNE' : 'PUNE_LON')}
          style={{ background: 'rgba(0, 245, 255, 0.1)', border: '1px solid #00f5ff', color: '#00f5ff', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}
        >
          Swap Direction ⇅
        </button>
      </div>

      {activeTrainsList.length === 0 ? (
        <p style={{ color: '#94a3b8', textAlign: 'center' }}>No active trains right now.</p>
      ) : (
        activeTrainsList.map(train => (
          <div 
            key={train.no} 
            onClick={() => setSelectedTrain(train)}
            style={{ 
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '12px', padding: '16px', cursor: 'pointer', transition: 'background 0.2s',
              borderLeft: train.state === 'ACTIVE' ? '4px solid #00ff88' : '4px solid rgba(255,255,255,0.2)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ color: '#fff', fontWeight: '700', fontSize: '16px' }}>Local {train.no}</div>
              <div style={{ color: train.state === 'ACTIVE' ? '#00ff88' : '#94a3b8', fontSize: '12px', fontWeight: '600' }}>
                {train.state === 'ACTIVE' ? 'LIVE NOW' : 'SCHEDULED'}
              </div>
            </div>
            <div style={{ color: '#00f5ff', fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>
              {train.currentStatusStr}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
              <span>{train.start.name} ({train.start.dep})</span>
              <span>{train.end.name} ({train.end.arr})</span>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderDetailedTracker = () => {
    // Recompute route live just in case time ticks while viewing
    const route = generateTrainRoute(selectedTrain, direction);

    return (
      <div style={{ background: 'rgba(6, 13, 31, 0.9)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
        
        {/* Header Bar */}
        <div style={{ background: 'linear-gradient(90deg, rgba(0, 245, 255, 0.1), transparent)', padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 10, backdropFilter: 'blur(10px)' }}>
          <button 
            onClick={() => setSelectedTrain(null)}
            style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '24px', cursor: 'pointer', padding: 0 }}
          >
            ←
          </button>
          <div>
            <div style={{ color: '#fff', fontWeight: '700', fontSize: '18px' }}>Train {selectedTrain.no}</div>
            <div style={{ color: '#00f5ff', fontSize: '12px' }}>{direction === 'PUNE_LON' ? 'Pune to Lonavala' : 'Lonavala to Pune'}</div>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div style={{ padding: '24px 16px', position: 'relative' }}>
          
          {/* Background vertical line */}
          <div style={{ position: 'absolute', left: '42px', top: '40px', bottom: '40px', width: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }} />

          {route.map((station, i) => {
            const isPassed = station.status === 'PASSED';
            const isCurrent = station.status === 'HALTED' || station.status === 'RUNNING';
            
            // Text color logic based on status
            const textColor = isPassed ? '#475569' : (isCurrent ? '#fff' : '#cbd5e1');
            const timeColor = isPassed ? '#334155' : (isCurrent ? '#00f5ff' : '#64748b');
            const dotColor = isPassed ? '#334155' : (isCurrent ? '#00f5ff' : '#cbd5e1');

            return (
              <div key={i} style={{ display: 'flex', position: 'relative', marginBottom: '32px', opacity: isPassed ? 0.6 : 1 }}>
                
                {/* Timeline Column (Distances & Nodes) */}
                <div style={{ width: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                  <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px' }}>{station.km} km</div>
                  
                  {/* Node Circle */}
                  <div style={{ 
                    width: isCurrent ? '16px' : '12px', 
                    height: isCurrent ? '16px' : '12px', 
                    borderRadius: '50%', 
                    background: isCurrent ? '#060d1f' : dotColor, 
                    border: isCurrent ? `4px solid #00f5ff` : 'none',
                    boxShadow: isCurrent ? '0 0 10px #00f5ff' : 'none',
                    transition: 'all 0.3s'
                  }} />

                  {/* Draw Train between nodes if running */}
                  {station.status === 'RUNNING' && i > 0 && (
                     <div style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', background: '#060d1f', padding: '4px', borderRadius: '50%', border: '1px solid #00f5ff', animation: 'pulse 1.5s infinite' }}>
                       <TrainIcon />
                     </div>
                  )}
                  {/* Draw Train on node if halted */}
                  {station.status === 'HALTED' && (
                     <div style={{ position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)', background: '#060d1f', padding: '4px', borderRadius: '50%', border: '1px solid #00ff88', animation: 'pulse 1.5s infinite' }}>
                       <TrainIcon />
                     </div>
                  )}
                </div>

                {/* Details Column */}
                <div style={{ flex: 1, paddingLeft: '16px', display: 'flex', justifyContent: 'space-between', paddingTop: '16px' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: isCurrent ? '700' : '500', color: textColor }}>
                      {station.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                      Platform {station.pf}
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: timeColor }}>
                      {station.arr}
                    </div>
                    {i !== 0 && i !== route.length - 1 && (
                       <div style={{ fontSize: '11px', color: '#64748b' }}>Dep: {station.dep}</div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* CSS for pulsing animation */}
        <style>{`
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(0, 245, 255, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(0, 245, 255, 0); }
            100% { box-shadow: 0 0 0 0 rgba(0, 245, 255, 0); }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', paddingBottom: '40px' }}>
      {!selectedTrain ? renderTrainList() : renderDetailedTracker()}
    </div>
  );
}