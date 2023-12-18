"use client";
import { Product } from "@/server/payload-types";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { formatPrice, truncate } from "@/lib/utils";
import ImageSlider from "./image-slider";
import Image from "next/image";

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
      <Link href={`/product/${product.id}`} className="space-y-2">
        <Image
          src="/icons.webp"
          alt="Product 1"
          className="w-full rounded-xl object-cover shadow-xl dark:shadow-none"
          width={400}
          height={300}
        />
        <h3>{truncate(product.name, 24)}</h3>
        <h4 className="font-semibold">{formatPrice(product.price)}</h4>
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
