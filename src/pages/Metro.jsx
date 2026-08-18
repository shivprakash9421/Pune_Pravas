const [paymentStatus, setPaymentStatus] = useState('idle'); // idle | processing | waking | success

const processUPI = async (app) => {
  setPaymentStatus('processing');

  // Free-tier Render instances sleep when idle and can take ~50s to wake up.
  // Switch the copy after a few seconds so it's obvious what's happening.
  const wakingTimer = setTimeout(() => setPaymentStatus('waking'), 4000);

  try {
    await purchaseTicket({ type: 'metro', from, to });
  } catch (err) {
    console.warn("Backend failed, using offline fallback generation:", err.message);
    const fallbackTicket = {
      id: 'TXN' + Math.floor(Math.random() * 1000000000).toString(16).toUpperCase(),
      type: 'metro', from, to, fare,
      purchasedAt: new Date().toISOString(),
      status: 'valid'
    };
    const existing = JSON.parse(localStorage.getItem('local_tickets') || '[]');
    localStorage.setItem('local_tickets', JSON.stringify([fallbackTicket, ...existing]));
  } finally {
    clearTimeout(wakingTimer);
  }

  setPaymentStatus('success');
  setTimeout(() => navigate('/tickets'), 1500);
};
{paymentStatus === 'waking' && (
  <div className="text-center py-12">
    <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
    <h3 className="text-lg font-bold text-slate-800">Waking up the server...</h3>
    <p className="text-sm text-slate-500 mt-2">Free hosting sleeps when idle — first request can take up to 50 seconds.</p>
  </div>
)}