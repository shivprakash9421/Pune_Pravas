const express = require('express');
const cheerio = require('cheerio');
const router = express.Router();

const ETRAIN_BASE = 'https://etrain.info/ajax.php';
const ETRAIN_VERSION = '3.4.11.0';

// Only covers Pune -> Lonavala (train 99810) for now -- the Lonavala -> Pune
// direction runs as a different train number that hasn't been captured yet.
const TRAIN_NUMBER = '99810';
const ORIGIN_STATION_CODE = 'PUNE';

let cache = { data: null, at: 0 };
const TTL = 60 * 1000; // etrain.info's own data doesn't refresh meaningfully faster than this

function todayDDMMYYYY() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

async function fetchRunningStatusHtml() {
  const body = new URLSearchParams({
    train: TRAIN_NUMBER,
    date: todayDDMMYYYY(),
    atstn: ORIGIN_STATION_CODE,
    view: 'table',
    final: '1',
  });

  const res = await fetch(`${ETRAIN_BASE}?q=runningstatus&v=${ETRAIN_VERSION}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Referer': `https://etrain.info/train/Pune-Lnl-Local-${TRAIN_NUMBER}/live`,
    },
    body: body.toString(),
  });

  if (!res.ok) throw new Error(`etrain.info returned ${res.status}`);
  const json = await res.json();
  if (!json.data) throw new Error('etrain.info response had no data field');
  return json.data;
}

function parseRunningStatus(html) {
  const $ = cheerio.load(html);
  const stations = [];

  $('table.intStnTbl tr').each((_, el) => {
    const $row = $(el);
    if ($row.hasClass('itmd')) return; // skip collapsed "no halt" rows
    if ($row.find('.fixwelps').length === 0) return; // header row etc.

    const name = $row.find('.fixwelps').first().text().trim();
    const kmsText = $row.find('.fixw70').first().text().trim(); // e.g. "-62 kms"
    const platformMatch = $row.text().match(/Platform:\s*(\d+)?/);
    const platform = platformMatch ? (platformMatch[1] || null) : null;

    const timeDivs = $row.find('td.txt-lt.dborder .nowrap.pd5');
    const arrivalText = $(timeDivs.get(0)).text().trim();
    const departureText = $(timeDivs.get(1)).text().trim();

    const arrivalStatus = $(timeDivs.get(0)).find('.grn').length ? 'on-time'
      : $(timeDivs.get(0)).find('.red').length ? 'delayed'
      : $(timeDivs.get(0)).find('.ylw').length ? 'estimated'
      : null;

    stations.push({
      name,
      kmsToGo: kmsText || null,
      platform,
      arrival: arrivalText || null,
      departure: departureText || null,
      arrivalStatus,
      isSource: /source/i.test(arrivalText),
      isDestination: /destination/i.test(departureText),
    });
  });

  const reachedMatch = $('body').text().match(/Train has reached destination[^.]*\./);
  const updatedMatch = $('[timeAction]').first().text().trim();

  return {
    stations,
    statusMessage: reachedMatch ? reachedMatch[0] : null,
    lastUpdated: updatedMatch || null,
    disclaimer: 'Not affiliated with or endorsed by Indian Railways or IRCTC.',
  };
}

router.get('/running-status', async (req, res) => {
  try {
    if (!cache.data || Date.now() - cache.at > TTL) {
      const html = await fetchRunningStatusHtml();
      cache.data = parseRunningStatus(html);
      cache.at = Date.now();
    }
    res.json(cache.data);
  } catch (err) {
    res.status(502).json({ error: 'etrain.info running status unavailable', detail: err.message });
  }
});

module.exports = router;