import Link from "next/link";
import { Store } from "lucide-react";

export function StoreFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Store className="h-5 w-5 text-primary" />
              Nacnet
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your one-stop destination for premium electronics, fashion, accessories, and home goods. Quality products at unbeatable prices.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products" className="transition-colors hover:text-foreground">Products</Link></li>
              <li><Link href="/cart" className="transition-colors hover:text-foreground">Cart</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Customer Service</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/support" className="transition-colors hover:text-foreground">Support</Link></li>
              <li><Link href="/about" className="transition-colors hover:text-foreground">About</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Account</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/login" className="transition-colors hover:text-foreground">Login</Link></li>
              <li><Link href="/register" className="transition-colors hover:text-foreground">Register</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-center px-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Nacnet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
