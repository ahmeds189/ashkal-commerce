"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCart = void 0;
var zustand_1 = require("zustand");
var middleware_1 = require("zustand/middleware");
exports.useCart = (0, zustand_1.create)()((0, middleware_1.persist)(function (set) { return ({
    items: [],
    addItem: function (product) {
        return set(function (state) {
            return { items: __spreadArray(__spreadArray([], state.items, true), [{ product: product }], false) };
        });
    },
    removeItem: function (id) {
        return set(function (state) { return ({
            items: state.items.filter(function (item) { return item.product.id !== id; }),
        }); });
    },
    clearCart: function () { return set({ items: [] }); },
}); }, {
    name: "cart-storage",
    storage: (0, middleware_1.createJSONStorage)(function () { return localStorage; }),
}));
