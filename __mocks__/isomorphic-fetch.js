const fakeMethods = ['methods', 'test'];
const fakeResponse = 'fake response';
const fetch = jest.fn((url, options) => {
  if (JSON.parse(options.body).name === 'methods') {
    return Promise.resolve({
      json: () => Promise.resolve({
        result: fakeMethods,
      }),
    });
  }
  return Promise.resolve({
    json: () => Promise.resolve({
      result: fakeResponse,
    }),
  });
});
fetch.fakeMethods = fakeMethods;
fetch.fakeResponse = fakeResponse;
module.exports = fetch;
