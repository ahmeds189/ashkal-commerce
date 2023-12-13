import { Shapes } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Cart from "./cart";
import { getUserSessionInfo } from "@/lib/utils";
import { cookies } from "next/headers";
import UserProfile from "./user-profile";
import MobileNav from "./mobile-nav";
import { NavigationMenuDemo } from "./categories-menu";

export default async function Navbar() {
  const nextCookies = cookies();
  const { user } = await getUserSessionInfo(nextCookies);

  return (
    <nav className="sticky inset-0 z-50 py-3.5 shadow-sm backdrop-blur-md dark:border-b">
      <div className="container flex items-center gap-2">
        <MobileNav isAuth={user} />
        <Link href="/" className="mr-auto">
          <Shapes className="block" size={38} />
        </Link>

        <Link href="/products" className="text-sm font-medium">
          Products
        </Link>

        <NavigationMenuDemo />

        <ul className="flex items-center gap-2">
          {user ? (
            <UserProfile user={user} />
          ) : (
            <>
              <li className="hidden md:block">
                <Link
                  href="/sign-in"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Sign in
                </Link>
              </li>
              <li className="hidden md:block">
                <Link
                  href="/sign-up"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Create account
                </Link>
              </li>
            </>
          )}
        </ul>

        <Cart />
      </div>
    </nav>
  );
}
