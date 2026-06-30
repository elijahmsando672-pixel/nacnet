"use client";
import { useAdminStats } from "@/hooks/queries/use-orders";
import { PageHeader } from "@/components/shared/page-header";
import { StatsGrid } from "@/components/shared/stats-grid";
import { DollarSign, ShoppingCart, Package, Users, Store } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Platform overview" />
      <StatsGrid stats={[
        { title: "Total Revenue", value: formatPrice(stats?.totalRevenue ?? 0), change: stats?.revenueChange, icon: DollarSign },
        { title: "Total Orders", value: String(stats?.totalOrders ?? 0), change: stats?.ordersChange, icon: ShoppingCart },
        { title: "Total Products", value: String(stats?.totalProducts ?? 0), change: stats?.productsChange, icon: Package },
        { title: "Total Customers", value: String(stats?.totalCustomers ?? 0), icon: Users },
        { title: "Total Merchants", value: String(stats?.totalMerchants ?? 0), icon: Store },
      ]} />
    </div>
  );
}
