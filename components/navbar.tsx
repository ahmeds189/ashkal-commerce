import { Shapes } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Cart from "./cart";
import { getUserSessionInfo } from "@/lib/utils";
import { cookies } from "next/headers";
import UserProfile from "./user-profile";
import MobileNav from "./mobile-nav";
import { CategoriesMenu } from "./categories-menu";
import { ThemeToggle } from "./theme-toggle";

export default async function Navbar() {
  const nextCookies = cookies();
  const { user } = await getUserSessionInfo(nextCookies);

  return (
    <nav className="sticky inset-0 z-50 py-3.5 shadow-sm backdrop-blur-md dark:border-b">
      <div className="container flex items-center gap-1 sm:gap-2 md:gap-3">
        <MobileNav isAuth={user} />

        <Link href="/" className="xs:mr-0 mr-auto">
          <Shapes className="block" size={30} />
        </Link>

        <CategoriesMenu />

        {user ? (
          <UserProfile user={user} />
        ) : (
          <ul className="hidden items-center gap-3 text-sm font-medium md:flex">
            <li>
              <Link href="/sign-in" className=" transition hover:text-blue-500">
                Sign in
              </Link>
            </li>
            <li>
              <Link href="/sign-up" className=" transition hover:text-blue-500">
                Create account
              </Link>
            </li>
          </ul>
        )}

        <ThemeToggle />
        <Cart />
      </div>
    </nav>
  );
}
