import ProductReel from "@/components/product-reel";
import Hero from "@/components/hero";
import Overview from "@/components/overview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductReel
        href="/"
        title="Hot Deals"
        query={{ sort: "desc", limit: 4 }}
      />
      <Overview />
    </>
  );
}
