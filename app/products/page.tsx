import ProductReel from "@/components/product-reel";

// TODO: dinamic peoducts pased on nav link

export default function ProductsPage() {
  <div className="container">
    <ProductReel
      title="
    Browse high quality products"
      query={{ category: "", limit: 40, sort: "desc" }}
    />
  </div>;
}
