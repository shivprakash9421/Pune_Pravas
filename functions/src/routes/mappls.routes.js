const express = require('express');
const router = express.Router();

const MAPPLS_TOKEN_URL = 'https://outpost.mappls.com/api/security/oauth/token';
let cachedToken = { value: null, expiresAt: 0 };

router.get('/token', async (req, res) => {
  try {
    if (cachedToken.value && Date.now() < cachedToken.expiresAt) {
      return res.json({ access_token: cachedToken.value });
    }

    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.MAPPLS_CLIENT_ID,
      client_secret: process.env.MAPPLS_CLIENT_SECRET,
    });

    const tokenRes = await fetch(MAPPLS_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });

    if (!tokenRes.ok) {
      const detail = await tokenRes.text();
      throw new Error(`Mappls token request failed: ${tokenRes.status} ${detail}`);
    }

    const data = await tokenRes.json();
    cachedToken = { value: data.access_token, expiresAt: Date.now() + (data.expires_in - 60) * 1000 };
    res.json({ access_token: data.access_token });
  } catch (err) {
    res.status(502).json({ error: 'Could not get Mappls token', detail: err.message });
  }
});

module.exports = router;