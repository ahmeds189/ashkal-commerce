import { Product } from "../../server/payload-types";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  render,
} from "@react-email/components";
import * as React from "react";

type Props = {
  email: string;
  date: Date | number;
  orderId: string;
  products: Product[];
};

export function ReceiptEmail({ email, date, orderId, products }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Your Ordre Receipt</Preview>
      <Tailwind>
        <Body className="bg-white py-8 font-sans font-semibold text-zinc-800">
          <Container className="max-w-lg rounded-xl border border-solid border-gray-200 bg-white p-10">
            <Section>
              <Img
                src="https://res.cloudinary.com/duzqpx4rn/image/upload/f_auto,q_auto/xhsaii40inxdcb25rc5i"
                width="60"
                height="60"
                alt="Ashkal"
                className="mx-auto rounded-xl"
              />
              <Heading className="text-center text-3xl">
                Thanks for your order!
              </Heading>
            </Section>

            <Hr className="my-7 border border-solid border-gray-200" />

            <Section className="text-center text-sm">
              <Link
                href="https://ashkal.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </Link>
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <Link
                href="https://github.com/ahmeds189"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </Link>
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <Link
                href="https://linkedin.com/in/ahmeds189"
                target="_blank"
                rel="noopener noreferrer"
              >
                Linkedin
              </Link>
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <Link
                href="https://twitter.com/ahmeddotgg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export const ReceiptEmailHtml = (props: Props) =>
  render(<ReceiptEmail {...props} />, { pretty: true });
