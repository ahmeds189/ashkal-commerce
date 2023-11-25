import { User } from "../server/payload-types";
import { type ClassValue, clsx } from "clsx";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "EGP";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {},
) {
  const priceToNum = typeof price === "string" ? parseFloat(price) : price;
  const { currency = "USD", notation = "compact" } = options;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(priceToNum);
}

export const getUserSessionInfo = async (
  cookies: NextRequest["cookies"] | ReadonlyRequestCookies,
) => {
  const token = cookies.get("payload-token")?.value;
  const userRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
    { headers: { Authorization: `JWT ${token}` } },
  );

  const { user } = (await userRes.json()) as { user: User | null };
  return { user };
};
