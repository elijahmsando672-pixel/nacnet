import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api/endpoints/products";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "./add-to-cart-button";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    return { title: product.name, description: product.description };
  } catch {
    return { title: "Product Not Found" };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  let product;
  try { product = await getProductBySlug(slug); } catch { notFound(); }

  return (
    <div className="mx-auto px-4 py-8 max-w-7xl">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="aspect-square rounded-lg bg-muted" />
        <div>
          <Badge variant="secondary">{product.category}</Badge>
          <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
            {product.compareAtPrice && <span className="text-lg text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>}
          </div>
          <p className="mt-6 text-muted-foreground">{product.description}</p>
          <p className="mt-4 text-sm text-muted-foreground">{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</p>
          <div className="mt-8"><AddToCartButton product={product} disabled={product.stock <= 0} /></div>
        </div>
      </div>
    </div>
  );
}
