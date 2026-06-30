"use client";
import { useCartStore } from "@/stores/cart-store";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutForm } from "@/components/store/checkout-form";

export default function CheckoutPage() {
  const { items, totalItems } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex flex-col items-center justify-center px-4 py-24 max-w-7xl">
        <ShoppingCart className="h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add some items before checking out.</p>
        <Button asChild className="mt-6"><Link href="/products">Browse Products</Link></Button>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="mt-1 text-sm text-muted-foreground">{totalItems} item(s)</p>
      <div className="mt-8">
        <CheckoutForm />
      </div>
    </div>
  );
}
