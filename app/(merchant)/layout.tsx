"use client";

import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { LayoutDashboard, Package, ShoppingCart } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/orders", label: "Orders", icon: ShoppingCart },
];

export default function MerchantLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell navItems={navItems} title="Merchant Dashboard">
      {children}
    </DashboardShell>
  );
}
