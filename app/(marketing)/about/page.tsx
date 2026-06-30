import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold">About Nacnet</h1>
      <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
        Nacnet is a modern ecommerce platform built for speed, security, and scale.
        We provide merchants with powerful tools to manage products and orders, while
        giving customers a seamless shopping experience.
      </p>
      <div className="mt-12">
        <h2 className="text-xl font-semibold">Our Mission</h2>
        <p className="mt-2 text-muted-foreground">
          To democratize ecommerce by making enterprise-grade tools accessible to
          businesses of all sizes.
        </p>
      </div>
    </div>
  );
}
