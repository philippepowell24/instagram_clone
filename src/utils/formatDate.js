import {
  format,
  formatDistanceStrict,
  isThisYear,
  formatDistanceToNow,
} from 'date-fns';

export function formatPostDate(date) {
  // MARCH 23
  const formatShort = format(new Date(date), 'MMMM d').toUpperCase();
  // FEBRUARY 2, 2019
  const formatLong = format(new Date(date), 'MMMM d, yyy').toUpperCase();

  return isThisYear(new Date(date)) ? formatShort : formatLong;
}

export function formatDateToNow(date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true }).toUpperCase();
}

export function formatDateToNowShort(date) {
  // 5 days ago -> 5d
  // 7 weeks ago -> 7w
  return formatDistanceStrict(new Date(date), new Date(Date.now()))
    .split(' ')
    .map((s, i) => (i === 1 ? s[0] : s))
    .join('');
}
