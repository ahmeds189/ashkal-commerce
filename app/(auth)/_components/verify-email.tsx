/* eslint-disable react/no-unescaped-entities */
"use client";

import { buttonVariants } from "@/components/ui/button";
import { trpc } from "@/server/trpc/client";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function VerifyEmail({ token }: { token: string }) {
  const { data, isError, isLoading } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="space-y-3 text-center">
        <Image
          src="/error-mail.svg"
          alt="verify error"
          width={90}
          height={90}
          className="mx-auto mb-8 block"
        />
        <h3 className="text-xl font-bold">There was an error!</h3>
        <p className="text-sm text-muted-foreground">
          This token is not valid or might be expired, please try again.
        </p>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="space-y-3 text-center">
        <Image
          src="/success-mail.svg"
          alt="verify success"
          width={90}
          height={90}
          className="mx-auto mb-8 block"
        />
        <h3 className="text-xl font-bold">You're all set!</h3>
        <p className="text-sm text-muted-foreground">
          Thank you for verifying your email.
        </p>
        <br />
        <Link href="/sign-in" className={buttonVariants()}>
          You can now sign in
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-3 text-center">
        <Loader
          className="mb-8 inline-block animate-spin text-[#749DD3]"
          size={80}
        />
        <h3 className="text-xl font-bold">Verifying...</h3>
        <p className="text-sm text-muted-foreground">This won't take long.</p>
      </div>
    );
  }
}
