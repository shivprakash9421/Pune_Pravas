// Real Pune <-> Lonavala local train timetable.
// Source: punelocaltraintimetable.com (Pune-Lonavala & Lonavala-Pune tables).
// This is a fan-maintained public schedule, not an official Indian Railways feed --
// treat it as generally reliable but not authoritative for time-critical trips.
// One inconsistency was found in the source itself: the 13th Pune->Lonavala local
// shows Akurdi at 16:18 and Dehu Road at 16:16 (time going backwards) -- kept as-is
// rather than silently 'corrected', since there's no way to verify which is right.

export const STATIONS = ["Pune Jn", "Shivajinagar", "Khadki", "Dapodi", "Kasarwadi", "Pimpri", "Chinchvad", "Akurdi", "Dehu Road", "Begdaewai", "Ghorawadi", "Talegaon", "Vadgaon", "Kanhe", "Kamshet", "Malavli", "Lonavala"];

// Each entry's `times` array is indexed exactly like STATIONS (Pune Jn first, Lonavala last).
// null means the train does not stop there / is a short working that doesn't reach that station.
export const PUNE_TO_LONAVALA = [
  { local: '1', times: ['00:10', '00:16', '00:21', '00:26', '00:30', '00:33', '00:37', '00:41', '00:46', '00:50', '00:53', '00:58', '01:02', '01:06', '01:10', '01:17', '01:30'] },
  { local: '2', times: ['04:45', '04:51', '04:56', '05:01', '05:05', '05:08', '05:12', '05:16', '05:21', '05:25', '05:28', '05:33', '05:37', '05:41', '05:45', '05:52', '06:05'] },
  { local: '3', times: ['05:45', '05:51', '05:56', '06:01', '06:05', '06:08', '06:12', '06:16', '06:21', '06:25', '06:28', '06:33', '06:37', '06:41', '06:45', '06:52', '07:05'] },
  { local: '4', times: ['06:30', '06:30', '06:41', '06:46', '06:50', '06:53', '06:57', '07:01', '07:06', '07:10', '07:13', '07:18', '07:22', '07:26', '07:30', '07:37', '07:50'] },
  { local: '5', times: ['06:50', '06:56', '07:01', '07:06', '07:10', '07:13', '07:17', '07:21', '07:26', '07:30', '07:33', '07:40', null, null, null, null, null] },
  { local: '6', times: ['08:05', '08:11', '08:16', '08:21', '08:25', '08:28', '08:32', '08:36', '08:41', '08:45', '08:48', '08:53', '08:57', '09:01', '09:05', '09:12', '09:25'] },
  { local: '7', times: ['08:57', '09:03', '09:08', '09:13', '09:17', '09:20', '09:24', '09:28', '09:33', '09:37', '09:40', '09:47', null, null, null, null, null] },
  { local: '8', times: ['09:55', '10:01', '10:06', '10:11', '10:15', '10:18', '10:22', '10:26', '10:31', '10:35', '10:38', '10:43', '10:47', '10:51', '10:55', '11:02', '11:15'] },
  { local: '9', times: [null, '11:20', '11:25', '11:30', '11:34', '11:36', '11:41', '11:45', '11:50', '11:54', '11:57', '12:02', '12:06', '12:10', '12:14', '12:21', '12:34'] },
  { local: '10', times: ['12:15', '12:21', '12:24', '12:31', '12:35', '12:38', '12:42', '12:46', '12:51', '12:55', '12:58', '13:03', '13:07', '13:11', '13:21', '13:31', '13:50'] },
  { local: '11', times: ['13:00', '13:06', '13:11', '13:16', '13:20', '13:23', '13:27', '13:31', '13:36', '13:40', '13:43', '13:48', '13:52', '13:56', '14:00', '14:07', '14:20'] },
  { local: '12', times: ['15:00', '15:06', '15:11', '15:16', '15:20', '15:23', '15:27', '15:31', '15:36', '15:40', '15:43', '15:48', '15:52', '15:56', '16:00', '16:10', '16:32'] },
  { local: '13', times: ['15:40', '15:46', '15:51', '15:56', '16:00', '16:03', '16:07', '16:18', '16:16', '16:20', '16:23', '16:30', null, null, null, null, null] },
  { local: '14', times: ['16:25', '16:31', '16:36', '16:41', '16:45', '16:48', '16:52', '16:56', '17:01', '17:05', '17:08', '17:13', '17:17', '17:21', '17:25', '17:32', '17:45'] },
  { local: '15', times: ['17:15', '17:23', '17:28', '17:33', '17:37', '17:41', '17:45', '17:50', '17:55', '17:59', '18:02', '18:07', '18:11', '18:16', '18:20', '18:28', '18:40'] },
  { local: '16', times: ['18:02', '18:10', '18:15', '18:20', '18:24', '18:27', '18:31', '18:35', '18:40', '18:44', '18:47', '18:52', '18:56', '19:01', '19:05', '19:13', '19:27'] },
  { local: '17', times: ['19:05', '19:18', '19:16', '19:21', '19:25', '19:28', '19:32', '19:36', '19:41', '19:45', '19:48', '19:53', '19:57', '20:01', '20:05', '20:12', '20:25'] },
  { local: '18', times: ['20:05', '20:11', '20:16', '20:21', '20:25', '20:28', '20:32', '20:36', '20:41', '20:45', '20:48', '20:53', '20:57', '21:01', '21:05', '21:12', '21:25'] },
  { local: '19', times: [null, '20:35', '20:40', '20:45', '20:49', '20:52', '20:56', '21:00', '21:05', '21:09', '21:12', '21:17', '21:21', '21:25', '21:29', '21:36', '21:50'] },
  { local: '20', times: ['21:02', '21:08', '21:13', '21:18', '21:22', '21:25', '21:29', '21:33', '21:38', '21:42', '21:45', '21:50', '21:54', '21:59', '22:02', '22:12', '22:23'] },
  { local: '21', times: ['22:10', '22:16', '22:21', '22:26', '22:30', '22:33', '22:37', '22:41', '22:46', '22:50', '22:53', '22:58', '23:02', '23:06', '23:10', '23:17', '23:30'] },
  { local: '22', times: ['23:00', '23:06', '23:11', '23:16', '23:20', '23:23', '23:27', '23:31', '23:36', '23:40', '23:43', '23:50', null, null, null, null, null] },
];

export const LONAVALA_TO_PUNE = [
  { local: '1', times: ['01:05', '00:47', '00:42', '00:37', '00:33', '00:30', '00:25', '00:21', '00:16', '00:12', '00:09', '00:05', null, null, null, null, null] },
  { local: '2', times: ['06:40', '06:28', '06:23', '06:19', '06:15', '06:12', '06:08', '06:04', '05:59', '05:55', '05:52', '05:48', '05:43', '05:39', '05:35', '05:28', '05:20'] },
  { local: '3', times: ['07:55', '07:43', '07:38', '07:34', '07:30', '07:28', '07:23', '07:19', '07:13', '07:09', '07:06', '07:01', '06:57', '06:52', '06:48', '06:41', '06:35'] },
  { local: '4', times: ['08:40', '08:30', '08:25', '08:21', '08:17', '08:14', '08:10', '08:06', '08:01', '07:57', '07:54', '07:50', null, null, null, null, null] },
  { local: '5', times: ['08:50', '08:38', '08:33', '08:29', '08:25', '08:22', '08:17', '08:13', '08:08', '08:04', '07:59', '07:54', '07:49', '07:43', '07:39', '07:33', '07:25'] },
  { local: '6', times: ['09:40', '09:28', '09:23', '09:19', '09:15', '09:12', '09:08', '09:04', '08:59', '08:55', '08:52', '08:48', '08:43', '08:39', '08:35', '08:28', '08:20'] },
  { local: '7', times: [null, '10:40', '10:32', '10:28', '10:24', '10:21', '10:17', '10:13', '10:08', '10:04', '10:01', '09:57', null, null, null, null, null] },
  { local: '8', times: ['11:55', '11:40', '11:13', '11:09', '11:05', '11:02', '10:58', '10:54', '10:49', '10:45', '10:42', '10:38', '10:33', '10:29', '10:25', '10:18', '10:10'] },
  { local: '9', times: ['12:50', '12:38', '12:33', '12:29', '12:25', '12:22', '12:18', '12:14', '12:09', '12:05', '12:02', '11:58', '11:53', '11:49', '11:45', '11:38', '11:30'] },
  { local: '10', times: ['15:20', '15:08', '15:03', '14:59', '14:55', '14:52', '14:48', '14:44', '14:39', '14:35', '14:32', '14:28', '14:23', '14:19', '14:15', '14:08', '14:00'] },
  { local: '11', times: ['16:15', '16:03', '15:58', '15:54', '15:50', '15:47', '15:43', '15:39', '15:34', '15:30', '15:27', '15:23', '15:18', '15:14', '15:10', '15:03', '14:55'] },
  { local: '12', times: ['17:05', '16:53', '16:48', '16:43', '16:38', '16:34', '16:30', '16:24', '16:21', '16:17', '16:13', '16:10', '16:04', '15:59', '15:55', '15:48', '15:40'] },
  { local: '13', times: ['17:30', '17:20', '17:15', '17:11', '17:07', '17:04', '17:00', '16:56', '16:51', '16:47', '16:44', '16:40', null, null, null, null, null] },
  { local: '14', times: ['18:45', '18:35', '18:28', '18:24', '18:20', '18:17', '18:13', '18:09', '18:04', '18:00', '17:57', '17:53', '17:48', '17:44', '17:40', '17:33', '17:25'] },
  { local: '15', times: ['19:40', '19:28', '19:23', '19:19', '19:15', '19:12', '19:08', '19:04', '18:59', '18:55', '18:52', '18:48', '18:43', '18:39', '18:35', '18:28', '18:20'] },
  { local: '16', times: [null, '20:25', '20:03', '19:59', '19:55', '19:52', '19:48', '19:44', '19:39', '19:35', '19:32', '19:28', null, null, null, null, '19:00'] },
  { local: '17', times: ['20:52', '20:40', '20:39', '20:35', '20:31', '20:28', '20:24', '20:20', '20:15', '20:11', '20:08', '20:04', '19:59', '19:55', '19:51', '19:44', '19:35'] },
  { local: '18', times: ['22:00', '21:48', '21:43', '21:39', '21:35', '21:32', '21:28', '21:24', '21:19', '21:15', '21:12', '21:08', '21:03', '20:59', '20:55', '20:48', '20:40'] },
  { local: '19', times: ['22:55', '22:43', '22:38', '22:34', '22:30', '22:27', '22:23', '22:19', '22:14', '22:10', '22:07', '22:03', '21:58', '21:54', '21:50', '21:43', '21:35'] },
  { local: '20', times: ['23:25', '23:13', '23:08', '23:04', '23:00', '22:57', '22:53', '22:49', '22:44', '22:40', '22:37', '22:33', '22:28', '22:24', '22:20', '22:13', '22:05'] },
  { local: '21', times: ['00:20', '23:44', '23:39', '23:35', '23:31', '23:28', '23:24', '23:19', '23:14', '23:10', '23:07', '23:00', '22:58', '22:54', '22:50', '22:43', '22:35'] },
  { local: '22', times: ['01:35', '00:51', '00:46', '00:41', '00:37', '00:32', '00:27', '00:23', '00:18', '00:14', '00:11', '00:07', '00:02', '23:58', '23:54', '23:47', '23:40'] },
];
// ---------- Live-status helpers ----------
// These are schedule-based, not GPS-based -- there is no public live GPS feed
// for Pune-Lonavala EMU locals, so "live" here means "computed from the real
// timetable against the current clock", which is what similar public trackers
// (e.g. etrain.info) actually do too.

export function timeToMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

// The train currently "in service" for a direction: departed already, not yet
// finished its run. Handles trains that cross midnight (e.g. depart 23:50, arrive 01:35).
export function getCurrentTrain(directionTrains, now = new Date()) {
  const nowMin = now.getHours() * 60 + now.getMinutes();

  for (const train of directionTrains) {
    const stops = train.times
      .map((t, i) => (t ? { i, min: timeToMinutes(t) } : null))
      .filter(Boolean);
    if (stops.length === 0) continue;

    const first = stops[0].min;
    const last = stops[stops.length - 1].min;
    const wraps = last < first;
    const inWindow = wraps ? (nowMin >= first || nowMin <= last) : (nowMin >= first && nowMin <= last);
    if (inWindow) return train;
  }
  return null;
}

// Next train departing a given station (by STATIONS index) after `now`.
export function getNextTrain(directionTrains, fromIndex, now = new Date()) {
  const nowMin = now.getHours() * 60 + now.getMinutes();
  let best = null;
  let bestDelta = Infinity;

  for (const train of directionTrains) {
    const t = train.times[fromIndex];
    if (!t) continue;
    const depMin = timeToMinutes(t);
    let delta = depMin - nowMin;
    if (delta < 0) delta += 24 * 60;
    if (delta < bestDelta) {
      bestDelta = delta;
      best = { ...train, departureMinutes: depMin, minutesAway: delta };
    }
  }
  return best;
}

// Per-station status for one train, for the live tracker panel.
export function getStationStatuses(train, now = new Date()) {
  const nowMin = now.getHours() * 60 + now.getMinutes();
  return train.times.map((t, i) => {
    if (!t) return { station: STATIONS[i], time: null, status: 'No Stop' };
    const min = timeToMinutes(t);
    let status = 'Scheduled';
    if (Math.abs(nowMin - min) <= 1) status = 'At Station';
    else if (nowMin > min) status = 'Passed';
    return { station: STATIONS[i], time: t, status };
  });
}