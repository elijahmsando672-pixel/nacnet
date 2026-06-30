"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type FiltersProps = {
  categories?: string[];
  selectedCategory?: string;
  onCategoryChange?: (category: string | undefined) => void;
  priceRange?: [number, number];
  onPriceRangeChange?: (range: [number, number]) => void;
  className?: string;
};

export function Filters({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  className,
}: FiltersProps) {
  return (
    <aside className={cn("space-y-6", className)}>
      {categories && categories.length > 0 && (
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm">Category</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-normal cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={!selectedCategory}
                  onChange={() => onCategoryChange?.(undefined)}
                  className="accent-primary"
                />
                All Categories
              </Label>
              {categories.map((cat) => (
                <Label
                  key={cat}
                  className="flex items-center gap-2 text-sm font-normal cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => onCategoryChange?.(cat)}
                    className="accent-primary"
                  />
                  {cat}
                </Label>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {priceRange && onPriceRangeChange && (
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm">Price Range</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4 pt-0">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={0}
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onPriceRangeChange([val, priceRange[1]]);
                }}
                className="h-8"
              />
              <Separator className="w-2" />
              <Input
                type="number"
                min={0}
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onPriceRangeChange([priceRange[0], val]);
                }}
                className="h-8"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </aside>
  );
}
