"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShoppingCart, User, Menu, Store, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { SearchBar } from "@/components/store/search-bar";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/cart", label: "Cart" },
  { href: "/account", label: "Account" },
];

export function StoreHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl shrink-0">
          <Store className="h-6 w-6 text-primary" />
          Nacnet
        </Link>
        <div className="hidden md:flex flex-1 max-w-md mx-auto">
          <SearchBar />
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {link.label === "Home" ? (
                <span className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  Home
                </span>
              ) : link.label === "Cart" ? (
                <span className="flex items-center gap-1">
                  <ShoppingCart className="h-4 w-4" />
                  Cart
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-4 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      {totalItems > 9 ? "9+" : totalItems}
                    </span>
                  )}
                </span>
              ) : link.label === "Account" ? (
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Account
                </span>
              ) : (
                link.label
              )}
            </Link>
          ))}
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <div className="mt-8 flex flex-col gap-4">
              <SearchBar />
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 text-lg font-medium",
                    pathname === link.href ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {link.label === "Home" ? <Home className="h-4 w-4" /> : link.label === "Cart" ? <ShoppingCart className="h-4 w-4" /> : link.label === "Account" ? <User className="h-4 w-4" /> : null}
                  {link.label}
                  {link.label === "Cart" && totalItems > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      {totalItems > 9 ? "9+" : totalItems}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
