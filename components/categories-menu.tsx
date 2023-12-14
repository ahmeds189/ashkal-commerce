"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { buttonVariants } from "./ui/button";
import { productsLinks } from "@/lib/constants";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function CategoryItem({
  imgPath,
  title,
  href,
}: {
  imgPath?: string;
  title: string;
  href: string;
}) {
  return (
    <div className="min-w-max">
      <h2 className="font-medium">{title}</h2>
      <Link
        href={href}
        className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-blue-500 hover:underline"
      >
        Shop now
        <ArrowRight size={16} className="ml-1 inline-block" />
      </Link>
    </div>
  );
}

export function CategoriesMenu() {
  return (
    <NavigationMenu className="mr-auto">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
              className:
                "bg-transparent hover:bg-transparent hover:text-blue-500",
            })}
          >
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="p-4">
              {productsLinks.map((link, i) => (
                <CategoryItem title={link.title} key={i} href={link.href} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
