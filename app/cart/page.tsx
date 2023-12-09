"use client";
import CartItem from "@/components/cart-item";
import { buttonVariants } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items } = useCart();
  const fee = 1;
  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0,
  );

  return (
    <div className="container mt-20 h-full">
      <h1 className="mb-10 text-2xl font-bold">Check out</h1>
      <div className="flex flex-col gap-5 md:flex-row">
        {items.length > 0 ? (
          <>
            <div className="basis-1/2 rounded-lg border-2 border-dashed p-3">
              {items.map(({ product }) => (
                <CartItem key={product.id} product={product} />
              ))}
            </div>
            <div className="basis-1/2 space-y-5 rounded-lg border-2 border-dashed p-3">
              <p className="text-lg font-semibold">Order Summary</p>
              <div className="space-y-2 divide-y-2 text-muted-foreground">
                <div className="flex text-sm">
                  <p className="mr-auto">Shipping</p>
                  <p>free</p>
                </div>
                <div className="flex text-sm">
                  <p className="mr-auto">Transaction Fee</p>
                  <p>{formatPrice(fee)}</p>
                </div>
                <div className="flex font-semibold text-foreground">
                  <p className="mr-auto">Total</p>
                  <p>{formatPrice(cartTotal + fee)}</p>
                </div>
              </div>
              <Link
                href="/cart"
                className={buttonVariants({ className: "w-full" })}
              >
                Continue to checkout
              </Link>
            </div>
          </>
        ) : (
          <div className="flex-1 space-y-3 rounded-lg border-2 border-dashed py-20 text-center">
            <Image
              src="/empty.png"
              alt="empty cart illsturation"
              width={200}
              height={200}
              loading="lazy"
              className="inline-block aspect-square object-contain"
            />
            <p className="text-lg font-semibold">Your cart is empty</p>
            <Link
              href="/products"
              className="block text-sm text-blue-500 underline-offset-4 hover:underline"
            >
              Add items to your carts to checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
