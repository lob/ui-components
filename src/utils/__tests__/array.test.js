import { findLastIndex } from '../array';

beforeAll(() => {
  if (!Array.prototype.findLastIndex) {
    Array.prototype.findLastIndex = findLastIndex; //eslint-disable-line 
  }
});

afterAll(() => {
    Array.prototype.findLastIndex = undefined; //eslint-disable-line 
});

describe('array utils', () => {

  describe('findLastIndex', () => {

    it('throws an error when \'this\' is undefined', () => {
      const subject = null;
      expect(() => {
        subject.findLastIndex((el) => el === 'a');
      }).toThrow('Cannot read property \'findLastIndex\' of null');
    });

    it('throws an error when the predicate is not a function', () => {
      const subject = ['a', 'b', 'a'];
      expect(() => {
        subject.findLastIndex('a');
      }).toThrow();
    });

    it('returns the last index of an element that satisfies the predicate', () => {
      const subject = ['a', 'b', 'a'];
      const index = subject.findLastIndex((el) => el === 'a');
      expect(index).toEqual(2);
    });

    it('returns -1 if no element can be found that satisfies the predicate', () => {
      const subject = ['a', 'b', 'a'];
      const index = subject.findLastIndex((el) => el === 'c');
      expect(index).toEqual(-1);
    });

  });

});
