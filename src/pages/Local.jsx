import React, { useState, useEffect, useMemo } from 'react';

// --- Data Models & Constants ---
const STATIONS = [
  "Pune Jn", "Shivaji Nagar", "Khadki", "Dapodi", "Kasarwadi",
  "Pimpri", "Chinchwad", "Akurdi", "Dehu Road", "Begdewadi",
  "Ghorawadi", "Talegaon", "Vadgaon", "Kanhe", "Kamshet",
  "Malavli", "Lonavala"
];

// Mock Timetable (24H format)
const PUNE_TO_LONAVALA = [
  { trainNo: "99806", dep: "05:45", arr: "07:05" },
  { trainNo: "99808", dep: "06:30", arr: "07:50" },
  { trainNo: "99810", dep: "08:05", arr: "09:25" },
  { trainNo: "99814", dep: "11:15", arr: "12:35" },
  { trainNo: "99816", dep: "15:00", arr: "16:20" },
  { trainNo: "99818", dep: "17:15", arr: "18:35" },
  { trainNo: "99822", dep: "19:05", arr: "20:25" },
  { trainNo: "99824", dep: "21:00", arr: "22:20" },
];

const LONAVALA_TO_PUNE = [
  { trainNo: "99805", dep: "05:20", arr: "06:40" },
  { trainNo: "99807", dep: "07:30", arr: "08:50" },
  { trainNo: "99809", dep: "08:20", arr: "09:40" },
  { trainNo: "99811", dep: "10:05", arr: "11:25" },
  { trainNo: "99815", dep: "14:50", arr: "16:10" },
  { trainNo: "99817", dep: "17:30", arr: "18:50" },
  { trainNo: "99819", dep: "19:35", arr: "20:55" },
  { trainNo: "99821", dep: "21:45", arr: "23:05" },
];

// Utility: Convert HH:MM to minutes from midnight
const timeToMinutes = (timeStr) => {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};

// Utility: Format minutes to 12H AM/PM
const formatTime = (timeStr) => {
  const [h, m] = timeStr.split(':');
  const d = new Date();
  d.setHours(h, m);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

// --- Main Component ---
export default function Local() {
  const [activeTab, setActiveTab] = useState('live'); // 'live', 'book', 'tickets'
  const [direction, setDirection] = useState('PUNE_LON'); // 'PUNE_LON' or 'LON_PUNE'
  
  // Booking State
  const [source, setSource] = useState(STATIONS[0]);
  const [destination, setDestination] = useState(STATIONS[STATIONS.length - 1]);
  const [ticketClass, setTicketClass] = useState('II'); // 'II', 'I'
  const [myTickets, setMyTickets] = useState([]);

  // Live Time State
  const [currentMinutes, setCurrentMinutes] = useState(0);

  // Update clock every minute for live tracking
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentMinutes(now.getHours() * 60 + now.getMinutes());
    };
    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  // Calculate live train positions
  const activeTrains = useMemo(() => {
    const schedule = direction === 'PUNE_LON' ? PUNE_TO_LONAVALA : LONAVALA_TO_PUNE;
    const stations = direction === 'PUNE_LON' ? STATIONS : [...STATIONS].reverse();
    
    return schedule.map(train => {
      const depMins = timeToMinutes(train.dep);
      const arrMins = timeToMinutes(train.arr);
      const totalDuration = arrMins - depMins;
      
      let status = 'UPCOMING';
      let progress = 0;
      let currentStationIndex = 0;

      if (currentMinutes >= arrMins) {
        status = 'COMPLETED';
        progress = 100;
        currentStationIndex = stations.length - 1;
      } else if (currentMinutes >= depMins && currentMinutes < arrMins) {
        status = 'RUNNING';
        progress = ((currentMinutes - depMins) / totalDuration) * 100;
        // Estimate station index based on progress
        currentStationIndex = Math.floor((progress / 100) * (stations.length - 1));
      }

      return {
        ...train,
        status,
        progress,
        currentStation: stations[currentStationIndex],
        nextStation: stations[Math.min(currentStationIndex + 1, stations.length - 1)]
      };
    }).filter(t => t.status === 'RUNNING' || t.status === 'UPCOMING');
  }, [currentMinutes, direction]);

  // Handle Fare Calculation
  const getFare = () => {
    const idx1 = STATIONS.indexOf(source);
    const idx2 = STATIONS.indexOf(destination);
    if (idx1 === idx2) return 0;
    
    const distance = Math.abs(idx1 - idx2);
    // Simulated fare logic
    const baseII = 5;
    const baseI = 50;
    
    const fareII = Math.min(30, baseII + Math.floor(distance * 1.5));
    const fareI = Math.min(150, baseI + Math.floor(distance * 6));
    
    return ticketClass === 'II' ? fareII : fareI;
  };

  const handleBookTicket = () => {
    const fare = getFare();
    if (fare === 0) {
      alert("Source and Destination cannot be the same.");
      return;
    }

    const newTicket = {
      id: `PNQ-${Math.floor(Math.random() * 1000000)}`,
      source,
      destination,
      ticketClass,
      fare,
      date: new Date().toLocaleDateString('en-IN'),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      validUntil: new Date(Date.now() + 2 * 60 * 60 * 1000).toLocaleTimeString('en-IN') // 2 hrs validity
    };

    setMyTickets([newTicket, ...myTickets]);
    setActiveTab('tickets');
  };

  // --- Styled Components (Inline for portability) ---
  const tabStyle = (isActive) => ({
    flex: 1,
    padding: '12px 0',
    textAlign: 'center',
    background: isActive ? 'rgba(0, 245, 255, 0.1)' : 'transparent',
    color: isActive ? '#00f5ff' : '#94a3b8',
    borderBottom: isActive ? '2px solid #00f5ff' : '2px solid transparent',
    cursor: 'pointer',
    fontWeight: isActive ? '600' : '500',
    fontSize: '14px',
    transition: 'all 0.2s',
  });

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '20px'
  };

  const selectStyle = {
    width: '100%',
    padding: '12px',
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    color: '#fff',
    outline: 'none',
    fontSize: '14px',
    marginTop: '6px'
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '40px' }}>
      
      {/* Header & Direction Toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', margin: 0 }}>Local Trains</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>Pune - Lonavala Suburban Network</p>
        </div>

        <button 
          onClick={() => setDirection(d => d === 'PUNE_LON' ? 'LON_PUNE' : 'PUNE_LON')}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            color: '#8b5cf6', padding: '10px 16px', borderRadius: '24px',
            cursor: 'pointer', fontWeight: '600', fontSize: '13px'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/></svg>
          {direction === 'PUNE_LON' ? 'Pune → Lonavala' : 'Lonavala → Pune'}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px' }}>
        <div style={tabStyle(activeTab === 'live')} onClick={() => setActiveTab('live')}>Live Tracking</div>
        <div style={tabStyle(activeTab === 'book')} onClick={() => setActiveTab('book')}>Timetable & Book</div>
        <div style={tabStyle(activeTab === 'tickets')} onClick={() => setActiveTab('tickets')}>
          My Tickets {myTickets.length > 0 && <span style={{background: '#00f5ff', color: '#000', padding: '2px 6px', borderRadius: '10px', fontSize: '11px', marginLeft: '6px'}}>{myTickets.length}</span>}
        </div>
      </div>

      {/* TAB 1: Live Tracking */}
      {activeTab === 'live' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{...cardStyle, background: 'linear-gradient(145deg, rgba(0, 245, 255, 0.05), rgba(139, 92, 246, 0.05))'}}>
            <h3 style={{ color: '#fff', margin: '0 0 16px 0', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 8px #00ff88' }} />
              Active Trains on Route
            </h3>

            {activeTrains.filter(t => t.status === 'RUNNING').length === 0 ? (
               <p style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'center', padding: '20px 0' }}>No trains currently running. Check upcoming schedule.</p>
            ) : (
              activeTrains.filter(t => t.status === 'RUNNING').map((train, i) => (
                <div key={i} style={{ padding: '16px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', marginBottom: '12px', borderLeft: '4px solid #00f5ff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ color: '#fff', fontWeight: '700', fontSize: '16px' }}>Train #{train.trainNo}</div>
                    <div style={{ color: '#00f5ff', fontSize: '13px', fontWeight: '600' }}>Running</div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
                    <span>Dep: {formatTime(train.dep)}</span>
                    <span>Arr: {formatTime(train.arr)}</span>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{ width: `${train.progress}%`, height: '100%', background: 'linear-gradient(90deg, #00f5ff, #8b5cf6)', borderRadius: '4px', transition: 'width 1s linear' }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#fff' }}>
                    <span>Near: <span style={{color: '#8b5cf6', fontWeight: '600'}}>{train.currentStation}</span></span>
                    <span>Next: {train.nextStation}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <h3 style={{ color: '#fff', marginTop: '8px', fontSize: '16px' }}>Upcoming Departures</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
             {activeTrains.filter(t => t.status === 'UPCOMING').slice(0, 4).map((train, i) => (
                <div key={i} style={{...cardStyle, marginBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <div style={{ color: '#fff', fontWeight: '600', fontSize: '15px' }}>#{train.trainNo} Local</div>
                    <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>Pune ↔ Lonavala</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#00f5ff', fontWeight: '700', fontSize: '16px' }}>{formatTime(train.dep)}</div>
                    <div style={{ color: '#94a3b8', fontSize: '12px' }}>ETA {formatTime(train.arr)}</div>
                  </div>
                </div>
             ))}
          </div>

        </div>
      )}

      {/* TAB 2: Timetable & Booking */}
      {activeTab === 'book' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Booking Widget */}
          <div style={{...cardStyle, position: 'relative'}}>
            <h3 style={{ color: '#fff', margin: '0 0 20px 0', fontSize: '18px' }}>Book Ticket</h3>
            
            <div style={{ display: 'flex', gap: '16px', flexDirection: window.innerWidth < 600 ? 'column' : 'row' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>From Station</label>
                <select style={selectStyle} value={source} onChange={e => setSource(e.target.value)}>
                  {STATIONS.map(s => <option key={`src-${s}`} value={s} style={{background: '#060d1f'}}>{s}</option>)}
                </select>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '10px' }}>
                <button 
                  onClick={() => { const temp = source; setSource(destination); setDestination(temp); }}
                  style={{ background: 'rgba(0, 245, 255, 0.1)', border: '1px solid rgba(0, 245, 255, 0.3)', color: '#00f5ff', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  ⇄
                </button>
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>To Station</label>
                <select style={selectStyle} value={destination} onChange={e => setDestination(e.target.value)}>
                  {STATIONS.map(s => <option key={`dst-${s}`} value={s} style={{background: '#060d1f'}}>{s}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
              <div style={{ flex: 1 }}>
                 <label style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Class</label>
                 <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    <button 
                      onClick={() => setTicketClass('II')}
                      style={{ flex: 1, padding: '10px', borderRadius: '8px', border: ticketClass === 'II' ? '1px solid #00f5ff' : '1px solid rgba(255,255,255,0.2)', background: ticketClass === 'II' ? 'rgba(0,245,255,0.1)' : 'transparent', color: '#fff', cursor: 'pointer', transition: 'all 0.2s' }}
                    >Second (II)</button>
                    <button 
                      onClick={() => setTicketClass('I')}
                      style={{ flex: 1, padding: '10px', borderRadius: '8px', border: ticketClass === 'I' ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.2)', background: ticketClass === 'I' ? 'rgba(139,92,246,0.1)' : 'transparent', color: '#fff', cursor: 'pointer', transition: 'all 0.2s' }}
                    >First (I)</button>
                 </div>
              </div>
            </div>

            {/* Fare Summary & CTA */}
            <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Total Fare</div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#00ff88' }}>₹{getFare()}</div>
              </div>
              <button 
                onClick={handleBookTicket}
                style={{ background: 'linear-gradient(135deg, #00f5ff, #0066ff)', color: '#000', border: 'none', padding: '14px 28px', borderRadius: '8px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0, 245, 255, 0.3)' }}
              >
                Pay & Book
              </button>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: My Tickets */}
      {activeTab === 'tickets' && (
        <div>
          {myTickets.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
               <svg style={{margin: '0 auto 16px', display: 'block'}} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
               <p>No active tickets found.</p>
               <button onClick={() => setActiveTab('book')} style={{background: 'transparent', border: '1px solid #00f5ff', color: '#00f5ff', padding: '8px 16px', borderRadius: '6px', marginTop: '12px', cursor: 'pointer'}}>Book a Ticket</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {myTickets.map(ticket => (
                <div key={ticket.id} style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.5) 100%)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                  
                  {/* Ticket Header */}
                  <div style={{ padding: '16px 20px', background: 'rgba(0, 245, 255, 0.1)', borderBottom: '1px dashed rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#00f5ff', fontWeight: '700', letterSpacing: '0.1em', fontSize: '14px' }}>PUNE PRAVAS PASS</span>
                    <span style={{ color: '#fff', fontSize: '14px' }}>{ticket.id}</span>
                  </div>

                  {/* Ticket Body */}
                  <div style={{ padding: '24px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <div>
                          <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Source</div>
                          <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>{ticket.source}</div>
                        </div>
                        <div style={{ padding: '0 16px', color: '#8b5cf6', display: 'flex', alignItems: 'center' }}>➔</div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Destination</div>
                          <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>{ticket.destination}</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                        <div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>CLASS</div>
                          <div style={{ fontSize: '14px', color: '#fff', fontWeight: '600' }}>{ticket.ticketClass === 'I' ? 'First (I)' : 'Second (II)'}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>FARE</div>
                          <div style={{ fontSize: '14px', color: '#00ff88', fontWeight: '600' }}>₹{ticket.fare}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>VALID TILL</div>
                          <div style={{ fontSize: '14px', color: '#ff4757', fontWeight: '600' }}>{ticket.validUntil}</div>
                        </div>
                      </div>
                    </div>

                    {/* Mock QR Code generator */}
                    <div style={{ marginLeft: '24px', background: '#fff', padding: '8px', borderRadius: '8px' }}>
                       <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${ticket.id}-${ticket.source}-${ticket.destination}`} alt="QR Code" width="100" height="100" />
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}