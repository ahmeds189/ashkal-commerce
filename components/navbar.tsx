import { Shapes, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import Cart from "./cart";

export default function Navbar() {
  const user = null;
  return (
    <nav className="sticky inset-0 z-50 py-3.5 shadow-sm backdrop-blur-md">
      <div className="container flex items-center">
        <Link href="/" className="mr-auto">
          <Shapes className="block" size={38} />
        </Link>
        <ul className="flex items-center gap-2">
          {!user ? (
            <>
              <li>
                <Link
                  href="/"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Create account
                </Link>
              </li>
            </>
          ) : null}
        </ul>

        <Cart />
      </div>
    </nav>
  );
}
