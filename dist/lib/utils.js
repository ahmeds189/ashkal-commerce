"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalProductsPrice = exports.getUserSessionInfo = exports.formatPrice = exports.truncate = exports.cn = void 0;
var clsx_1 = require("clsx");
var tailwind_merge_1 = require("tailwind-merge");
function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
exports.cn = cn;
function truncate(str, n) {
    return str.length > n ? str.slice(0, n - 1) + "..." : str;
}
exports.truncate = truncate;
function formatPrice(price, options) {
    if (options === void 0) { options = {}; }
    var priceToNum = typeof price === "string" ? parseFloat(price) : price;
    var _a = options.currency, currency = _a === void 0 ? "USD" : _a, _b = options.notation, notation = _b === void 0 ? "compact" : _b;
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        notation: notation,
        maximumFractionDigits: 2,
    }).format(priceToNum);
}
exports.formatPrice = formatPrice;
var getUserSessionInfo = function (cookies) { return __awaiter(void 0, void 0, void 0, function () {
    var token, userRes, user;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                token = (_a = cookies.get("payload-token")) === null || _a === void 0 ? void 0 : _a.value;
                return [4 /*yield*/, fetch("".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/api/users/me"), { headers: { Authorization: "JWT ".concat(token) } })];
            case 1:
                userRes = _b.sent();
                return [4 /*yield*/, userRes.json()];
            case 2:
                user = (_b.sent()).user;
                return [2 /*return*/, { user: user }];
        }
    });
}); };
exports.getUserSessionInfo = getUserSessionInfo;
var getTotalProductsPrice = function (products, fee) {
    return formatPrice(products.reduce(function (acc, curr) { return acc + curr.price; }, fee));
};
exports.getTotalProductsPrice = getTotalProductsPrice;
