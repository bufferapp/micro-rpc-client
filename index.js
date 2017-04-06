// curl
// -X POST https://rpc.local.buffer.com
// -H "Content-Type: application/json"
// --insecure
// -d '{
//   "name":"updates/pending",
//   "args": "{
//     \"token\":
//     \"jason.web.token\",
//     \"profileId\":\"58bf1e82d288ec0a007b23cd\"
//   }"
// }'

// fetch(url, {
//   credentials: 'include', //pass cookies, for authentication
//   method: 'post',
//   headers: {
//   'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
//   'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
//   },
//   body: form
// });

// const rpc = new RPCClient('server');
// rpc.listMethods().then((methods) => console.log(methods));

const fetch = require('isomorphic-fetch');

class RPCClient {
  constructor(options = {}) {
    this.serverUrl = options.serverUrl || 'http://localhost';
  }

  listMethods() {
    return this.call('methods');
  }

  call(name, args) {
    return fetch(this.serverUrl, {
      methods: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        name,
        args: args ? JSON.stringify(args) : undefined,
      },
    })
      .then(response => response.result);
  }
}

module.exports = RPCClient;
