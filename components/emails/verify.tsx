import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  render,
  Link,
  Heading,
  Tailwind,
} from "@react-email/components";
import * as React from "react";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  actionLabel: string;
  buttonText: string;
  href: string;
};

export function VerifyEmail({ actionLabel, buttonText, href }: Props) {
  return (
    <Html>
      <Head />
      <Preview>The marketplace for high-quality digital goods.</Preview>
      <Tailwind>
        <Body
          className={cn(
            inter.className,
            "bg-amber-50 py-8 font-semibold text-foreground",
          )}
        >
          <Container className="max-w-lg rounded-xl border border-solid border-border bg-white p-10 shadow-lg">
            <Section>
              <Img
                src="/logo.svg"
                width="75"
                height="75"
                alt="Vercel"
                className="mx-auto rounded-xl"
              />
              <Heading className="text-center text-3xl">
                Thanks for joining <strong>Ashkal!</strong>
              </Heading>
            </Section>

            <Hr className="my-7 border border-solid border-border" />

            <Section>
              <Text>Hello there,</Text>
              <Text>
                Welcome to Ashkal, Your marketplace for heigh quality digital
                assets. Click the button below to {actionLabel}.
              </Text>
              <Button
                href={href}
                className="rounded-lg bg-[#6566ff] px-5 py-3 text-white"
              >
                {buttonText}
              </Button>
              <Text>
                Best,
                <br />
                Ashkal inc.
              </Text>
            </Section>

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

            <Hr className="my-7 border border-solid border-border" />

            <Text className="text-sm text-muted-foreground">
              If you didn't request this email, there's nothing to worry about -
              you can safely ignore it.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export const VerifyEmailHtml = (props: Props) =>
  render(<VerifyEmail {...props} />, { pretty: true });
