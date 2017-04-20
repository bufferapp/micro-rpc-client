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
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: 'methods',
              }),
            });
          expect(methods)
            .toEqual(fetch.fakeMethods);
        });
    });
  });

  describe('call', () => {
    it('should call RPC method', () => {
      const name = 'someMethod';
      const rpc = new RPCClient();
      return rpc.call(name)
        .then((response) => {
          expect(fetch)
            .toBeCalledWith('http://localhost', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name,
              }),
            });
          expect(response)
            .toEqual(fetch.fakeResponse);
        });
    });

    it('should call RPC method with args', () => {
      const name = 'someMethod';
      const args = { a: 'a', b: 'b' };
      const rpc = new RPCClient();
      return rpc.call(name, args)
        .then((response) => {
          expect(fetch)
            .toBeCalledWith('http://localhost', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name,
                args: JSON.stringify(args),
              }),
            });
          expect(response)
            .toEqual(fetch.fakeResponse);
        });
    });

    it('should trigger error when response !== 200', () => {
      const name = 'shouldThrow';
      const rpc = new RPCClient();
      return rpc.call(name)
        .then(() => {
          throw new Error('this should not happen');
        })
        .catch((err) => {
          expect(err)
            .toEqual(new Error('this method should throw an error'));
        });
    });
  });
});
