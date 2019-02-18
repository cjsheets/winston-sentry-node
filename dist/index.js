"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Sentry = tslib_1.__importStar(require("@sentry/node"));
var winston_transport_1 = tslib_1.__importDefault(require("winston-transport"));
var SentryTransport = /** @class */ (function (_super) {
    tslib_1.__extends(SentryTransport, _super);
    function SentryTransport(_a) {
        var sentry = _a.sentry, opts = tslib_1.__rest(_a, ["sentry"]);
        var _this = _super.call(this, opts) || this;
        _this.silent = false;
        _this.levelsMap = {
            silly: Sentry.Severity.Debug,
            verbose: Sentry.Severity.Debug,
            info: Sentry.Severity.Info,
            debug: Sentry.Severity.Debug,
            warn: Sentry.Severity.Warning,
            error: Sentry.Severity.Error
        };
        Sentry.init(_this.withDefaults(sentry));
        return _this;
    }
    SentryTransport.prototype.log = function (info, callback) {
        var _this = this;
        setImmediate(function () {
            _this.emit('logged', info);
        });
        var level = this.levelsMap[info.level];
        if (!this.silent && this.shouldLogMessage(level)) {
            var message = this.normalizeMessage(info);
            Sentry.captureMessage(message, level);
        }
        callback();
    };
    Object.defineProperty(SentryTransport.prototype, "sentry", {
        get: function () {
            return Sentry;
        },
        enumerable: true,
        configurable: true
    });
    SentryTransport.prototype.withDefaults = function (options) {
        this.silent = options && options.silent || false;
        return tslib_1.__assign({ dsn: process.env.SENTRY_DSN || '' }, options);
    };
    SentryTransport.prototype.normalizeMessage = function (msg) {
        return msg instanceof Error ? msg.message : msg;
    };
    SentryTransport.prototype.shouldLogMessage = function (level) {
        return level === Sentry.Severity.Error || level === Sentry.Severity.Warning;
    };
    return SentryTransport;
}(winston_transport_1.default));
exports.SentryTransport = SentryTransport;
;
//# sourceMappingURL=index.js.map