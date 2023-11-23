import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { perks } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="flex flex-col text-center">
      <div className="container mb-4 flex-1 py-16">
        <h1 className="mx-auto mb-6 max-w-lg text-4xl font-bold tracking-tight">
          Your marketplace for heigh quality&nbsp;
          <span className="text-blue-600">digital assets.</span>
        </h1>
        <p className="mx-auto mb-5 max-w-sm text-muted-foreground">
          welcome to Assets Square, Every asset on our platform is verified by
          our team to ensure our highest quality standards.
        </p>
        <Link
          href="products"
          className={buttonVariants({ variant: "default", size: "lg" })}
        >
          Browse Trending
        </Link>
      </div>
      <section className="border-t bg-muted/20 py-16">
        <ul className="container flex flex-col flex-wrap gap-8 sm:flex-row">
          {perks.map((perk) => (
            <li key={perk.name} className="flex-1">
              <span className="mx-auto mb-5 block w-fit rounded-full border-2 border-blue-600/50 bg-accent p-3">
                <perk.icon />
              </span>
              <h3 className="mb-3 font-semibold">{perk.name}</h3>
              <p className="text-sm text-muted-foreground [text-wrap:balance]">
                {perk.details}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
