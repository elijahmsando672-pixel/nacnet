import type { Metadata } from "next";
import { listProducts } from "@/lib/api/endpoints/products";
import { ProductCard } from "@/components/store/product-card";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Products", description: "Browse our catalog of quality products." };

export default async function ProductsPage() {
  const products = await listProducts();
  return (
    <div className="mx-auto px-4 py-8 max-w-7xl">
      <PageHeader title="Products" description="Discover our curated collection" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.data?.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}
