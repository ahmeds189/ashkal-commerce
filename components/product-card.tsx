"use client";
import { Product } from "@/server/payload-types";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { formatPrice, getProcuctDetails } from "@/lib/utils";
import ImageSlider from "./image-slider";
import { Badge } from "./ui/badge";

type Props = {
  product: Product | null;
  index: number;
};

export default function ProductCard({ product }: Props) {
  if (!product) return <ProductSkeleton />;

  const { label, imagesUrls } = getProcuctDetails(product);

  if (product)
    return (
      <Link href={`/product/${product.id}`} className="max-w-[16rem] space-y-2">
        <ImageSlider productName={product.name} urls={imagesUrls} />
        <h3 className="truncate">{product.name}</h3>
        <Badge className="cursor-default" variant="secondary">
          {label}
        </Badge>
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
      <Skeleton className="h-6 w-20 rounded-lg" />
    </div>
  );
}
