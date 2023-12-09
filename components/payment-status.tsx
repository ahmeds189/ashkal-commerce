"use client";

import { trpc } from "@/server/trpc/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  orderEmail: string;
  orderId: string;
  isPaid: boolean;
};

export default function PaymentStatus({ orderEmail, orderId, isPaid }: Props) {
  const { data } = trpc.payment.orderPaymentStatus.useQuery(
    { orderId },
    {
      enabled: isPaid === false,
      refetchInterval: (data) => (data?.isPaid ? false : 1000),
    },
  );

  const router = useRouter();

  useEffect(() => {
    if (data?.isPaid) router.refresh();
  }, [data?.isPaid, router]);

  return (
    <p className="text-sm text-muted-foreground">
      Payment status: {isPaid ? "Successful" : "Pending"}
    </p>
  );
}
