"use client";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

type CartItemProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

export function CartItemRow({ id, name, price, quantity, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-20 w-20 shrink-0 rounded-md bg-muted" />
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{name}</p>
        <p className="text-sm text-muted-foreground">{formatPrice(price)}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onUpdateQuantity(id, quantity - 1)} disabled={quantity <= 1}>
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center text-sm tabular-nums">{quantity}</span>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onUpdateQuantity(id, quantity + 1)}>
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      <p className="w-24 text-right font-medium">{formatPrice(price * quantity)}</p>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => onRemove(id)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
