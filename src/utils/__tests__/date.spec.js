import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, setMonth, setYear, addDays, clamp, inRange, isEqualMonth, isEqual } from '../../utils';
import { DaysOfWeek, getViewOfMonth } from '../date';

const testDate = new Date('2021-05-03T11:01:58.135Z');
const realDate = Date;

const dateMock = class extends Date {
  constructor (...args) {
    if (args.length > 0) {
      // eslint-disable-next-line constructor-super, no-constructor-return
      return super(...args);
    }

    // eslint-disable-next-line no-constructor-return
    return testDate;
  }
};

let today;
beforeAll(() => {
  global.Date = dateMock;
  today = new Date();
});

afterAll(() => {
  global.Date = realDate;
});

describe('date helpers', () => {

  describe('addDays', () => {

    it('returns a date in the future when days param is positive', () => {
      const difference = 2;

      const result = addDays(today, difference);
      expect(result > today).toEqual(true);
      expect(result.getDate() - today.getDate()).toEqual(difference);
    });

    it('returns a date in the past when days param is negative', () => {
      const difference = -2;

      const result = addDays(today, difference);
      expect(result < today).toEqual(true);
      expect(result.getDate() - today.getDate()).toEqual(difference);
    });

  });

  describe('setMonth', () => {

    it('returns a new date with the month set to the appropriate value', () => {
      const month = 2;

      const result = setMonth(today, month);
      expect(result).not.toBe(today);
      expect(result.getMonth()).toEqual(month);
    });

  });

  describe('setYear', () => {

    it('returns a new date with the year set to the appropriate value', () => {
      const year = 2020;

      const result = setYear(today, year);
      expect(result).not.toBe(today);
      expect(result.getFullYear()).toEqual(year);
    });

  });

  describe('isEqualMonth', () => {

    it('returns false when one of the params is null', () => {
      const testDate = null;
      expect(isEqualMonth(today, testDate)).toEqual(false);
    });

    it('returns false when the dates are in different months in the same year', () => {
      const testDate = new Date(2021, 2, 1);
      expect(isEqualMonth(today, testDate)).toEqual(false);
    });

    it('returns false when the dates are in the same month in different years', () => {
      const testDate = new Date(2020, 4, 1);
      expect(isEqualMonth(today, testDate)).toEqual(false);
    });

    it('returns true when the dates are in the same month in the same year', () => {
      const testDate = new Date(2021, 4, 1);
      expect(isEqualMonth(today, testDate)).toEqual(true);
    });

  });

  describe('isEqual', () => {

    it('returns false when one of the params is null', () => {
      const testDate = null;
      expect(isEqual(today, testDate)).toEqual(false);
    });

    it('returns false when the dates are different dates in different months', () => {
      const testDate = new Date(2021, 2, 1);
      expect(isEqualMonth(today, testDate)).toEqual(false);
    });

    it('returns false when the dates are the same date in different months', () => {
      const testDate = new Date(2020, 2, 3);
      expect(isEqualMonth(today, testDate)).toEqual(false);
    });

    it('returns true when the dates are the same date in the same month', () => {
      const testDate = new Date(2021, 4, 3);
      expect(isEqualMonth(today, testDate)).toEqual(true);
    });

  });

  describe('startOfWeek', () => {

    it('returns the Sunday at the start of the week for the provided date', () => {
      const start = startOfWeek(today);
      expect(start.getFullYear()).toEqual(today.getFullYear());
      expect(start.getMonth()).toEqual(today.getMonth());
      expect(start.getDate()).toEqual(2);
    });

    it('returns the start of the week (today) for the provided date when the firstDayOfWeek param is Monday', () => {
      const start = startOfWeek(today, DaysOfWeek.Monday);
      expect(start.getFullYear()).toEqual(today.getFullYear());
      expect(start.getMonth()).toEqual(today.getMonth());
      expect(start.getDate()).toEqual(3);
    });

    it('returns last week Tuesday as the start of the week for the provided date when the firstDayOfWeek param is Tuesday', () => {
      const start = startOfWeek(today, DaysOfWeek.Tuesday);
      expect(start.getFullYear()).toEqual(today.getFullYear());
      expect(start.getMonth()).toEqual(3);
      expect(start.getDate()).toEqual(27);
    });

  });

  describe('endOfWeek', () => {

    it('returns the Saturday at the start of the week for the provided date', () => {
      const start = endOfWeek(today);
      expect(start.getFullYear()).toEqual(today.getFullYear());
      expect(start.getMonth()).toEqual(today.getMonth());
      expect(start.getDate()).toEqual(8);
    });

    it('returns next Sunday for the provided date when the firstDayOfWeek param is Monday', () => {
      const start = endOfWeek(today, DaysOfWeek.Monday);
      expect(start.getFullYear()).toEqual(today.getFullYear());
      expect(start.getMonth()).toEqual(today.getMonth());
      expect(start.getDate()).toEqual(9);
    });

    it('returns today (end of week) as the start of the week for the provided date when the firstDayOfWeek param is Tuesday', () => {
      today = new Date();
      const start = endOfWeek(today, DaysOfWeek.Tuesday);
      expect(start.getFullYear()).toEqual(today.getFullYear());
      expect(start.getMonth()).toEqual(today.getMonth());
      expect(start.getDate()).toEqual(3);
    });

  });

  describe('startOfMonth', () => {

    it('returns the first of the month for the date', () => {
      today = new Date();
      const start = startOfMonth(today);
      expect(start.getFullYear()).toEqual(today.getFullYear());
      expect(start.getMonth()).toEqual(today.getMonth());
      expect(start.getDate()).toEqual(1);
    });

  });

  describe('endOfMonth', () => {

    it('returns the last of the month for the date', () => {
      const start = endOfMonth(today);
      expect(start.getFullYear()).toEqual(today.getFullYear());
      expect(start.getMonth()).toEqual(today.getMonth());
      expect(start.getDate()).toEqual(31);
    });

  });

  describe('getViewOfMonth', () => {

    it('returns full weeks given start and end of the month (going back to previous month if does not start on a Sunday)', () => {
      const month = getViewOfMonth(today);
      const firstDay = month[0];
      const lastDay = month[month.length - 1];

      expect(firstDay.getFullYear()).toEqual(today.getFullYear());
      expect(firstDay.getMonth()).toEqual(3);
      expect(firstDay.getDate()).toEqual(25);

      expect(lastDay.getFullYear()).toEqual(today.getFullYear());
      expect(lastDay.getMonth()).toEqual(5);
      expect(lastDay.getDate()).toEqual(5);
    });

  });

  describe('clamp', () => {

    it('returns the date if it is within range of the min and max', () => {
      const min = new Date(2021, 4, 1);
      const max = new Date(2021, 4, 30);
      const date = clamp(today, min, max);

      expect(date).toEqual(today);
    });

    it('returns the min if the date is less than the min', () => {
      const min = new Date(2021, 6, 1);
      const max = new Date(2021, 6, 30);
      const date = clamp(today, min, max);

      expect(date).toEqual(min);
    });

    it('returns the max if the date is greater than the max', () => {
      const min = new Date(2021, 3, 1);
      const max = new Date(2021, 3, 30);
      const date = clamp(today, min, max);

      expect(date).toEqual(max);
    });

  });

  describe('inRange', () => {

    it('returns true if it is within range of the min and max', () => {
      const min = new Date(2021, 4, 1);
      const max = new Date(2021, 4, 30);
      const result = inRange(today, min, max);

      expect(result).toEqual(true);
    });

    it('returns false if the date is less than the min', () => {
      const min = new Date(2021, 6, 1);
      const max = new Date(2021, 6, 30);
      const result = inRange(today, min, max);

      expect(result).toEqual(false);
    });

    it('returns false if the date is greater than the max', () => {
      const min = new Date(2021, 3, 1);
      const max = new Date(2021, 3, 30);
      const result = inRange(today, min, max);

      expect(result).toEqual(false);
    });

  });

});
