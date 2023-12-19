import AddToCart from "@/components/add-to-cart";
import ImageSlider from "@/components/image-slider";
import { formatPrice, getProcuctDetails } from "@/lib/utils";
import { getPayloadClient } from "@/server/get-payload";
import { ChevronRight, Link2, Shield } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductReel from "@/components/product-reel";
import { Badge } from "@/components/ui/badge";

type Props = {
  params: { id: string };
};

const BREADCRUMBS = [
  {
    href: "/",
    name: "Home",
  },
  {
    href: "/products",
    name: "Products",
  },
];

export default async function ProductPage({ params }: Props) {
  const productID = params.id;
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: { equals: productID },
      approvedForSale: { equals: "approved" },
    },
  });

  const [product] = docs;
  if (!product) return notFound();

  const { imagesUrls, label } = getProcuctDetails(product);

  return (
    <div className="container my-20">
      <ol className="mb-8 flex gap-1 text-sm font-medium text-muted-foreground">
        {BREADCRUMBS.map((breadcrumb, index) => (
          <li key={breadcrumb.href}>
            <Link
              href={breadcrumb.href}
              className="flex items-center gap-1 transition hover:text-foreground hover:underline"
            >
              {breadcrumb.name}
              {index !== BREADCRUMBS.length - 1 && <ChevronRight size={15} />}
            </Link>
          </li>
        ))}
      </ol>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="mx-auto w-full max-w-md space-y-4 md:basis-1/2 ">
          <ImageSlider productName={product.name} urls={imagesUrls} />
          <AddToCart product={product} />
          <p className="text-center text-sm text-muted-foreground">
            <Shield size={18} className="inline-block" /> 30 days money back
            guarantee
          </p>
        </div>

        <div className="md:basis-1/2">
          <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
          <p className="mb-3 text-sm text-muted-foreground">
            {product.description}
          </p>
          <Badge className="mb-3 cursor-default bg-emerald-200 text-emerald-600 hover:bg-emerald-200">
            {label}
          </Badge>
          <p className="mb-5 text-lg font-semibold">
            {formatPrice(product.price)}
          </p>
          <div className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              ✅ eligible for instant delivery
            </p>
            {product.credit && (
              <a
                href={product.credit}
                target="_blank"
                className="text-sm text-blue-500 underline-offset-4 hover:underline"
              >
                credit
                <Link2 size={16} className="ml-1 inline-block" />
              </a>
            )}
          </div>
        </div>
      </div>
      <ProductReel
        href="/products"
        query={{ category: product.category, limit: 4 }}
        title="Similar Products"
      />
    </div>
  );
}
