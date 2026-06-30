"use client";
import Link from "next/link";
import { useOrders } from "@/hooks/queries/use-orders";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, formatDate } from "@/lib/utils";
import { Eye } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { Order } from "@/types/order";

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline" | "success" | "warning"> = {
  pending: "warning", confirmed: "secondary", processing: "default", shipped: "secondary", delivered: "success", cancelled: "destructive",
};

export default function MerchantOrdersPage() {
  const { data, isLoading } = useOrders();

  const columns: ColumnDef<Order, unknown>[] = [
    { accessorKey: "id", header: "Order ID", cell: ({ getValue }) => <span className="font-mono text-sm">#{(getValue() as string)}</span> },
    { accessorKey: "customerName", header: "Customer" },
    { accessorKey: "total", header: "Total", cell: ({ getValue }) => formatPrice(getValue() as number) },
    { accessorKey: "status", header: "Status", cell: ({ getValue }) => {
      const status = getValue() as string;
      return <Badge variant={statusColors[status] || "outline"} className="capitalize">{status}</Badge>;
    }},
    { accessorKey: "createdAt", header: "Date", cell: ({ getValue }) => formatDate(getValue() as string) },
    { id: "actions", header: "", cell: ({ row }) => <Button variant="ghost" size="icon" asChild><Link href={`/orders/${row.original.id}`}><Eye className="h-4 w-4" /></Link></Button> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Orders" description="Manage incoming orders" />
      <DataTable columns={columns} data={data?.data ?? []} isLoading={isLoading} />
    </div>
  );
}
