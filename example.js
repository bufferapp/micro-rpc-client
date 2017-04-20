/* eslint-disable */
const RPCClient = require('./index');

const rpc = new RPCClient({
  serverUrl: 'https://rpc.local.buffer.com',
});

rpc.listMethods()
  .then((methods) => {
    console.log('methods', methods);
  });

let savedToken;

rpc.call('login', {
  email: 'hharnisc@gmail.com',
  password: 'password',
})
  .then(({ token }) => {
    savedToken = token;
  })
  .then(() => rpc.call('profiles', { token: savedToken }))
  .then(profiles => Promise.all(profiles.map(profile => rpc.call('updates/pending', {
    token: savedToken,
    profileId: profile._id,
  }))))
  .then(pendingUpdates => console.log('pendingUpdates', pendingUpdates));

rpc.call('does not exist')
  .then(() => console.log('this should never happen'))
  .catch(err => console.error('Error from server:', err));
