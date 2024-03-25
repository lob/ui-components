// eslint-disable-next-line no-console
const originalConsoleError = console.error;

// eliminate noise in test console by ignoring jsdom's failure to parse some css features
// see: https://stackoverflow.com/a/75757070
// eslint-disable-next-line no-console
console.error = function (...data) {
  if (
    typeof data[0]?.toString === 'function' &&
    data[0].toString().includes('Error: Could not parse CSS stylesheet')
  ) {
    return;
  }
  originalConsoleError(...data);
};
