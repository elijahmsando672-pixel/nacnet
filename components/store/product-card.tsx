import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square bg-muted">
          {product.compareAtPrice && <Badge className="absolute left-2 top-2" variant="destructive">Sale</Badge>}
        </div>
      </Link>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground">{product.category}</p>
        <Link href={`/products/${product.slug}`}><h3 className="mt-1 font-semibold hover:underline">{product.name}</h3></Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-bold">{formatPrice(product.price)}</span>
          {product.compareAtPrice && <span className="text-sm text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" size="sm"><Link href={`/products/${product.slug}`}>View Product</Link></Button>
      </CardFooter>
    </Card>
  );
}
