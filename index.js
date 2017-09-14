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
      .then(response => response.json())
      .then((response) => {
        if (response.error) {
          // throw a handled exception
          const err = new Error(response.error);
          err.handled = true;
          throw err;
        }
        return response;
      })
      .then(response => response.result);
  }
}

module.exports = RPCClient;
