const fetch = require('isomorphic-fetch');

class RPCClient {
  constructor(options = {}) {
    this.url = options.url || 'http://localhost';
    this.sendCredentials = options.sendCredentials;
  }

  listMethods() {
    return this.call('methods');
  }

  call(name, args, headers = {}) {
    return fetch(`${this.url}/${name}`, {
      method: 'POST',
      headers: Object.assign({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }, headers),
      body: JSON.stringify({
        args: JSON.stringify(args),
      }),
      credentials: this.sendCredentials,
    })
      .then(
        response =>
          new Promise((resolve, reject) => {
            response
              .json()
              .then(parsedResponse =>
                resolve({
                  response: parsedResponse,
                  status: response.status,
                }),
              )
              .catch(error => reject(error));
          }),
      )
      .then(({ response, status }) => {
        if (response.error) {
          const err = new Error(response.error);
          err.code = response.code;
          err.handled = response.handled;
          err.status = status;
          throw err;
        }
        return response;
      })
      .then(response => response.result);
  }
}

module.exports = RPCClient;
