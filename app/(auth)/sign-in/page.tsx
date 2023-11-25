/* eslint-disable react/no-unescaped-entities */
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Shapes } from "lucide-react";
import Link from "next/link";
import SigninForm from "../_components/sign-in-form";

export default function SigninPage() {
  return (
    <div className="container pt-20 text-center">
      <Shapes className="mb-5 inline-block" size={60} />

      <h1 className="text-2xl font-bold">Sign in to your account</h1>
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
    </div>
  );
}
