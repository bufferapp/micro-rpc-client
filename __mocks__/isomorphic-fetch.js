const fakeMethods = ['methods', 'test'];
const fetch = jest.fn(() => Promise.resolve({
  result: fakeMethods,
}));
fetch.fakeMethods = fakeMethods;
module.exports = fetch;
