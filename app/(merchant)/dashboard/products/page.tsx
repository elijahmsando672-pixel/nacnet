"use client";
import Link from "next/link";
import { useProducts, useDeleteProduct } from "@/hooks/queries/use-products";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "@/types/product";

export default function MerchantProductsPage() {
  const { data, isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();

  const columns: ColumnDef<Product, unknown>[] = [
    { accessorKey: "name", header: "Name", cell: ({ row }) => <Link href={`/dashboard/products/${row.original.id}`} className="hover:underline font-medium">{row.original.name}</Link> },
    { accessorKey: "price", header: "Price", cell: ({ getValue }) => formatPrice(getValue() as number) },
    { accessorKey: "status", header: "Status", cell: ({ getValue }) => {
      const status = getValue() as string;
      return <Badge variant={status === "active" ? "success" : status === "draft" ? "warning" : "secondary"} className="capitalize">{status}</Badge>;
    }},
    { accessorKey: "stock", header: "Stock" },
    { id: "actions", header: "Actions", cell: ({ row }) => (
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" asChild><Link href={`/dashboard/products/${row.original.id}`}><Pencil className="h-4 w-4" /></Link></Button>
        <Button variant="ghost" size="icon" onClick={() => { deleteProduct.mutate(row.original.id); toast.success("Product deleted"); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Products" description="Manage your product catalog">
        <Button asChild><Link href="/dashboard/products/new"><Plus className="mr-2 h-4 w-4" />New Product</Link></Button>
      </PageHeader>
      <DataTable columns={columns} data={data?.data ?? []} isLoading={isLoading} />
    </div>
  );
}
