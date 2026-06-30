"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users, Store, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";

export type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

export function DashboardShell({
  children,
  navItems,
  title,
}: {
  children: React.ReactNode;
  navItems: NavItem[];
  title?: string;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const NavContent = ({ mobile }: { mobile?: boolean }) => (
    <nav className={cn("flex flex-col gap-1", mobile && "mt-8")}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setSidebarOpen(false)}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
            isActive(item.href)
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground"
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
      <Link
        href="/api/auth/logout"
        className="mt-4 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-destructive"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Link>
    </nav>
  );

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 flex-col border-r bg-background p-4 lg:flex">
        <Link
          href="/"
          className="mb-8 flex items-center gap-2 px-3 text-lg font-bold"
        >
          <Store className="h-5 w-5 text-primary" />
          Nacnet
        </Link>
        <NavContent />
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <NavContent mobile />
            </SheetContent>
          </Sheet>
          <h1 className="text-lg font-semibold">{title || "Dashboard"}</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/api/auth/logout">Logout</Link>
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
