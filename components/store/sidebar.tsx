import Link from "next/link";
import { cn } from "@/lib/utils";

type SidebarProps = {
  categories?: string[];
  selected?: string;
  baseUrl?: string;
  className?: string;
};

export function Sidebar({ categories, selected, baseUrl = "/category", className }: SidebarProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <aside className={cn("hidden lg:block w-56 shrink-0", className)}>
      <nav className="space-y-1">
        <Link
          href={baseUrl}
          className={cn(
            "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
            !selected
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          All Categories
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`${baseUrl}/${cat.toLowerCase().replace(/\s+/g, "-")}`}
            className={cn(
              "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
              selected === cat
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {cat}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
