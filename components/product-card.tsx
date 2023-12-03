"use client";
import { Product } from "@/server/payload-types";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { formatPrice, truncate } from "@/lib/utils";
import ImageSlider from "./image-slider";

type Props = {
  product: Product | null;
  index: number;
};

export default function ProductCard({ product }: Props) {
  if (!product) return <ProductSkeleton />;

  const imagesUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  if (product)
    return (
      <Link href={`/product/${product.id}`} className="block space-y-2">
        <ImageSlider urls={imagesUrls} className="aspect-square" />
        <h3>{truncate(product.name, 24)}</h3>
        <p className="font-semibold">{formatPrice(product.price)}</p>
      </Link>
    );
}

export function ProductSkeleton() {
  return (
    <div className="w-full space-y-2">
      <Skeleton className="aspect-square h-auto w-full rounded-xl" />
      <Skeleton className="h-7 w-full rounded-lg" />
      <Skeleton className="h-6 w-20 rounded-lg" />
    </div>
  );
}
