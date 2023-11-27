"use client";
import { ProductQueryTypes } from "@/lib/schema";
import { trpc } from "@/trpc/client";

type Props = {
  title: string;
  subtitle?: string;
  href?: string;
  query: ProductQueryTypes;
};

export default function ProductReel(props: Props) {
  const { query, title } = props;
  const { data } = trpc.getInfiniteProducts.useInfiniteQuery(
    {
      limit: query.limit ?? 4,
      query,
    },
    { getNextPageParam: (lastPage) => lastPage.nextPage },
  );
  console.log(data);

  return (
    <section>
      <header>
        <h1>{title}</h1>
      </header>
    </section>
  );
}
