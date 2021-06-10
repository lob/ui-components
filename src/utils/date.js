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
