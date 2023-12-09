"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Shapes } from "lucide-react";
import Link from "next/link";
import SigninForm from "../_components/sign-in-form";
import { useSearchParams } from "next/navigation";

export default function SigninPage() {
  const searchParams = useSearchParams();
  const isSeller = searchParams.get("as") === "seller";

  return (
    <div className="container pt-20 text-center">
      <Shapes className="mb-5 inline-block" size={60} />

      <h1 className="text-2xl font-bold">
        Sign in to your {isSeller && "seller"} account
      </h1>
      <Link
        href="sign-in"
        className={cn(
          buttonVariants({
            variant: "link",
            size: "sm",
          }),
          "mb-8 p-0 text-blue-500",
        )}
      >
        sign-up if you don't have an account
      </Link>
      <SigninForm />
      <p></p>
    </div>
  );
}
