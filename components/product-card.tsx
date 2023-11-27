"use client";
import { Product } from "@/server/payload-types";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { PRODUCT_CATEGORIES } from "@/collections/products";
import { formatPrice } from "@/lib/utils";
import ImageSlider from "./image-slider";

type Props = {
  product: Product | null;
  index: number;
};

export default function ProductCard({ product, index }: Props) {
  const [isVisable, setIsVisable] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisable(true);
    }, index * 75);
    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisable) return <ProductSkeleton />;

  const productLabel = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category,
  )?.label;

  const imagesUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  if (product && isVisable)
    return (
      <Link href={`/product/${product.id}`} className="space-y-2">
        <ImageSlider urls={imagesUrls} />
        <p>{product.name}</p>
        <p className="text-xs text-muted-foreground">{productLabel}</p>
        <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
      </Link>
    );
}

function ProductSkeleton() {
  return (
    <div>
      <Skeleton className="h-44 w-44" />
    </div>
  );
}
