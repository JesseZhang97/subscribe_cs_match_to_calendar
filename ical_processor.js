import { eventInfo } from './match_event';
import { calendar } from './ical_init';

const startTime = new Date();
const endTime = new Date();

endTime.setHours(startTime.getHours() + 1);

calendar.createEvent({
  start: startTime,
  end: endTime,
  summary: 'G2 vs Navi',
  description: eventInfo.name,
});
