import dotenv from "dotenv";
import path from "path";
import { type InitOptions } from "payload/config";
import payload, { type Payload } from "payload";
import nodemailer from "nodemailer";

<<<<<<< HEAD
dotenv.config({ path: path.resolve(__dirname, "../.env") });
=======
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});
>>>>>>> parent of d3b33f3 (test deployment v1)

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  secure: true,
  port: 465,
  auth: {
    user: "resend",
    pass: "re_Z9HW9s1M_3wurT1YCBGjwsx4jXfdx3ecv",
  },
});

let cached = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

interface Args {
  initOptions?: Partial<InitOptions>;
}

export const getPayloadClient = async ({
  initOptions,
}: Args = {}): Promise<Payload> => {
  // if (!process.env.PAYLOAD_SECRET) {
  //   throw new Error("PAYLOAD_SECRET is missing");
  // }

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    cached.promise = payload.init({
      email: {
        transport: transporter,
        fromAddress: "onboarding@resend.dev",
        fromName: "Ashkal - اشكال",
      },
      secret: "thisissecuresecret",
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (e: unknown) {
    cached.promise = null;
    throw e;
  }

  return cached.client;
};
