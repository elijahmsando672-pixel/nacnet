"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const FAQS = [
  { q: "How do I place an order?", a: "Browse products, add items to your cart, and proceed to checkout." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and Apple Pay." },
  { q: "How long does shipping take?", a: "Standard shipping takes 5-7 business days. Express shipping is 2-3 business days." },
  { q: "Can I return an item?", a: "Yes, we offer 30-day returns on most items in original condition." },
];

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    toast.success("Message sent! We'll get back to you soon.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold">Support</h1>
      <p className="mt-1 text-muted-foreground">We&apos;re here to help.</p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
        <div className="mt-4 space-y-3">
          {FAQS.map((faq, i) => (
            <Card
              key={i}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <CardHeader className="p-4">
                <CardTitle className="text-base font-medium">{faq.q}</CardTitle>
              </CardHeader>
              {openIndex === i && (
                <CardContent className="px-4 pb-4 pt-0">
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Contact Us</h2>
        <p className="mt-1 text-sm text-muted-foreground">Fill out the form below and we&apos;ll respond within 24 hours.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <textarea
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <Button type="submit">Send Message</Button>
        </form>
      </section>
    </div>
  );
}
