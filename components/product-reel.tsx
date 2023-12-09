"use client";
import { ProductQueryTypes } from "@/lib/schema";
import { Product } from "@/server/payload-types";
import { trpc } from "@/server/trpc/client";
import ProductCard from "./product-card";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  subtitle?: string;
  href?: string;
  query: ProductQueryTypes;
};

export default function ProductReel(props: Props) {
  const { query, title, href } = props;
  const { data, isLoading } = trpc.getInfiniteProducts.useInfiniteQuery(
    {
      limit: query.limit ?? 4,
      query,
    },
    { getNextPageParam: (lastPage) => lastPage.nextPage },
  );

  const products = data?.pages.flatMap((page) => page.items);
  let mapedProducts: (Product | null)[] = [];

  if (products && products.length) {
    mapedProducts = products;
  } else if (isLoading) {
    mapedProducts = new Array<null>(query.limit ?? 4).fill(null);
  }

  return (
    <section className="container space-y-10 py-20 text-start">
      <div className="items-center justify-between sm:flex">
        <h1 className="text-2xl font-bold">{title}</h1>
        {href && (
          <Link
            href={href}
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            View all products
            <ArrowRight size={16} className="ml-1 inline-block" />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mapedProducts.map((product, i) => (
          <ProductCard product={product} index={i} key={i} />
        ))}
      </div>
    </section>
  );
}
