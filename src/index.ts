import * as Sentry from '@sentry/node';
import TransportStream from 'winston-transport';

export interface ISentryTransportOptions extends TransportStream.TransportStreamOptions {
  sentry: Sentry.NodeOptions;
}

export class SentryTransport extends TransportStream {
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