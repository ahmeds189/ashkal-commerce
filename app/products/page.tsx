import ProductReel from "@/components/product-reel";

// TODO: dynamic products based on nav link
type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const parse = (param: string | string[] | undefined) => {
  return typeof param === "string" ? param : undefined;
};

export default function ProductsPage({ searchParams }: Props) {
  const category = parse(searchParams.category);
  const sort = parse(searchParams.sort);

  return (
    <ProductReel
      title={category || "Browse high quality products"}
      query={{
        category,
        limit: 40,
        sort: sort === "desc" || sort === "asc" ? sort : undefined,
      }}
    />
  );
}
