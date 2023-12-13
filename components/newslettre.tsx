"use client";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent } from "react";

export default function NewsletterForm() {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2 sm:max-w-sm">
      <Input placeholder="Your email" />
      <Button className="w-12" size="icon">
        <ArrowRight />
      </Button>
    </form>
  );
}
