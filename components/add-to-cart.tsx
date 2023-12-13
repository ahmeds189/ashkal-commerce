"use client";
import { Product } from "@/server/payload-types";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { toast } from "sonner";
import { useEffectOnce } from "usehooks-ts";

export default function AddToCart({ product }: { product: Product }) {
  const { addItem, items } = useCart();
  const [isMouted, setIsMounted] = useState(false);

  useEffectOnce(() => {
    setIsMounted(true);
  });

  const isFound = items.some(({ product: item }) => item.id === product.id);

  return (
    <Button
      size="lg"
      className="w-full"
      disabled={isMouted && isFound}
      onClick={() => {
        addItem(product);
        toast.success("Item added successfully!", { duration: 1000 });
      }}
    >
      {isMouted && isFound ? "✅ Added" : "Add to cart"}
    </Button>
  );
}
