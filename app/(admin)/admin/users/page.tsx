"use client";
import { useUsers } from "@/hooks/queries/use-users";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { createColumnHelper } from "@tanstack/react-table";
import type { User } from "@/types/auth";

const columnHelper = createColumnHelper<User>();

export default function AdminUsersPage() {
  const { data, isLoading } = useUsers();

  const columns = [
    columnHelper.accessor("name", { header: "Name" }),
    columnHelper.accessor("email", { header: "Email" }),
    columnHelper.accessor("role", { header: "Role", cell: (info) => <Badge variant={info.getValue() === "admin" ? "destructive" : info.getValue() === "merchant" ? "default" : "secondary"} className="capitalize">{info.getValue()}</Badge> }),
    columnHelper.accessor("createdAt", { header: "Joined", cell: (info) => info.getValue() ? formatDate(info.getValue()!) : "-" }),
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Users" description="Manage platform users" />
      <DataTable columns={columns} data={data?.data ?? []} isLoading={isLoading} />
    </div>
  );
}
