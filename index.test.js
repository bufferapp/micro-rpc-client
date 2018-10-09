const fetch = require('isomorphic-fetch');
const RPCClient = require('./index');

describe('RPCClient', () => {
  it('should create an RPCClient', () => {
    expect(new RPCClient()).toBeDefined();
  });

  it('should set RPC server url', () => {
    const url = 'http://some-rpc-server';
    const rpc = new RPCClient({ url });
    expect(rpc.url).toBe(url);
  });

  it('should set default RPC server url', () => {
    const rpc = new RPCClient();
    expect(rpc.url).toBe('http://localhost');
  });

  describe('listMethods', () => {
    it('should list available RPC methods', () => {
      const rpc = new RPCClient();
      return rpc.listMethods().then((methods) => {
        expect(fetch).toBeCalledWith('http://localhost', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'methods',
          }),
        });
        expect(methods).toEqual(fetch.fakeMethods);
      });
    });
  });

  describe('call', () => {
    it('should call RPC method', () => {
      const name = 'someMethod';
      const rpc = new RPCClient();
      return rpc.call(name).then((response) => {
        expect(fetch).toBeCalledWith('http://localhost', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
          }),
        });
        expect(response).toEqual(fetch.fakeResponse);
      });
    });

    it('should call RPC method with args', () => {
      const name = 'someMethod';
      const args = { a: 'a', b: 'b' };
      const rpc = new RPCClient();
      return rpc.call(name, args).then((response) => {
        expect(fetch).toBeCalledWith('http://localhost', {
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
        expect(response).toEqual(fetch.fakeResponse);
      });
    });

    it('should trigger error when response !== 200', async () => {
      expect.assertions(4);
      const name = 'shouldThrow';
      const rpc = new RPCClient();
      try {
        await rpc.call(name);
      } catch (err) {
        expect(err.handled).toBe(true);
        expect(err.message).toBe('this method should throw an error');
        expect(err.code).toBeUndefined();
        expect(err.status).toBe(400);
      }
    });

    it('should trigger error when response !== 200 with custom code', async () => {
      expect.assertions(5);
      const name = 'shouldThrowCustomCode';
      const rpc = new RPCClient();
      try {
        await rpc.call(name);
      } catch (err) {
        expect(err.message).toBe('this method should throw an error');
        expect(err.code).toBeDefined();
        expect(err.code).toBe(fetch.fakeCode);
        expect(err.handled).toBe(true);
        expect(err.status).toBe(400);
      }
    });

    it('should trigger an unhandled error when response === 500', async () => {
      expect.assertions(3);
      const name = 'shouldThrowJSON500';
      const rpc = new RPCClient();
      try {
        await rpc.call(name);
      } catch (err) {
        expect(err.message).toBe('some unexpected error occured');
        expect(err.handled).toBe(false);
        expect(err.status).toBe(500);
      }
    });

    it('should reject when json parse fails', async () => {
      expect.assertions(1);
      const name = 'shouldFailJson';
      const rpc = new RPCClient();
      try {
        await rpc.call(name);
      } catch (err) {
        expect(err.message).toBe('something went wrong parsing json');
      }
    });
  });
});
