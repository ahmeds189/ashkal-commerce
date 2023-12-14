"use client";

import { useMobileNav } from "@/hooks/use-mobile-nav";
import { Menu, Shapes } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useEffectOnce, useMediaQuery } from "usehooks-ts";
import { Sheet, SheetContent } from "./ui/sheet";
import { Button } from "./ui/button";
import { User } from "@/server/payload-types";
import { Separator } from "./ui/separator";
import { navLinks, productsLinks } from "@/lib/constants";

export default function MobileNav({ isAuth }: { isAuth: User | null }) {
  const [isMouted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const matches = useMediaQuery("(min-width: 768px)");

  const isOpen = useMobileNav((state) => state.isOpen);
  const onClose = useMobileNav((state) => state.onClose);
  const onOpen = useMobileNav((state) => state.onOpen);

  useEffectOnce(() => {
    setIsMounted(true);
  });

  useEffect(() => {
    onClose();
  }, [pathname, onClose, matches]);

  if (!isMouted) return null;

  return (
    <>
      <Button variant="ghost" size="sm" onClick={onOpen} className="md:hidden">
        <Menu />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="font-semibold">
          <Link href="/" className="inline-block -translate-y-4">
            <Shapes size={38} />
          </Link>
          {isAuth ? null : (
            <>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link
                    href="/sign-in"
                    className="transition hover:text-primary"
                  >
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sign-up"
                    className="transition hover:text-primary"
                  >
                    Create account
                  </Link>
                </li>
              </ul>
              <Separator className="my-3" />
            </>
          )}
          <ul className="space-y-3 text-muted-foreground">
            <p className="text-primary">Categories</p>
            {productsLinks.map((link, i) => (
              <li key={i} className="ml-4">
                <Link
                  href={link.href}
                  className="transition hover:text-primary"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </>
  );
}
