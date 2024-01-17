export const DECIMAL_SEPARATORS = [",", "."];
export const INT_PATTERN = "(0|[1-9]\\d*)";

/**
 * Helper to check whether or not a string is a valid number.
 * @param {string} str
 * @returns {boolean}
 */
function isValidNumber(str) {
  return /^-?\d+(\.\d+)?$/.test(str);
}

export default class CurrencyFormatter {
  /**
   * @param {Intl.NumberFormatOptions} options
   */
  constructor(options) {
    this.formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      ...options,
    }).format;
  }

  /**
   * Best effort parser for currency input strings.
   * @param {string} str - A string in the format of a number or valid USD currency value. e.g. 210000, 21,000.00 or $21,000.00
   * @returns {number} The parsed numeric value, or 0 if passed an empty string or nullish value.
   */
  parse(str) {
    if (!str) {
      return 0;
    }

    const negative = this.isNegative(str);

    let [int, frac] = str.split(".");
    int = this.stripNonNumerics(int);
    frac = this.stripNonNumerics(frac);

    str = `${int || 0}.${frac || 0}`;

    if (!isValidNumber(str)) {
      return null;
    }
    return Number(`${negative ? "-" : ""}${str}`);
  }

  /**
   * @param {number|null} value - The numeric value to format.
   * @returns {string} The formatted value.
   */
  format(value) {
    return value !== null && !isNaN(value) ? this.formatter(value) : "";
  }

  /**
   * @param {string} str A string in the format of either a number or valid en-US USD currency value. e.g. 210000, 21,000.00 or $21,000.00
   * @returns {boolean}
   */
  isNegative(str) {
    return str?.startsWith("-");
  }

  /**
   * Removes all non-numeric characters from a string.
   * @param {string} str
   * @returns {string}
   */
  stripNonNumerics(str = "") {
    return str.replace(/[^0-9]/g, "");
  }
}
