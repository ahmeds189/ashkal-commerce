"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthSchema, AuthSchemaTypes } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorMessage from "./error-message";
import { cn } from "@/lib/utils";
import { trpc } from "@/server/trpc/client";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchemaTypes>({
    resolver: zodResolver(AuthSchema),
  });
  const router = useRouter();

  const { mutate: signUp, isLoading } = trpc.auth.createPayloadUser.useMutation(
    {
      onError: (err) => {
        if (err.data?.code === "CONFLICT") {
          return toast.error("This email already signed up, sign in instade!");
        }
        return toast.error("Something went wrong, please try again");
      },
      onSuccess: ({ sentToEmail }) => {
        toast.success(`verification email sent to ${sentToEmail}`);
        router.push(`/verify-email?to=${sentToEmail}`);
      },
    },
  );

  const onSubmit = ({ email, password }: AuthSchemaTypes) => {
    signUp({ email, password });
  };

  return (
    <form
      className="mx-auto max-w-sm space-y-2 text-start"
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
        {isLoading ? <LoaderIcon className="animate-spin" /> : "Sign up"}
      </Button>
    </form>
  );
}
