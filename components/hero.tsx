import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function Hero() {
  return (
    <div className="container relative py-20 text-center">
      <h1 className="mx-auto mb-6 max-w-lg text-4xl font-bold tracking-tight">
        Your marketplace for heigh quality&nbsp;
        <span className="text-blue-600">digital assets.</span>
      </h1>
      <p className="mx-auto mb-5 max-w-sm text-muted-foreground">
        Welcome to AssetsSquare, every asset on our platform is verified by our
        team to ensure our highest quality standards.
      </p>
      <Link
        href="products"
        className={buttonVariants({ variant: "default", size: "lg" })}
      >
        Browse Trending
      </Link>

      <span className="absolute inset-0 -z-50 h-64 w-64 bg-gradient-to-r from-blue-600 to-violet-700 opacity-10 blur-3xl"></span>
      <span className="absolute right-0 -z-50 h-64 w-64 bg-gradient-to-r from-blue-600 to-violet-700 opacity-10 blur-3xl"></span>
    </div>
  );
}
