"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

type Stat = {
  title: string;
  value: string;
  change?: number;
  icon?: React.ElementType;
};

export function StatsGrid({
  stats,
  className,
}: {
  stats: Stat[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {stats.map((stat) => {
        const Icon = stat.icon;
        const isPositive = stat.change !== undefined && stat.change >= 0;
        return (
          <div
            key={stat.title}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            </div>
            <p className="mt-2 text-2xl font-bold">{stat.value}</p>
            {stat.change !== undefined && (
              <div
                className={cn(
                  "mt-1 flex items-center gap-1 text-xs",
                  isPositive ? "text-success" : "text-destructive"
                )}
              >
                {isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {Math.abs(stat.change).toFixed(1)}% from last month
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
