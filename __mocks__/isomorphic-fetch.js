const fakeMethods = ['methods', 'test'];
const fakeResponse = 'fake response';
const fetch = jest.fn((url, options) => {
  if (JSON.parse(options.body).name === 'methods') {
    return Promise.resolve({
      status: 200,
      json: () => Promise.resolve({
        result: fakeMethods,
      }),
    });
  } else if (JSON.parse(options.body).name === 'shouldThrow') {
    return Promise.resolve({
      status: 400,
      json: () => Promise.resolve({
        error: 'this method should throw an error',
      }),
    });
  }
  return Promise.resolve({
    status: 200,
    json: () => Promise.resolve({
      result: fakeResponse,
    }),
  });
});
fetch.fakeMethods = fakeMethods;
fetch.fakeResponse = fakeResponse;
module.exports = fetch;
