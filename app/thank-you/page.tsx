import PaymentStatus from "@/components/payment-status";
import { getUserSessionInfo } from "@/lib/utils";
import { getPayloadClient } from "@/server/get-payload";
import { Product, ProductFile, User } from "@/server/payload-types";
import { FileDown } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ThankyouPage({ searchParams }: Props) {
  const orderId = searchParams.orderId;

  const nextCookies = cookies();
  const payload = await getPayloadClient();

  const { user } = await getUserSessionInfo(nextCookies);
  const { docs: orders } = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });

  const [order] = orders;

  if (!order) return notFound();

  const currOrderUserId =
    typeof order.user === "string" ? order.user : order.user.id;

  if (currOrderUserId !== user?.id) {
    return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`);
  }

  return (
    <main className="container mt-20 flex flex-col gap-4">
      <Image
        src="/received-order.png"
        alt="order confirmed"
        width={300}
        height={200}
        className="block text-center"
      />
      <h1 className="text-4xl font-bold">Thank You!</h1>
      {order._isPaid ? (
        <p className="max-w-md text-sm text-muted-foreground">
          your order was processed and your assets are available to download
          below, we've sent you a receipt and order details to{" "}
          {typeof order.user !== "string" ? (
            <span className="font-medium text-foreground">
              {order.user.email}
            </span>
          ) : (
            <span>your email.</span>
          )}
        </p>
      ) : (
        <p className="max-w-md text-center text-sm text-muted-foreground">
          we're currently processing your order, and we appreciate your time,
          we'll send you confirmation shortly!
        </p>
      )}

      <p className="mt-8 text-sm text-muted-foreground">
        Order num: {order.id}
      </p>

      <ul>
        {(order.products as Product[]).map((product) => {
          const downloadUrl = (product.product_files as ProductFile)
            .url as string;
          return (
            <li key={product.id}>
              <p>{product.name}</p>
              <a
                href={downloadUrl}
                download={product.name}
                className="text-sm text-blue-500"
              >
                <FileDown />
              </a>
            </li>
          );
        })}
      </ul>

      <PaymentStatus
        orderEmail={(order.user as User).email}
        isPaid={order._isPaid}
        orderId={order.id}
      />

      <Link href="/products" className="mt-8 text-end text-sm text-blue-500">
        continue shopping &rsaquo;
      </Link>
    </main>
  );
}
