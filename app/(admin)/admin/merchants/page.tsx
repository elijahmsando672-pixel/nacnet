"use client";
import { useMerchants } from "@/hooks/queries/use-merchants";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";

type Merchant = {
  id: string; name: string; email: string; status: string;
  totalProducts: number; totalOrders: number; totalRevenue: number; createdAt: string;
};

const columnHelper = createColumnHelper<Merchant>();

export default function AdminMerchantsPage() {
  const { data, isLoading } = useMerchants();

  const columns = [
    columnHelper.accessor("name", { header: "Name" }),
    columnHelper.accessor("email", { header: "Email" }),
    columnHelper.accessor("status", { header: "Status", cell: (info) => <Badge variant={info.getValue() === "active" ? "success" : info.getValue() === "pending" ? "warning" : "secondary"} className="capitalize">{info.getValue()}</Badge> }),
    columnHelper.accessor("totalProducts", { header: "Products" }),
    columnHelper.accessor("totalOrders", { header: "Orders" }),
    columnHelper.accessor("totalRevenue", { header: "Revenue", cell: (info) => formatPrice(info.getValue()) }),
    columnHelper.accessor("createdAt", { header: "Joined", cell: (info) => formatDate(info.getValue()) }),
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Merchants" description="Manage merchant stores" />
      <DataTable columns={columns} data={data?.data ?? []} isLoading={isLoading} />
    </div>
  );
}
