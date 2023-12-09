import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import dotenv from "dotenv";
import { buildConfig } from "payload/config";
import { Users } from "./server/collections/users";
import { Products } from "./server/collections/products";
import { Media } from "./server/collections/media";
import { Files } from "./server/collections/files";
import { Orders } from "./server/collections/orders";

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  collections: [Users, Products, Media, Files, Orders],
  routes: {
    admin: "/sell",
  },
  admin: {
    bundler: webpackBundler(),
    meta: { titleSuffix: "- Ashkal" },
    user: "users",
  },
  rateLimit: { max: 2000 },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "./payload-types.ts"),
  },
});
