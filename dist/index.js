"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Sentry = tslib_1.__importStar(require("@sentry/node"));
var winston_transport_1 = tslib_1.__importDefault(require("winston-transport"));
var SentryTransport = /** @class */ (function (_super) {
    tslib_1.__extends(SentryTransport, _super);
    function SentryTransport(opts) {
        var _this = _super.call(this, opts) || this;
        Sentry.init(opts.sentry);
        return _this;
    }
    SentryTransport.prototype.log = function (info, callback) {
        var _this = this;
        setImmediate(function () {
            _this.emit('logged', info);
        });
        Sentry.captureEvent({
            message: 'Manual',
            stacktrace: {
                frames: [info]
            },
        });
        callback();
    };
    return SentryTransport;
}(winston_transport_1.default));
exports.SentryTransport = SentryTransport;
;
//# sourceMappingURL=index.js.map