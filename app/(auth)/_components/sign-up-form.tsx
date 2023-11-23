"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthSchema, AuthSchemaTypes } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorMessage from "./error-message";
import { cn } from "@/lib/utils";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchemaTypes>({
    resolver: zodResolver(AuthSchema),
  });

  const onSubmit = ({ email, password }: AuthSchemaTypes) => {
    console.log(email, password);
  };

  return (
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
        />
        <ErrorMessage message={errors.password?.message} />
      </div>
      <Button type="submit" className="w-full">
        Sign up
      </Button>
    </form>
  );
}
