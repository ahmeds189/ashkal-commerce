"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bundler_webpack_1 = require("@payloadcms/bundler-webpack");
var db_mongodb_1 = require("@payloadcms/db-mongodb");
var richtext_slate_1 = require("@payloadcms/richtext-slate");
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var config_1 = require("payload/config");
var users_1 = require("./server/collections/users");
var products_1 = require("./server/collections/products");
var media_1 = require("./server/collections/media");
var files_1 = require("./server/collections/files");
var orders_1 = require("./server/collections/orders");
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../.env"),
});
exports.default = (0, config_1.buildConfig)({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
    collections: [users_1.Users, products_1.Products, media_1.Media, files_1.Files, orders_1.Orders],
    routes: {
        admin: "/sell",
    },
    admin: {
        bundler: (0, bundler_webpack_1.webpackBundler)(),
        meta: { titleSuffix: "- Ashkal" },
        user: "users",
    },
    rateLimit: { max: 2000 },
    editor: (0, richtext_slate_1.slateEditor)({}),
    db: (0, db_mongodb_1.mongooseAdapter)({
        url: "mongodb+srv://ahmed:ahmed@cluster0.niwdglc.mongodb.net/main?retryWrites=true&w=majority",
    }),
    typescript: {
        outputFile: path_1.default.resolve(__dirname, "./payload-types.ts"),
    },
});
