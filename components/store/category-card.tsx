import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CategoryCardProps = {
  name: string;
  slug: string;
  productCount: number;
  icon?: LucideIcon;
  className?: string;
};

export function CategoryCard({ name, slug, productCount, icon: Icon, className }: CategoryCardProps) {
  return (
    <Link href={`/category/${slug}`}>
      <Card className={cn("group transition-all hover:shadow-md hover:border-primary/50", className)}>
        <CardContent className="flex flex-col items-center gap-2 p-6 text-center">
          {Icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary/10">
              <Icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
            </div>
          )}
          <h3 className="font-semibold group-hover:text-primary transition-colors">{name}</h3>
          <p className="text-sm text-muted-foreground">{productCount} product{productCount !== 1 ? "s" : ""}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
