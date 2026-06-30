import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MOCK_MERCHANTS } from "@/lib/api/mock-data";
import { listProducts } from "@/lib/api/endpoints/products";
import { Breadcrumb } from "@/components/store/breadcrumb";
import { ProductGrid } from "@/components/store/product-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const merchant = MOCK_MERCHANTS.find((m) => m.id === id);
  if (!merchant) return { title: "Seller Not Found" };
  return { title: merchant.name };
}

export default async function SellerPage({ params }: Props) {
  const { id } = await params;
  const merchant = MOCK_MERCHANTS.find((m) => m.id === id);
  if (!merchant) notFound();

  const { data: products } = await listProducts({ merchantId: id });

  return (
    <div className="mx-auto px-4 py-8 max-w-7xl">
      <Breadcrumb items={[{ label: "Seller" }, { label: merchant.name }]} />
      <div className="mt-4">
        <h1 className="text-3xl font-bold">{merchant.name}</h1>
        <p className="mt-1 text-muted-foreground">{merchant.email}</p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Products</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <p className="text-2xl font-bold">{merchant.totalProducts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Orders</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <p className="text-2xl font-bold">{merchant.totalOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <p className="text-2xl font-bold">${merchant.totalRevenue.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Products</h2>
      <div className="mt-4">
        <ProductGrid products={products} />
      </div>

      <p className="mt-8 text-xs text-muted-foreground">Member since {formatDate(merchant.createdAt)}</p>
    </div>
  );
}
