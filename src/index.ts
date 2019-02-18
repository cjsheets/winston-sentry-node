import * as Sentry from '@sentry/node';
import * as Transport from 'winston-transport';

export interface ISentryTransportOptions extends Transport.TransportStreamOptions {
  sentry: Sentry.NodeOptions;
}

export class SentryTransport extends Transport {
  constructor(opts: ISentryTransportOptions) {
    super(opts);
    Sentry.init(opts.sentry);
  }

  log(info: any, callback: () => void) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    Sentry.captureEvent({
      message: 'Manual',
      stacktrace: {
        frames: [ info ]
      },
    });

    callback();
  }
};