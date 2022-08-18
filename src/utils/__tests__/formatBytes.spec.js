import { formatBytes } from '../formatBytes';

describe('formatBytes', () => {

  it('returns the correct size in bytes', () => {
    const expected = '10Bytes';
    const actual = formatBytes(10);
    expect(actual).toEqual(expected);
  });

  it('returns the correct size in MB', () => {
    const expected = '1MB';
    const actual = formatBytes(1048576);
    expect(actual).toEqual(expected);
  });

  it('returns the correct size in GB', () => {
    const expected = '2GB';
    const actual = formatBytes(2147483648);
    expect(actual).toEqual(expected);
  });

});
