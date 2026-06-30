import { ProductCard } from "@/components/store/product-card";
import { Countdown } from "@/components/store/countdown";
import type { Product } from "@/types/product";

type FlashSaleProps = {
  products: Product[];
  targetDate: string;
};

export function FlashSale({ products, targetDate }: FlashSaleProps) {
  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Flash Sale</h2>
          <p className="text-sm text-muted-foreground">Limited time offers — grab them before they&apos;re gone</p>
        </div>
        <Countdown targetDate={targetDate} />
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
