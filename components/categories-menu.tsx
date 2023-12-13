"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import * as React from "react";
import { buttonVariants } from "./ui/button";

const components = [
  {
    title: "Alert Dialog",
  },
  {
    title: "Hover Card",
  },
  {
    title: "Progress",
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
              className: "bg-transparent",
            })}
          >
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex min-w-max flex-col">
              {components.map((component) => (
                <h1 key={component.title}>{component.title}</h1>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
