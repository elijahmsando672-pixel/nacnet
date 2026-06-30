"use client";
import { useMerchantStats } from "@/hooks/queries/use-orders";
import { PageHeader } from "@/components/shared/page-header";
import { StatsGrid } from "@/components/shared/stats-grid";
import { DollarSign, ShoppingCart, Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function MerchantDashboardPage() {
  const { data: stats, isLoading } = useMerchantStats("merchant-1");

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Overview of your store" />
      <StatsGrid stats={[
        { title: "Total Revenue", value: formatPrice(stats?.totalRevenue ?? 0), change: stats?.revenueChange, icon: DollarSign },
        { title: "Total Orders", value: String(stats?.totalOrders ?? 0), change: stats?.ordersChange, icon: ShoppingCart },
        { title: "Total Products", value: String(stats?.totalProducts ?? 0), change: stats?.productsChange, icon: Package },
      ]} />
    </div>
  );
}
