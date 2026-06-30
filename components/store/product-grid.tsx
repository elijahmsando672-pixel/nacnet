import { ProductCard } from "@/components/store/product-card";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

type ProductGridProps = {
  products: Product[];
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
};

export function ProductGrid({ products, isLoading, emptyMessage = "No products found.", className }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
