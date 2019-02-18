import * as Sentry from '@sentry/node';
import TransportStream from 'winston-transport';
export interface ISentryTransportOptions extends TransportStream.TransportStreamOptions {
    sentry?: Sentry.NodeOptions;
}
export default class SentryTransport extends TransportStream {
    silent: boolean;
    private levelsMap;
    constructor({ sentry, ...opts }: ISentryTransportOptions);
    log(info: any, callback: () => void): void;
    readonly sentry: typeof Sentry;
    private withDefaults;
    private normalizeMessage;
    private shouldLogMessage;
}
