const fetch = require('isomorphic-fetch');

class RPCClient {
  constructor(options = {}) {
    this.url = options.url || 'http://localhost';
    this.sendCredentials = options.sendCredentials;
  }

  listMethods() {
    return this.call('methods');
  }

  call(name, args) {
    return fetch(this.url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        args: JSON.stringify(args),
      }),
      credentials: this.sendCredentials,
    })
      .then(({ json, status }) =>
        new Promise((resolve, reject) => {
          json()
            .then(parsedResponse => resolve({
              response: parsedResponse,
              status,
            }))
            .catch(error => reject(error));
        }))
      .then(({ response, status }) => {
        if (response.error) {
          // throw a handled exception
          const err = new Error(response.error);
          err.code = response.code;
          err.handled = status === 400;
          throw err;
        }
        return response;
      })
      .then(response => response.result);
  }
}

module.exports = RPCClient;
