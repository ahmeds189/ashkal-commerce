"use client";
import { Product } from "@/server/payload-types";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { PRODUCT_CATEGORIES } from "@/collections/products";
import { formatPrice, truncate } from "@/lib/utils";
import ImageSlider from "./image-slider";

type Props = {
  product: Product | null;
  index: number;
};

export default function ProductCard({ product }: Props) {
  if (!product) return <ProductSkeleton />;

  const productLabel = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category,
  )?.label;

  const imagesUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  if (product)
    return (
      <Link href={`/product/${product.id}`} className="block space-y-2">
        <ImageSlider urls={imagesUrls} />
        <h3>{truncate(product.name, 24)}</h3>
        <p className="text-xs text-muted-foreground">{productLabel}</p>
        <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
      </Link>
    );
}

export function ProductSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="aspect-auto h-40 w-full rounded-xl" />
      <Skeleton className="h-8 w-full rounded-xl" />
      <Skeleton className="h-6 w-20 rounded-xl" />
      <Skeleton className="h-6 w-20 rounded-xl" />
    </div>
  );
}
