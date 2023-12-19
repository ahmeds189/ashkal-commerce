"use client";
import { Product } from "@/server/payload-types";
import Image from "next/image";
import { FileDown, ImageIcon, Loader, Trash2 } from "lucide-react";
import { formatPrice, getProcuctDetails } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

type Props = {
  product: Product;
  downloadUrl?: string;
  allowdToDownload: boolean;
};

export default function CartItem({
  product,
  downloadUrl,
  allowdToDownload,
}: Props) {
  const { name, price, id } = product;
  const { image } = product.images[0];
  const { removeItem } = useCart();
  const { label } = getProcuctDetails(product);

  return (
    <div>
      <div className="flex gap-3">
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
          <p className="mb-3 truncate font-medium">{name}</p>
          <Badge className="mb-3 w-fit cursor-default" variant="secondary">
            {label}
          </Badge>
          <div className="flex">
            <p className="me-auto font-semibold">{formatPrice(price)}</p>
            {!downloadUrl ? (
              <button onClick={() => removeItem(id)}>
                <Trash2 size={18} className="text-muted-foreground" />
              </button>
            ) : !allowdToDownload ? (
              <Loader
                size={18}
                className="animate-spin text-muted-foreground"
              />
            ) : (
              <a
                href={downloadUrl}
                download={product.name}
                className="inline-block text-sm text-blue-500"
              >
                <FileDown />
              </a>
            )}
          </div>
        </div>
      </div>
      <Separator className="mx-auto my-3" />
    </div>
  );
}
