"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavCategory = { name: string; slug: string };

type NavbarProps = {
  categories?: NavCategory[];
  className?: string;
};

export function Navbar({ categories, className }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={cn("border-b bg-background", className)}>
      <ul className="mx-auto flex h-12 max-w-7xl items-center gap-6 px-4 text-sm font-medium">
        <li>
          <Link href="/" className="transition-colors hover:text-primary text-muted-foreground hover:text-foreground">
            Home
          </Link>
        </li>
        <li>
          <Link href="/products" className="transition-colors hover:text-primary text-muted-foreground hover:text-foreground">
            Products
          </Link>
        </li>
        {categories && categories.length > 0 && (
          <li ref={dropdownRef} className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1 transition-colors hover:text-primary text-muted-foreground hover:text-foreground"
            >
              Categories
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
            </button>
            {open && (
              <div className="absolute left-0 top-full mt-1 w-48 rounded-md border bg-card shadow-lg z-50">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm transition-colors hover:bg-muted"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </li>
        )}
        <li>
          <Link href="/sale" className="transition-colors text-destructive hover:text-destructive/80 font-semibold">
            Sale
          </Link>
        </li>
        <li>
          <Link href="/support" className="transition-colors hover:text-primary text-muted-foreground hover:text-foreground">
            Support
          </Link>
        </li>
      </ul>
    </nav>
  );
}
