import type { Metadata } from "next";
import { listProducts } from "@/lib/api/endpoints/products";
import { ProductGrid } from "@/components/store/product-grid";

type Props = { searchParams: Promise<{ q?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: q ? `Search: ${q}` : "Search" };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  const { data: products, total } = q
    ? await listProducts({ search: q })
    : { data: [], total: 0 };

  return (
    <div className="mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold">
        {q ? `Search results for "${q}"` : "Search"}
      </h1>
      {q && (
        <p className="mt-1 text-sm text-muted-foreground">
          {total} result{total !== 1 ? "s" : ""} found
        </p>
      )}
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
