"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthSchema, AuthSchemaTypes } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorMessage from "./error-message";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Separator } from "@radix-ui/react-separator";

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchemaTypes>({
    resolver: zodResolver(AuthSchema),
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");

  const { mutate: signIn, isLoading } = trpc.auth.signinUser.useMutation({
    onSuccess: () => {
      toast.success("Signed in successfully");

      if (origin) {
        router.push(`/${origin}`);
        return;
      }
      if (isSeller) {
        router.push(`/sell`);
        return;
      }
      router.push("/");
      router.refresh();
    },
    onError: (err) => {
      err.data?.code === "UNAUTHORIZED" &&
        toast.error("invalid email or password");
    },
  });

  const onSubmit = ({ email, password }: AuthSchemaTypes) => {
    signIn({ email, password });
  };

  return (
    <>
      <form
        className="mx-auto max-w-sm space-y-3 text-start"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Label>Email</Label>
          <Input
            {...register("email")}
            className={cn(
              "my-1",
              errors.email?.message && "focus-visible:ring-red-500",
            )}
          />
          <ErrorMessage message={errors.email?.message} />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            {...register("password")}
            className={cn(
              "my-1",
              errors.password?.message && "focus-visible:ring-red-500",
            )}
            type="password"
          />
          <ErrorMessage message={errors.password?.message} />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <LoaderIcon className="animate-spin" /> : "Sign in"}
        </Button>
      </form>
      <br />
      <Separator />
      <br />
      <div className="mx-auto max-w-sm">
        {isSeller ? (
          <Button
            disabled={isLoading}
            className="w-full"
            variant="secondary"
            onClick={() => router.replace("/sign-in", undefined)}
          >
            Continue as customer
          </Button>
        ) : (
          <Button
            disabled={isLoading}
            className="w-full"
            variant="secondary"
            onClick={() => router.push("?as=seller")}
          >
            Continue as seller
          </Button>
        )}
      </div>
    </>
  );
}
