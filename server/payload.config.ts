import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import dotenv from "dotenv";
import { buildConfig } from "payload/config";
import { Users } from "./collections/users";
import { Products } from "./collections/products";
import { Media } from "./collections/media";
import { Files } from "./collections/files";
import { Orders } from "./collections/orders";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
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
    url: "mongodb+srv://ahmed:ahmed@cluster0.niwdglc.mongodb.net/main?retryWrites=true&w=majority",
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "./payload-types.ts"),
  },
});
