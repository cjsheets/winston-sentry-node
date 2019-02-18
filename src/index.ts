import * as Sentry from '@sentry/node';
import TransportStream from 'winston-transport';

export interface ISentryTransportOptions extends TransportStream.TransportStreamOptions {
  sentry?: Sentry.NodeOptions;
}

export default class SentryTransport extends TransportStream {
  public silent = false;
  private levelsMap = {
    silly: Sentry.Severity.Debug,
    verbose: Sentry.Severity.Debug,
    info: Sentry.Severity.Info,
    debug: Sentry.Severity.Debug,
    warn: Sentry.Severity.Warning,
    error: Sentry.Severity.Error
  };

  constructor({ sentry, ...opts }: ISentryTransportOptions) {
    super(opts);
    Sentry.init(this.withDefaults(sentry || {}));
  }

  log(info: any, callback: () => void) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    const level = (this.levelsMap as any)[info.level];
    if (!this.silent && this.shouldLogMessage(level)) {
      const message = this.normalizeMessage(info);
      Sentry.captureMessage(message, level);
    } 

    callback();
  }

  get sentry() {
    return Sentry;
  }

  private withDefaults(options: Sentry.NodeOptions) {
    this.silent = options && options.silent || false;

    return {
      dsn: process.env.SENTRY_DSN || '',
      ...options
    }
  }

  private normalizeMessage(msg: any) {
    return msg && msg.message ? msg.message : msg;
  }

  private shouldLogMessage(level: Sentry.Severity) {
    return level === Sentry.Severity.Error || level === Sentry.Severity.Warning;
  }
};