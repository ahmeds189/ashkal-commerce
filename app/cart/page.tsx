"use client";
import CartItem from "@/components/cart-item";
import { useCart } from "@/hooks/useCart";
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
    <div className="container mt-20 flex flex-col gap-5 md:flex-row">
      {items.length > 0 ? (
        <>
          <div className="basis-1/2">
            {items.map(({ product }) => (
              <CartItem key={product.id} product={product} />
            ))}
          </div>
          <div className="basis-1/2">
            {items.map(({ product }) => (
              <CartItem key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex-1 space-y-3 py-20 text-center">
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
  );
}
