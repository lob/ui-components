/**
 * A function to execute on each value in the array until the function returns true, indicating that the satisfying element was found.A function to execute on each value in the array until the function returns true, indicating that the satisfying element was found.
 *
 * @callback callbackFn
 * @param {Object} element The current element being processed in the array.
 * @param {number} index The index of the current element being processed in the array. (optional)
 * @param {Object[]} array The array findLastIndex() was called upon.
 */

/**
 * Returns the index of the last element in the array where predicate is true, and -1
 * otherwise.
 * @param {callbackFn} predicate findLastIndex calls predicate once for each element of the array, in descending
 * order, until it finds one where predicate returns true. If such an element is found,
 * findLastIndex immediately returns that element index. Otherwise, findLastIndex returns -1.
 * @param {Object[]} thisArg Value to use as this when executing callbackFn. (optional)
 * @return {number} The index
 */
export function findLastIndex(predicate, thisArg) {
  // The callback must be a function.
  if (typeof predicate !== "function") {
    throw new TypeError();
  }

  let l = this.length;
  while (l--) {
    if (predicate(this[l], l, thisArg)) {
      return l;
    }
  }
  return -1;
}

/**
 * A function that 'filters' a base array by the secondary array and returns the different elements in the base array
 * @param {Array} baseArray The base array
 * @param {Array} filterArray The secondary array to 'filter' by
 * @returns {Array} The elements of the base array that do not exist in the secondary array
 */
export function filterArrayByArray(baseArray, filterArray) {
  const hasObjects = baseArray.every((o) => typeof o === "object");
  if (hasObjects) {
    return baseArray.filter(
      (obj1) => !filterArray.some((obj2) => obj1.label === obj2.label),
    );
  } else {
    return baseArray.filter((item) => !filterArray.includes(item));
  }
}
