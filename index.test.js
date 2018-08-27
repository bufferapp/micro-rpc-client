const fetch = require('isomorphic-fetch');
const RPCClient = require('./index');

const mockPayload = body => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

describe('RPCClient', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should create an RPCClient', () => {
    expect(new RPCClient())
      .toBeDefined();
  });

  it('should set RPC server url', () => {
    const url = 'http://some-rpc-server';
    const rpc = new RPCClient({ url });
    expect(rpc.url)
      .toBe(url);
  });

  it('should set default RPC server url', () => {
    const rpc = new RPCClient();
    expect(rpc.url)
      .toBe('http://localhost');
  });

  describe('listMethods', () => {
    it('should call `methods` method', () => {
      const rpc = new RPCClient();

      rpc.listMethods();

      expect(fetch).toBeCalledWith(
        'http://localhost',
        mockPayload({
          name: 'methods',
        }),
      );
    });
  });

  describe('call', () => {
    it('should call RPC method', () => {
      const name = 'someMethod';
      const rpc = new RPCClient();

      rpc.call(name);

      expect(fetch).toBeCalledWith(
        'http://localhost',
        mockPayload({
          name,
        }),
      );
    });

    it('should call RPC method with args', () => {
      const name = 'someMethod';
      const args = { a: 'a', b: 'b' };
      const rpc = new RPCClient();

      rpc.call(name, args);

      expect(fetch).toBeCalledWith(
        'http://localhost',
        mockPayload({
          name,
          args: JSON.stringify(args),
        }),
      );
    });

    it('should return the result for an RPC method', () => {
      const name = 'someMethod';
      const args = { a: 'a', b: 'b' };
      const rpc = new RPCClient();

      const response = rpc.call(name, args);

      return expect(response).resolves.toEqual(fetch.fakeResponse);
    });

    it('should trigger error when response !== 200', () => {
      const name = 'shouldThrow';
      const rpc = new RPCClient();

      const response = rpc.call(name);

      return expect(response).rejects.toThrow('this method should throw an error');
    });

    it('should include the status code in the error when response !== 200', () => {
      const name = 'shouldThrow';
      const rpc = new RPCClient();

      const response = rpc.call(name);

      return expect(response).rejects.toMatchObject({ status: 400 });
    });
  });
});
