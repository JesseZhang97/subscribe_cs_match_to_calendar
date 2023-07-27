import http from 'node:http';
import { parse } from 'url';
import ical from 'ical-generator';
import { HLTV } from 'hltv';

async function fetchMatchesInfo() {
  const eventsInfoRes = await HLTV.getEvents();
  const featuredEvent = eventsInfoRes.find((i) => i.featured === true);
  const id = featuredEvent.id;
  const matchesInfoList = await HLTV.getMatches({ eventIds: id });
  const filterNoTeam = matchesInfoList.filter(
    (i) => i.team1 && i.team1 != undefined
  );
  return filterNoTeam;
}

// const matches = getMatches(eventInfo.eventId);
const calendar = ical({ name: 'HLTV featured match clendar' });

(async () => {
  const matchList = await fetchMatchesInfo();
  matchList.forEach((match) => {
    calendar.createEvent({
      start: new Date(match.date),
      end: new Date(match.date),
      summary: match.team1.name + ' vs ' + match.team2.name,
      description: match.event.name,
    });
  });
})();

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
      calendar.serve(res);
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
