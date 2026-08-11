const express = require('express');
const router = express.Router();

const PMPML_BASE = 'https://prod-pmpml-routesapi.chartr.in';
const PMPML_API_KEY = process.env.PMPML_API_KEY || 'test'; // same key the public Chartr apps use

let cache = { stops: null, stopsAt: 0, routes: null, routesAt: 0, buses: null, busesAt: 0 };
const STATIC_TTL = 24 * 60 * 60 * 1000; // stops/routes barely change
const LIVE_TTL = 15 * 1000; // be a good citizen of a third-party API

async function callPmpml(path, options = {}) {
  const res = await fetch(`${PMPML_BASE}${path}`, {
    ...options,
    headers: { 'x-api-key': PMPML_API_KEY, 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  if (!res.ok) throw new Error(`PMPML upstream ${path} returned ${res.status}`);
  return res.json();
}

router.get('/stops', async (req, res) => {
  try {
    if (!cache.stops || Date.now() - cache.stopsAt > STATIC_TTL) {
      cache.stops = await callPmpml('/stops');
      cache.stopsAt = Date.now();
    }
    res.json(cache.stops);
  } catch (err) {
    res.status(502).json({ error: 'PMPML stops unavailable', detail: err.message });
  }
});

router.get('/routes', async (req, res) => {
  try {
    if (!cache.routes || Date.now() - cache.routesAt > STATIC_TTL) {
      cache.routes = await callPmpml('/routes');
      cache.routesAt = Date.now();
    }
    res.json(cache.routes);
  } catch (err) {
    res.status(502).json({ error: 'PMPML routes unavailable', detail: err.message });
  }
});

router.get('/nearby-buses', async (req, res) => {
  try {
    if (!cache.buses || Date.now() - cache.busesAt > LIVE_TTL) {
      cache.buses = await callPmpml('/nearby-buses', { method: 'POST', body: JSON.stringify({}) });
      cache.busesAt = Date.now();
    }
    res.json(cache.buses);
  } catch (err) {
    res.status(502).json({ error: 'Live bus data unavailable', detail: err.message });
  }
});

module.exports = router;