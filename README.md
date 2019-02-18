# winston-sentry-node

[![node](https://img.shields.io/badge/node-6.x+-brightgreen.svg)][node-url]
[![winston](https://img.shields.io/badge/winston-3.x+-brightgreen.svg)][winston-url]
[![sentry](https://img.shields.io/badge/sentry-4.x+-brightgreen.svg)][sentry-url]
![travis](https://travis-ci.org/cjsheets/winston-sentry-node.svg?branch=master)


A simple [Sentry/Node.js](https://docs.sentry.io/platforms/node/) transport for the winston 3.x logger. 

## Install

```bash
npm install --save winston-sentry-node
```

## Usage

Sample configuration:

```js
const winston = require('winston'),
const SentryTransport = require('winston-sentry-node');

var logger = new winston.Logger({
  transports: [
    new winston.transports.Console({level: 'verbose'}),
    new SentryTransport({
      dsn: "{{ YOUR SENTRY DSN }}"
    })
  ],
});
```
You can also add the DSN to the `SENTRY_DSN` environment variable.

`Sentry.init({dsn: ...})` is called automatically when you create the transport.

## License

[MIT License][license-url]


[license-url]: LICENSE
[node-url]: https://nodejs.org
[sentry-url]: https://github.com/getsentry/sentry-javascript/tree/master/packages/node
[winston-url]: https://github.com/winstonjs/winston