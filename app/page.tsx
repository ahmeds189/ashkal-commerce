import ProductReel from "@/components/product-reel";
import Hero from "@/components/hero";
import Overview from "@/components/overview";

export default function HomePage() {
  return (
    <div className="flex h-full flex-col gap-20">
      <Hero />
      <ProductReel
        href="/products"
        title="Featured products"
        query={{ limit: 4 }}
      />
      <Overview />
    </div>
  );
}
