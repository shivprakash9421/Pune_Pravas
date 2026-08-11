import { collection, doc, updateDoc, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';
import { fetchSecureData } from './api';

export async function purchaseTicket({ type, from, to, route }) {
  return fetchSecureData('/tickets', 'POST', { type, from, to, route });
}

// Real-time list of the signed-in user's tickets — updates live.
export function subscribeToMyTickets(onChange) {
  const uid = auth.currentUser?.uid;
  if (!uid) return () => {};

  const q = query(
    collection(db, 'tickets'),
    where('userId', '==', uid),
    orderBy('purchasedAt', 'desc')
  );

  return onSnapshot(q, (snap) => {
    onChange(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

export async function markTicketUsed(ticketId) {
  await updateDoc(doc(db, 'tickets', ticketId), {
    status: 'used',
    usedAt: new Date().toISOString(),
  });
}