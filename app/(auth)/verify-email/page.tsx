import Image from "next/image";
import VerifyEmail from "../_components/verify-email";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function VerifyEmailPage({ searchParams }: Props) {
  const token = searchParams.token;
  const toEmail = searchParams.to;

  return (
    <div className="container py-20">
      {token && typeof token === "string" ? (
        <VerifyEmail token={token} />
      ) : (
        <div className="space-y-3 text-center">
          <Image
            src="/sent-email.svg"
            alt="email sent"
            width={100}
            height={100}
            className="mx-auto mb-8 block"
          />
          <h3 className="text-xl font-bold">Check your email</h3>
          <p className="text-sm text-muted-foreground">
            {toEmail
              ? `we've sent a verification link to ${toEmail}`
              : `we've sent a verification link to your email`}
          </p>
        </div>
      )}
    </div>
  );
}
