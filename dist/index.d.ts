import * as Sentry from '@sentry/node';
import TransportStream from 'winston-transport';
export interface ISentryTransportOptions extends TransportStream.TransportStreamOptions {
    sentry: Sentry.NodeOptions;
}
export declare class SentryTransport extends TransportStream {
    constructor(opts: ISentryTransportOptions);
    log(info: any, callback: () => void): void;
}
