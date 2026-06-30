"use client";
import Link from "next/link";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex flex-col items-center justify-center px-4 py-24 max-w-7xl">
        <ShoppingCart className="h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Looks like you haven&apos;t added anything yet.</p>
        <Button asChild className="mt-6"><Link href="/products">Browse Products</Link></Button>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      <p className="mt-1 text-sm text-muted-foreground">{totalItems} item(s) in your cart</p>

      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="h-20 w-20 shrink-0 rounded-md bg-muted" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{item.name}</p>
                <p className="text-sm text-muted-foreground">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <p className="w-24 text-right font-medium">{formatPrice(item.price * item.quantity)}</p>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col items-end gap-4">
        <div className="flex items-center gap-4 text-lg">
          <span className="font-medium">Subtotal:</span>
          <span className="font-bold">{formatPrice(totalPrice)}</span>
        </div>
        <Button asChild size="lg"><Link href="/checkout">Proceed to Checkout</Link></Button>
      </div>
    </div>
  );
}
