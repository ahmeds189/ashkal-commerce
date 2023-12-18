import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function Hero() {
  return (
    <div className="container relative block h-full flex-1 pt-24 text-center">
      <h1 className="mx-auto mb-6 max-w-lg text-3xl font-bold tracking-tight sm:text-4xl lg:max-w-2xl lg:text-5xl">
        Your marketplace for heigh quality&nbsp;
        <span className="text-blue-600">digital assets.</span>
      </h1>
      <p className="mx-auto mb-8 max-w-md text-sm text-muted-foreground">
        Unleash your creativity, explore the language of shapes, and let Ashkal
        be the canvas for your digital expressions. Welcome to a world where
        design shapes inspiration.
      </p>
      <Link
        href="products"
        className={buttonVariants({ variant: "default", size: "lg" })}
      >
        Browse Trending
      </Link>
      <div className="absolute left-1/2 top-1/2 -z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col md:flex-row">
        <div className="h-64 w-64 bg-gradient-to-r from-blue-600 to-violet-700 opacity-20 blur-3xl"></div>
        <div className="h-64 w-64 bg-gradient-to-r from-blue-600 to-violet-700 opacity-20 blur-3xl"></div>
      </div>
    </div>
  );
}
