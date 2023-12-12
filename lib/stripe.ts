import Stripe from "stripe";
import dotenv from "dotenv";
import path = require("path");

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2023-10-16",
  typescript: true,
});
