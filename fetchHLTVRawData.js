import { HLTV } from 'hltv';

// Fetch latest event Info
export async function getLatestEvent() {
  const res = await HLTV.getEvents();
  return res.find((i) => i.featured === true);
}

// Fetch match List
export async function getMatches(id) {
  const res = await HLTV.getMatches({ eventId: id });
  return res;
}
