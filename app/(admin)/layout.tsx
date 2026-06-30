"use client";

import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { LayoutDashboard, Users, Store } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/merchants", label: "Merchants", icon: Store },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell navItems={navItems} title="Admin Dashboard">
      {children}
    </DashboardShell>
  );
}
