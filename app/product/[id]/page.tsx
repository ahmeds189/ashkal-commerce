import { PRODUCT_CATEGORIES } from "@/server/collections/products";
import AddToCart from "@/components/add-to-cart";
import ImageSlider from "@/components/image-slider";
import { formatPrice } from "@/lib/utils";
import { getPayloadClient } from "@/server/get-payload";
import { ChevronRight, Shield } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  const productLabel = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category,
  )?.label;

  const imagesUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  return (
    <div className="container mt-20">
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
      <div className="justify-between md:flex">
        <div>
          <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
          <p className="mb-3">{product.description}</p>
          <p className="text-sm text-muted-foreground">{productLabel}</p>
          <p className="font-medium">{formatPrice(product.price)}</p>
        </div>
        <div className="mt-7 w-full space-y-4 sm:max-w-sm md:mt-0">
          <ImageSlider urls={imagesUrls} />
          <AddToCart />
          <p className="text-center text-sm text-muted-foreground">
            <Shield size={18} className="inline-block" /> 30 days money back
            guarantee
          </p>
        </div>
      </div>
    </div>
  );
}
