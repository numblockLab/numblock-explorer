var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.parseTime = exports.parseOldCookies = void 0;
var tslib_1 = require("tslib");
var analytics_client_common_1 = require("@amplitude/analytics-client-common");
var config_1 = require("../config");
var local_storage_1 = require("../storage/local-storage");
var parseOldCookies = function (apiKey, options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var storage, oldCookieName, cookies, _a, deviceId, userId, optOut, sessionId, lastEventTime;
    var _b;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                storage = new analytics_client_common_1.CookieStorage();
                return [4 /*yield*/, storage.isEnabled()];
            case 1:
                if (!(_c.sent()) || (options === null || options === void 0 ? void 0 : options.disableCookies)) {
                    storage = new local_storage_1.LocalStorage();
                }
                return [4 /*yield*/, storage.isEnabled()];
            case 2:
                if (!(_c.sent())) {
                    return [2 /*return*/, {
                            optOut: false,
                        }];
                }
                oldCookieName = (0, analytics_client_common_1.getOldCookieName)(apiKey);
                return [4 /*yield*/, storage.getRaw(oldCookieName)];
            case 3:
                cookies = _c.sent();
                if (!cookies) {
                    return [2 /*return*/, {
                            optOut: false,
                        }];
                }
                if (!((_b = options === null || options === void 0 ? void 0 : options.cookieUpgrade) !== null && _b !== void 0 ? _b : (0, config_1.getDefaultConfig)().cookieUpgrade)) return [3 /*break*/, 5];
                return [4 /*yield*/, storage.remove(oldCookieName)];
            case 4:
                _c.sent();
                _c.label = 5;
            case 5:
                _a = tslib_1.__read(cookies.split('.'), 5), deviceId = _a[0], userId = _a[1], optOut = _a[2], sessionId = _a[3], lastEventTime = _a[4];
                return [2 /*return*/, {
                        deviceId: deviceId,
                        userId: (0, exports.decode)(userId),
                        sessionId: (0, exports.parseTime)(sessionId),
                        lastEventTime: (0, exports.parseTime)(lastEventTime),
                        optOut: Boolean(optOut),
                    }];
        }
    });
}); };
exports.parseOldCookies = parseOldCookies;
var parseTime = function (num) {
    var integer = parseInt(num, 32);
    if (isNaN(integer)) {
        return undefined;
    }
    return integer;
};
exports.parseTime = parseTime;
var decode = function (value) {
    if (!atob || !escape || !value) {
        return undefined;
    }
    try {
        return decodeURIComponent(escape(atob(value)));
    }
    catch (_a) {
        return undefined;
    }
};
exports.decode = decode;
//# sourceMappingURL=index.js.map