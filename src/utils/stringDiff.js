/**
 * @typedef {Object} StringDiff
 * @property {string} type - The type of edit that was made. One of 'insertion', 'edit', 'deletion', or null if the strings are identical.
 * @property {string} diff - The string that was inserted, edited, or deleted.
 * @property {number} diffIndex - The index at which the edit occurred.
 *
 */

/**
 *
 * @param {string} str1
 * @param {string} str2
 * @returns {StringDiff}
 */
export function stringDiff (str1, str2) {
  if (str1 === str2) {
    return {
      type: null,
      diff: '',
      diffIndex: null
    };
  }

  const len1 = str1.length;
  const len2 = str2.length;

  let startIndex = 0;
  while (startIndex < len1 && startIndex < len2 && str1[startIndex] === str2[startIndex]) {
    startIndex++;
  }

  let endIndex1 = len1 - 1;
  let endIndex2 = len2 - 1;
  while (endIndex1 >= 0 && endIndex2 >= 0 && str1[endIndex1] === str2[endIndex2]) {
    endIndex1--;
    endIndex2--;
  }

  let diff;
  let type;
  let diffIndex;

  if (startIndex > endIndex1 && startIndex <= endIndex2) {
    // There was an insertion
    diff = str2.substring(startIndex, endIndex2 + 1);
    type = 'insertion';
    diffIndex = startIndex;
  } else if (startIndex <= endIndex1 && startIndex > endIndex2) {
    // There was a deletion
    diff = str1.substring(startIndex, endIndex1 + 1);
    type = 'deletion';
    diffIndex = startIndex;
  } else if (startIndex <= endIndex1 && startIndex <= endIndex2) {
    // There was a modification
    diff = str1.substring(startIndex, endIndex1 + 1);
    type = 'edit';
    diffIndex = startIndex;
  }

  return {
    type,
    diff,
    diffIndex
  };
}
