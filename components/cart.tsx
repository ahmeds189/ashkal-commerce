"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartItem from "./cart-item";
import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";

export default function Cart() {
  const { items } = useCart();
  const fee = 1;
  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0,
  );

  const [isMouted, setIsMounted] = useState(false);

  useEffectOnce(() => {
    setIsMounted(true);
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <ShoppingBag />
          <span className="absolute right-0 top-0 h-5 w-5 rounded-full bg-blue-500 text-sm text-white">
            {isMouted && items.length}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="-translate-y-3 text-start">
          <SheetTitle>cart items ({items.length})</SheetTitle>
          <Separator />
        </SheetHeader>

        {items.length > 0 ? (
          <div className="flex flex-1 flex-col gap-4">
            <ScrollArea className="max-h-[700px]">
              {items.map(({ product }) => (
                <CartItem key={product.id} product={product} />
              ))}
            </ScrollArea>
            <Separator />
            <div className="flex text-sm">
              <p className="mr-auto">Shipping</p>
              <p>free</p>
            </div>
            <div className="flex text-sm">
              <p className="mr-auto">Transaction Fee</p>
              <p>{formatPrice(fee)}</p>
            </div>
            <div className="flex text-sm">
              <p className="mr-auto">Total</p>
              <p>{formatPrice(cartTotal + fee)}</p>
            </div>
            <SheetClose asChild>
              <Link
                href="/cart"
                className={buttonVariants({ className: "w-full" })}
              >
                Continue to checkout
              </Link>
            </SheetClose>
          </div>
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
            <SheetClose asChild>
              <Link
                href="/products"
                className="block text-sm text-blue-500 underline-offset-4 hover:underline"
              >
                Add items to your carts to checkout
              </Link>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
