/* eslint-disable react/no-unescaped-entities */
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
import { cn, formatPrice } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  const items = 0;
  const fee = 1;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <ShoppingBag />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="text-start">
          <SheetTitle>cart items ({items})</SheetTitle>
          <Separator />
        </SheetHeader>

        {items > 0 ? (
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex text-sm">
              <p className="mr-auto">Shipping</p>
              <p>free</p>
            </div>
            <div className="flex text-sm">
              <p className="mr-auto">Transaction Fee</p>
              <p>{formatPrice(fee)}</p>
            </div>
            <SheetClose asChild>
              <Link
                href="cart"
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
