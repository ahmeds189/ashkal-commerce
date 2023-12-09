"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQuery = exports.AuthSchema = void 0;
var zod_1 = require("zod");
exports.AuthSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "please inter a valid email" }),
    password: zod_1.z
        .string()
        .min(8, { message: "password must be at least 8 characters long." }),
});
exports.ProductQuery = zod_1.z.object({
    category: zod_1.z.string().optional(),
    sort: zod_1.z.enum(["asc", "desc"]).optional(),
    limit: zod_1.z.number().optional(),
});
