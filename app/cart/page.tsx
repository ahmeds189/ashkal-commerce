"use client";
import CartItem from "@/components/cart-item";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { trpc } from "@/server/trpc/client";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items } = useCart();
  const fee = 1;
  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0,
  );

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();

  const { mutate: createCheckoutSession, isLoading } =
    trpc.payment.createSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) router.push(url);
      },
    });

  const productIds = items.map(({ product }) => product.id);

  return (
    <div className="container mt-20 h-full">
      <h1 className="mb-10 text-2xl font-bold">Check out</h1>
      <div className="flex flex-col gap-8 md:flex-row">
        {isClient && items.length > 0 ? (
          <>
            <section className="basis-1/2">
              <p className="mb-6 text-lg font-semibold">Order Items</p>
              <div className="space-y-4">
                {items.map(({ product }) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </div>
            </section>
            <section className="basis-1/2 space-y-6">
              <p className="text-lg font-semibold">Order Summary</p>
              <div className="text-muted-foreground">
                <div className="flex text-sm">
                  <p className="mr-auto">Shipping</p>
                  <p>free</p>
                </div>
                <Separator className="mx-auto my-3" />
                <div className="flex text-sm">
                  <p className="mr-auto">Transaction Fee</p>
                  <p>{formatPrice(fee)}</p>
                </div>
                <Separator className="mx-auto my-3" />
                <div className="flex font-semibold text-foreground">
                  <p className="mr-auto">Total</p>
                  <p>{formatPrice(cartTotal + fee)}</p>
                </div>
              </div>
              <Button
                onClick={() => createCheckoutSession({ productIds })}
                disabled={isLoading || !items.length}
                className="w-full"
              >
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Confirm order"
                )}
              </Button>
            </section>
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
