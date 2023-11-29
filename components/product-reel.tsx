"use client";
import { ProductQueryTypes } from "@/lib/schema";
import { Product } from "@/server/payload-types";
import { trpc } from "@/trpc/client";
import ProductCard from "./product-card";

type Props = {
  title: string;
  subtitle?: string;
  href?: string;
  query: ProductQueryTypes;
};

export default function ProductReel(props: Props) {
  const { query, title } = props;
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
    <section className="container space-y-6 py-20 text-start">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-x-4 gap-y-8 md:gap-x-6">
        {mapedProducts.map((product, i) => (
          <ProductCard product={product} index={i} key={i} />
        ))}
      </div>
    </section>
  );
}
