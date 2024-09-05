/**
 * A function that 'filters' a base array by the secondary array and returns the different elements in the base array
 * @param {Array} baseArray The base array
 * @param {Array} filterArray The secondary array to 'filter' by
 * @returns {Array} The elements of the base array that do not exist in the secondary array
 */
export function filterArrayByArray(baseArray, filterArray) {
  const hasObjects = baseArray.every((o) => typeof o === 'object');
  if (hasObjects) {
    return baseArray.filter(
      (obj1) => !filterArray.some((obj2) => obj1.label === obj2.label)
    );
  } else {
    return baseArray.filter((item) => !filterArray.includes(item));
  }
}
