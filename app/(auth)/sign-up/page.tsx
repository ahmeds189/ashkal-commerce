import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Shapes } from "lucide-react";
import Link from "next/link";
import SignupForm from "../_components/sign-up-form";

export default function SigninPage() {
  return (
    <div className="container pt-20">
      <Shapes className="inline-block" size={60} />
      <h1 className="text-2xl font-bold">Create an account</h1>
      <Link
        href="sign-in"
        className={cn(
          buttonVariants({
            variant: "link",
            size: "sm",
          }),
          "p-0 text-blue-500",
        )}
      >
        sign-in if you already have an account
      </Link>
      <SignupForm />
    </div>
  );
}
