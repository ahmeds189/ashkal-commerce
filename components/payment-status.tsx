"use client";

import { trpc } from "@/server/trpc/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  orderEmail: string;
  orderId: string;
  isPaid: boolean;
};

export default function PaymentStatus({ orderId, isPaid }: Props) {
  const router = useRouter();

  const { data, error } = trpc.payment.orderPaymentStatus.useQuery(
    { orderId },
    {
      enabled: !isPaid,
      refetchInterval: (data) => (data?.isPaid ? false : 1000),
      refetchIntervalInBackground: false,
      refetchOnMount: "always",
    },
  );

  useEffect(() => {
    if (data?.isPaid) router.refresh();
    if (error) {
      console.error("Error fetching payment status:", error);
    }
  }, [data?.isPaid, router, error]);

  return (
    <p className="text-sm text-muted-foreground">
      Payment status: {isPaid ? "Successful" : "Pending"}
    </p>
  );
}
