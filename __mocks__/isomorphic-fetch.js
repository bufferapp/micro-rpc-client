const fakeMethods = ['methods', 'test'];
const fakeResponse = 'fake response';
const fakeCode = 1001;
const fetch = jest.fn((url, options) => {
  if (JSON.parse(options.body).name === 'methods') {
    return Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve({
          result: fakeMethods,
        }),
    });
  } else if (JSON.parse(options.body).name === 'shouldThrow') {
    return Promise.resolve({
      status: 400,
      json: () =>
        Promise.resolve({
          error: 'this method should throw an error',
        }),
    });
  } else if (JSON.parse(options.body).name === 'shouldThrowCustomCode') {
    return Promise.resolve({
      status: 400,
      json: () =>
        Promise.resolve({
          error: 'this method should throw an error',
          code: fakeCode,
        }),
    });
  } else if (JSON.parse(options.body).name === 'shouldThrowJSON500') {
    return Promise.resolve({
      status: 500,
      json: () => Promise.resolve({
        error: 'some unexpected error occured',
      }),
    });
  } else if (JSON.parse(options.body).name === 'shouldFailJson') {
    return Promise.resolve({
      status: 500,
      json: () => Promise.reject(new Error('something went wrong parsing json')),
    });
  }
  return Promise.resolve({
    status: 200,
    json: () =>
      Promise.resolve({
        result: fakeResponse,
      }),
  });
});
fetch.fakeMethods = fakeMethods;
fetch.fakeResponse = fakeResponse;
fetch.fakeCode = fakeCode;
module.exports = fetch;
