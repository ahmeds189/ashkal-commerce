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
import { formatPrice } from "@/lib/utils";
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
          <div className="flex flex-1 flex-col items-center justify-center">
            <Image
              src="/empty.png"
              alt="empty cart illsturation"
              width={200}
              height={0}
            />
            <p className="mt-8 text-center text-lg font-semibold">
              Your cart is empty
            </p>
            <SheetClose asChild>
              <Link
                href="products"
                className={buttonVariants({
                  variant: "link",
                  className: "w-full text-blue-500",
                })}
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
