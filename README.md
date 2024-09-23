# deprecated
As of the 23rd of September 2024, `micro-rpc-client` will be unmaintained and deprecated. 

# micro-rpc-client

[![Build Status](https://travis-ci.org/bufferapp/micro-rpc-client.svg?branch=master)](https://travis-ci.org/bufferapp/micro-rpc-client)

Universal JS RPC Client https://github.com/bufferapp/buffer-rpc/

## Quickstart

Create an RPC Client and call an add function

```js
const RPCClient = require('micro-rpc-client');

const client = new RPCClient({
  url: 'https://localhost:3000/rpc',
});

const main = async () => {
  const result = await client.call('add', [1, 2]);
  console.log(result); // 3
};
main();
```

## Usage

A few examples of how to call client methods

```js
const RPCClient = require('micro-rpc-client');

const client = new RPCClient({
  url: 'https://localhost:3000/rpc',
  sendCredentials: 'same-origin', // send cookies on same origin requests
});

const main = async () => {
  const methods = await client.listMethods();
  console.log(method);
  /*
  [
    {
      "docs": "add two numbers"
      "name": "add"
    },
    {
      "docs": "list all available methods",
      "name": "methods"
    }
  ]
  */
  const result = await client.call('add', [1, 2]);
  console.log(result); // 3
};
main();
```

## API

### constructor

Create an instance of RPCClient

```js
const client = new RPCClient({
  url,
  sendCredentials,
});
```

**url** - _string_ - full url to the RPC Endpoint Server  
**sendCredentials** - _string_ - when to send things like cookies with a request, passes arguments to the credentials init argument in the fetch API https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters

Returns an instance of the RPC client

### listMethods

List all remote methods on a server

```js
const methods = await client.listMethods()
```

Returns a promise that resolves with a list of the remote methods

### call

```js
const result = await client.call(name, args)
```

**name** - _string_ - name of the remote RPC endpoint  
**args** - _array_ or _object_ - arguments to pass to the remote RPC endpoint

Returns a promise that resolves with the result and rejects with an error.

## Error Handling

When calling a remote function with `call` there are different categories of responses:

### Success

This is the typical success case

```
statusCode = 200
result = {} // JSON
```

### Fail (Handled)

An error triggered from [createError](https://github.com/bufferapp/buffer-rpc/blob/master/README.md#createerror):

```
statusCode = 400
result = {
  error: 'string',
  code: 1000, // or some custom code
  handled: true,
}
```

### Fail (Unhandled)

An error triggered from [errorMiddleware](https://github.com/bufferapp/buffer-rpc/blob/master/README.md#createerror):

```
statusCode = 500
result = {
  error: 'string',
  code: 1000, // or some custom code
  handled: true,
}
```

### Fail (Unexpected)

If the [errorMiddleware](https://github.com/bufferapp/buffer-rpc/blob/master/README.md#createerror) is not hooked up, or something unexpected happened the original error will be thrown.
