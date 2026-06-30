"use client";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { toast } from "sonner";
import type { Product } from "@/types/product";

export function AddToCartButton({ product, disabled }: { product: Product; disabled?: boolean }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Button size="lg" className="w-full sm:w-auto" disabled={disabled} onClick={() => {
      addItem({ id: product.id, name: product.name, price: product.price, quantity: 1, image: product.imageUrl });
      toast.success("Added to cart");
    }}>
      Add to Cart
    </Button>
  );
}
