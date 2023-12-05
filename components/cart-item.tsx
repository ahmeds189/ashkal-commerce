import { Product } from "@/server/payload-types";
import Image from "next/image";
import { ImageIcon, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Button } from "./ui/button";

export default function CartItem({ product }: { product: Product }) {
  const { name, price } = product;
  const { image } = product.images[0];

  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="relative h-16 basis-28 overflow-hidden rounded-md">
        {typeof image !== "string" && image.url ? (
          <Image
            src={image.url}
            alt={name}
            fill
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="grid h-16 w-full place-content-center bg-muted">
            <ImageIcon size={32} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col">
        <p className="mb-3 text-sm">{name}</p>
        <div className="flex justify-between">
          {formatPrice(price)}
          <Button size="sm" variant="ghost" className="h-7 p-1">
            <Trash2 size={20} className="text-rose-500" />
          </Button>
        </div>
      </div>
    </div>
  );
}
