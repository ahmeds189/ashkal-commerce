"use client";
import { Product } from "@/server/payload-types";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";

export default function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <Button size="lg" className="w-full" onClick={() => addItem(product)}>
      Add to cart
    </Button>
  );
}
