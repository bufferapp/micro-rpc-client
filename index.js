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
      .then((response) => {
        const bodyPromise = response.json();

        return bodyPromise
          .then((body) => {
            if (body.error) {
              // throw a handled exception
              const err = new Error(body.error);
              err.handled = true;
              err.status = response.status;
              throw err;
            }

            return body.result;
          });
      });
  }
}

module.exports = RPCClient;
