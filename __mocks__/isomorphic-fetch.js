const fakeMethods = ['methods', 'test'];
const fakeResponse = 'fake response';
const fakeCode = 1001;

const parseMethodFromUrl = (url) => {
  const split = url.split('/');
  return split.pop();
}

const fetch = jest.fn((url, options) => {
  if (parseMethodFromUrl(url) === 'methods') {
    return Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve({
          result: fakeMethods,
        }),
    });
  } else if (parseMethodFromUrl(url) === 'shouldThrow') {
    return Promise.resolve({
      status: 400,
      json: () =>
        Promise.resolve({
          error: 'this method should throw an error',
          handled: true,
        }),
    });
  } else if (parseMethodFromUrl(url) === 'shouldThrowCustomCode') {
    return Promise.resolve({
      status: 400,
      json: () =>
        Promise.resolve({
          error: 'this method should throw an error',
          code: fakeCode,
          handled: true,
        }),
    });
  } else if (parseMethodFromUrl(url) === 'shouldThrowJSON500') {
    return Promise.resolve({
      status: 500,
      json: () =>
        Promise.resolve({
          error: 'some unexpected error occured',
          handled: false,
        }),
    });
  } else if (parseMethodFromUrl(url) === 'shouldFailJson') {
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
