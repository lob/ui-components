export const DaysOfWeek = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6
};

export function addDays (date, days) {
  var d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function setMonth (date, month) {
  const d = new Date(date);
  d.setMonth(month);
  return d;
}

export function setYear (date, year) {
  const d = new Date(date);
  d.setFullYear(year);
  return d;
}

/**
 * Compare if two dates are in the same month of the same year.
 * @param {Date} a The first date to compare
 * @param {Date} b The second date to compare
 * @returns {boolean} The result
 */
export function isEqualMonth (a, b) {
  if (a === null || b === null) {
    return false;
  }

  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

/**
 * Compare if two dates are equal in terms of day, month, and year
 * @param {Date} a The first date to compare
 * @param {Date} b The second date to compare
 * @returns {boolean} The result
 */
export function isEqual (a, b) {
  if (a === null || b === null) {
    return false;
  }

  return isEqualMonth(a, b) && a.getDate() === b.getDate();
}

export function startOfWeek (date, firstDayOfWeek = DaysOfWeek.Sunday) {
  var d = new Date(date);
  var day = d.getDay();
  var diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek;

  d.setDate(d.getDate() - diff);
  return d;
}

export function endOfWeek (date, firstDayOfWeek = DaysOfWeek.Sunday) {
  var d = new Date(date);
  var day = d.getDay();
  var diff = (day < firstDayOfWeek ? -7 : 0) + 6 - (day - firstDayOfWeek);

  d.setDate(d.getDate() + diff);
  return d;
}

export function startOfMonth (date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth (date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
 * given start and end date, return an (inclusive) array of all dates in between
 * @param {Date} start
 * @param {Date} end
 * @returns {Date[]} the dates in the range
 */
function getDaysInRange (start, end) {
  const days = [];
  let current = start;

  while (!isEqual(current, end)) {
    days.push(current);
    current = addDays(current, 1);
  }

  days.push(current);

  return days;
}

/**
 * given a date, return an array of dates from a calendar perspective
 * @param {Date} date The date to start the calendar from
 * @param {number} firstDayOfWeek The number of the first day of the week
 * @returns {Date[]}
 */
export function getViewOfMonth (date, firstDayOfWeek = DaysOfWeek.Sunday) {
  const start = startOfWeek(startOfMonth(date), firstDayOfWeek);
  const end = endOfWeek(endOfMonth(date), firstDayOfWeek);

  return getDaysInRange(start, end);
}

/**
 * Ensures date is within range, returns min or max if out of bounds
 * @param {Date} date
 * @param {Date} min
 * @param {Date} max
 * @returns {Date}
 */
export function clamp (date, min, max) {
  const time = date.getTime();

  if (min && min instanceof Date && time < min.getTime()) {
    return min;
  }

  if (max && max instanceof Date && time > max.getTime()) {
    return max;
  }

  return date;
}

/**
 * Check if date is within a min and max
 * @param {Date} date
 * @param {Date} min
 * @param {Date} max
 * @returns {boolean}
 */
export function inRange (date, min, max) {
  return clamp(date, min, max) === date;
}

