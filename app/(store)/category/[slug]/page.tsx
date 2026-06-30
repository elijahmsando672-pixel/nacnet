import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listProducts } from "@/lib/api/endpoints/products";
import { Breadcrumb } from "@/components/store/breadcrumb";
import { ProductGrid } from "@/components/store/product-grid";

const CATEGORIES = ["Phones", "Audio", "Cases", "Accessories"];

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = CATEGORIES.find((c) => c.toLowerCase() === slug.toLowerCase()) || slug;
  return { title: `${name} - Products` };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const categoryName = CATEGORIES.find((c) => c.toLowerCase() === slug.toLowerCase());
  if (!categoryName) notFound();

  const { data: products } = await listProducts({ category: categoryName });

  return (
    <div className="mx-auto px-4 py-8 max-w-7xl">
      <Breadcrumb items={[{ label: "Category" }, { label: categoryName }]} />
      <h1 className="mt-4 text-3xl font-bold">Products in {categoryName}</h1>
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
