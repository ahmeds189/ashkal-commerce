"use client";
import { Product } from "@/payload-types";
import Image from "next/image";
import { ImageIcon, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

export default function CartItem({ product }: { product: Product }) {
  const { name, price, id } = product;
  const { image } = product.images[0];
  const { removeItem } = useCart();
  return (
    <div className="mb-4 flex gap-3">
      <div className="relative h-[100px] basis-[100px] overflow-hidden rounded-md">
        {typeof image !== "string" && image.url ? (
          <Image
            src={image.url}
            alt={name}
            fill
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="grid h-16 w-full place-content-center bg-muted">
            <ImageIcon size={32} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col">
        <p className="mb-3 font-medium">{name}</p>
        <div className="flex">
          <p className="me-auto font-semibold">{formatPrice(price)}</p>
          <button onClick={() => removeItem(id)}>
            <Trash2 size={18} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
