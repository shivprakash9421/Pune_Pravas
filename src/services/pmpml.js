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

// The upstream /all-buses shape isn't officially documented, so this normalizes
// a few likely response shapes and field-name variants rather than assuming one.
function normalizeBus(b) {
  const position = Array.isArray(b.position) ? b.position : null;
  const location = b.location && typeof b.location === 'object' ? b.location : null;

  return {
    id: b.id ?? b.vehicle_id ?? b.vehicleId ?? b.bus_id ?? b.reg_no ?? b.regNo ?? null,
    lat: b.lat ?? b.latitude ?? position?.[0] ?? location?.lat ?? null,
    lon: b.lon ?? b.lng ?? b.longitude ?? position?.[1] ?? location?.lng ?? location?.lon ?? null,
    route: b.route ?? b.route_number ?? b.routeNumber ?? b.route_short_name ?? b.routeName ?? null,
    route_desc: b.route_desc ?? b.route_long_name ?? b.headsign ?? '',
  };
}

export async function getLiveBuses() {
  const res = await fetch(`${API_BASE}/pmpml/nearby-buses`);
  if (!res.ok) throw new Error('Could not load live buses');
  const json = await res.json();

  const list = Array.isArray(json) ? json
    : Array.isArray(json.data) ? json.data
    : Array.isArray(json.buses) ? json.buses
    : Array.isArray(json.all_buses) ? json.all_buses
    : Array.isArray(json.vehicles) ? json.vehicles
    : [];

  return list.map(normalizeBus).filter(b => b.lat != null && b.lon != null);
}