import http from 'node:http';
import { parse } from 'url';
import ical from 'ical-generator';
import { getLatestEvent, getMatches } from './fetchHLTVRawData.js';
import { HLTV, MatchFilter } from 'hltv';

// ical init
const calendar = ical({ name: 'HLTV featured match clendar' });

// console.log(await getLatestEvent());
// console.log(await getMatches(6812));

// const matchesList = await getMatches(6812);
// console.log(matchesList);
const res = await HLTV.getMatches({
  eventId: 6811,
  filter: MatchFilter.TopTier,
});
console.log(res);
// ------------------------------------------------------------------
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const method = req.method;
  const { pathname } = parse(req.url, true);

  res.setHeader('Content-Type', 'application/json');

  switch (true) {
    case pathname === '/event' && method === 'GET':
      res.statusCode = 200;
      res.end();
      break;

    case pathname === '/ical_sub' && method === 'GET':
      res.statusCode = 200;
      res.end();
      break;
    default:
      res.statusCode = 404;
      res.end('not_found');
      break;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
