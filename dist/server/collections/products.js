"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.Products = exports.PRODUCT_CATEGORIES = void 0;
var stripe_1 = require("../../lib/stripe");
exports.PRODUCT_CATEGORIES = [
    {
        label: "UI Kits",
        value: "ui_kits",
        featured: [
            {
                name: "Editor picks",
                href: "/products?category=ui_kits",
                imageSrc: "/nav/ui-kits/mixed.jpg",
            },
            {
                name: "New Arrivals",
                href: "/products?category=ui_kits&sort=desc",
                imageSrc: "/nav/ui-kits/blue.jpg",
            },
            {
                name: "Bestsellers",
                href: "/products?category=ui_kits",
                imageSrc: "/nav/ui-kits/purple.jpg",
            },
        ],
    },
    {
        label: "Icons",
        value: "icons",
        featured: [
            {
                name: "Favorite Icon Picks",
                href: "/products?category=icons",
                imageSrc: "/nav/icons/picks.jpg",
            },
            {
                name: "New Arrivals",
                href: "/products?category=icons&sort=desc",
                imageSrc: "/nav/icons/new.jpg",
            },
            {
                name: "Bestselling Icons",
                href: "/products?category=icons",
                imageSrc: "/nav/icons/bestsellers.jpg",
            },
        ],
    },
    {
        label: "Illustration",
        value: "illustration",
        featured: [
            {
                name: "Favorite Illustration Picks",
                href: "/products?category=illustrations",
                imageSrc: "/nav/icons/picks.jpg",
            },
            {
                name: "New Arrivals",
                href: "/products?category=illustrations&sort=desc",
                imageSrc: "/nav/icons/new.jpg",
            },
            {
                name: "Bestselling Illustration",
                href: "/products?category=illustrations",
                imageSrc: "/nav/icons/bestsellers.jpg",
            },
        ],
    },
    {
        label: "Wallpapers",
        value: "wallpapers",
        featured: [
            {
                name: "Favorite Wallpapers",
                href: "/products?category=wallpapers",
                imageSrc: "/nav/icons/picks.jpg",
            },
            {
                name: "New Arrivals",
                href: "/products?category=wallpapers&sort=desc",
                imageSrc: "/nav/icons/new.jpg",
            },
            {
                name: "Bestselling Wallpapers",
                href: "/products?category=wallpapers",
                imageSrc: "/nav/icons/bestsellers.jpg",
            },
        ],
    },
];
var addUser = function (_a) {
    var user = _a.req.user, data = _a.data;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, __assign(__assign({}, data), { user: user.id })];
        });
    });
};
exports.Products = {
    slug: "products",
    admin: {
        useAsTitle: "name",
    },
    access: {},
    hooks: {
        beforeChange: [
            addUser,
            function (args) { return __awaiter(void 0, void 0, void 0, function () {
                var data, createProduct, updated, data, updateProduct, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(args.operation === "create")) return [3 /*break*/, 2];
                            data = args.data;
                            return [4 /*yield*/, stripe_1.stripe.products.create({
                                    name: data.name,
                                    default_price_data: {
                                        currency: "USD",
                                        unit_amount: Math.round(data.price * 100),
                                    },
                                    description: data.description,
                                })];
                        case 1:
                            createProduct = _a.sent();
                            updated = __assign(__assign({}, data), { stripeId: createProduct.id, priceId: createProduct.default_price });
                            return [2 /*return*/, updated];
                        case 2:
                            if (!(args.operation === "update")) return [3 /*break*/, 4];
                            data = args.data;
                            return [4 /*yield*/, stripe_1.stripe.products.update(data.stripeId, {
                                    name: data.name,
                                    default_price: data.priceId,
                                    description: data.description,
                                })];
                        case 3:
                            updateProduct = _a.sent();
                            updated = __assign(__assign({}, data), { stripeId: updateProduct.id, priceId: updateProduct.default_price });
                            return [2 /*return*/, updated];
                        case 4: return [2 /*return*/];
                    }
                });
            }); },
        ],
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                condition: function () { return false; },
            },
        },
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
        },
        {
            name: "description",
            label: "Description",
            type: "textarea",
            required: true,
        },
        {
            name: "credit",
            label: "Credit",
            type: "textarea",
            required: false,
        },
        {
            name: "price",
            label: "Price",
            type: "number",
            min: 0,
            max: 1000,
            required: true,
        },
        {
            name: "category",
            label: "Category",
            type: "select",
            options: exports.PRODUCT_CATEGORIES.map(function (_a) {
                var label = _a.label, value = _a.value;
                return ({ label: label, value: value });
            }),
            required: true,
        },
        {
            name: "product_files",
            label: "Product file(s)",
            type: "relationship",
            required: true,
            relationTo: "product_files",
            hasMany: false,
        },
        {
            name: "approvedForSale",
            label: "Product Status",
            type: "select",
            defaultValue: "pending",
            access: {
                create: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
                read: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
                update: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
            },
            options: [
                {
                    label: "Pending",
                    value: "pending",
                },
                {
                    label: "Approved",
                    value: "approved",
                },
                {
                    label: "Rejected",
                    value: "rejected",
                },
            ],
        },
        {
            name: "priceId",
            type: "text",
            access: {
                create: function () { return false; },
                read: function () { return false; },
                update: function () { return false; },
            },
            admin: {
                hidden: true,
            },
        },
        {
            name: "stripeId",
            type: "text",
            access: {
                create: function () { return false; },
                read: function () { return false; },
                update: function () { return false; },
            },
            admin: {
                hidden: true,
            },
        },
        {
            name: "images",
            label: "Product images",
            type: "array",
            minRows: 1,
            maxRows: 4,
            required: true,
            labels: {
                singular: "image",
                plural: "images",
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
            ],
        },
    ],
};
