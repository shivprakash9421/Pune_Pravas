const API_BASE = 'https://punepravas.onrender.com';

export async function getPmpmlStops() {
  const res = await fetch(`${API_BASE}/pmpml/stops`);
  if (!res.ok) throw new Error('Could not load stops');
  return res.json();
}

export async function getPmpmlRoutes() {
  const res = await fetch(`${API_BASE}/pmpml/routes`);
  if (!res.ok) throw new Error('Could not load routes');
  return res.json();
}

export async function getLiveBuses() {
  const res = await fetch(`${API_BASE}/pmpml/nearby-buses`);
  if (!res.ok) throw new Error('Could not load live buses');
  const json = await res.json();
  return json.data || [];
}