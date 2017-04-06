const fetch = require('isomorphic-fetch');
const RPCClient = require('./index');

describe('RPCClient', () => {
  it('should create an RPCClient', () => {
    expect(new RPCClient())
      .toBeDefined();
  });

  it('should set RPC server url', () => {
    const serverUrl = 'http://some-rpc-server';
    const rpc = new RPCClient({ serverUrl });
    expect(rpc.serverUrl)
      .toBe(serverUrl);
  });

  it('should set default RPC server url', () => {
    const rpc = new RPCClient();
    expect(rpc.serverUrl)
      .toBe('http://localhost');
  });

  describe('listMethods', () => {
    it('should list available RPC methods', () => {
      const rpc = new RPCClient();
      return rpc.listMethods()
        .then((methods) => {
          expect(fetch)
            .toBeCalledWith('http://localhost', {
              methods: 'post',
              headers: {
                'Content-Type': 'application/json',
              },
              body: {
                name: 'methods',
              },
            });
          expect(methods)
            .toEqual(fetch.fakeMethods);
        });
    });
  });

  describe('call', () => {
    const name = 'someMethod';
    const rpc = new RPCClient();
    return rpc.call(name)
      .then((response) => {
        expect(fetch)
          .toBeCalledWith('http://localhost', {
            methods: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              name,
            },
          });
        expect(response)
          .toEqual(fetch.fakeResponse);
      });
  });
});
