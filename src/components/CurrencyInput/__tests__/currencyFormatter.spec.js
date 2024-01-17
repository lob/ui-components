import CurrencyFormatter from '../currencyFormatter';

describe('Currency Formatter', () => {
  const formatter = new CurrencyFormatter({
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  describe('parse', () => {
    it('returns 0 for a null value or fully invalid currency string', () => {
      expect(formatter.parse('abc')).toEqual(0);
      expect(formatter.parse('')).toEqual(0);
    });

    it('correctly handles bad formatting', () => {
      expect(formatter.parse('1,1.11')).toEqual(11.11);
    });

    it('correctly parses a positive integer', () => {
      expect(formatter.parse('123')).toEqual(123);
    });

    it('correctly parses a negative integer', () => {
      expect(formatter.parse('-123')).toEqual(-123);
    });

    it('correctly parses a positive float', () => {
      expect(formatter.parse('123.45')).toEqual(123.45);
    });

    it('correctly parses a negative float', () => {
      expect(formatter.parse('-123.45')).toEqual(-123.45);
    });

    it('correctly parses a positive integer with a comma', () => {
      expect(formatter.parse('12,345')).toEqual(12345);
    });

    it('correctly parses a negative integer with a comma', () => {
      expect(formatter.parse('-12,345')).toEqual(-12345);
    });

    it('correctly parses a positive float with a comma', () => {
      expect(formatter.parse('12,345.67')).toEqual(12345.67);
    });

    it('correctly parses a negative float with a comma', () => {
      expect(formatter.parse('-12,345.67')).toEqual(-12345.67);
    });

    it('correctly parses a positive integer with a currency symbol', () => {
      expect(formatter.parse('$123')).toEqual(123);
    });

    it('correctly parses a negative integer with a currency symbol', () => {
      expect(formatter.parse('-$123')).toEqual(-123);
    });

    it('correctly parses a positive float with a currency symbol', () => {
      expect(formatter.parse('$123.45')).toEqual(123.45);
    });

    it('correctly parses a negative float with a currency symbol', () => {
      expect(formatter.parse('-$123.45')).toEqual(-123.45);
    });
  });

  describe('format', () => {
    it('returns an empty string for null', () => {
      expect(formatter.format(null)).toEqual('');
    });

    it('returns an empty string for undefined', () => {
      expect(formatter.format(undefined)).toEqual('');
    });

    it('returns an empty string for an invalid number', () => {
      expect(formatter.format(NaN)).toEqual('');
    });

    it('correctly formats a positive integer', () => {
      expect(formatter.format(123)).toEqual('$123.00');
    });

    it('correctly formats a negative integer', () => {
      expect(formatter.format(-123)).toEqual('-$123.00');
    });
  });
});
