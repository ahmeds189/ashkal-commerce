"use client";
import { Product } from "@/payload-types";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AddToCart({ product }: { product: Product }) {
  const { addItem, items } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // todo disable add  to card if item alreay exist
  const isFound = items.some(({ product: item }) => item.id === product.id);

  return (
    <Button
      size="lg"
      className="w-full"
      disabled={isClient && isFound}
      onClick={() => {
        addItem(product);
        toast.success("Item added successfully!", { duration: 1000 });
      }}
    >
      {isClient && isFound ? "✅ Added" : "Add to cart"}
    </Button>
  );
}
