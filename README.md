[![npm](https://img.shields.io/npm/v/nativescript-xmpp.svg)](https://www.npmjs.com/package/nativescript-xmpp)
[![npm](https://img.shields.io/npm/dt/nativescript-xmpp.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-xmpp)
[![Build Status](https://travis-ci.org/triniwiz/nativescript-xmpp.svg?branch=master)](https://travis-ci.org/triniwiz/nativescript-xmpp)

# Nativescript XMPP

## Installation

```javascript
tns plugin add nativescript-xmpp
```

## Usage

```ts
import { isIOS } from 'tns-core-modules/platform';
import { XMPP, Presence } from 'nativescript-xmpp';
const xmpp = new XMPP({
  username: 'user',
  password: 'password',
  domain: 'localhost',
  host: isIOS ? 'localhost' : '10.0.2.2'
});
xmpp.on('connected', args => {
  xmpp.login();
});
xmpp.on('authenticated', (args: any) => {
  const presence = new Presence();
  presence.status = 'Nice';
  xmpp.send(presence);
});
xmpp.connect();
```

## License

Apache License Version 2.0, January 2004
