"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/stores/wishlist-store";
import { ProductCard } from "@/components/store/product-card";

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex flex-col items-center justify-center px-4 py-24 max-w-7xl">
        <Heart className="h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Your wishlist is empty</h1>
        <p className="mt-2 text-muted-foreground">Save items you love to your wishlist.</p>
        <Button asChild className="mt-6"><Link href="/products">Browse Products</Link></Button>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="mt-1 text-sm text-muted-foreground">{items.length} item(s)</p>
        </div>
        <Button variant="outline" onClick={clearWishlist}>Clear All</Button>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
