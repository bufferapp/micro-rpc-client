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
});
