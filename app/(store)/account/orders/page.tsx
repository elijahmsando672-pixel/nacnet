import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { listOrders } from "@/lib/api/endpoints/orders";
import { formatPrice, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "My Orders" };

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline" | "success" | "warning"> = {
  pending: "warning", confirmed: "secondary", processing: "default", shipped: "secondary", delivered: "success", cancelled: "destructive",
};

export default async function AccountOrdersPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const orders = await listOrders({ customerId: session.user.id });

  return (
    <div className="mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold">My Orders</h1>
      {orders.data?.length === 0 ? (
        <div className="mt-8 text-center text-muted-foreground">No orders yet.</div>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.data?.map((order) => (
            <Link key={order.id} href={`/account/orders/${order.id}`}>
              <Card className="transition-colors hover:bg-muted/50">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                    <p className="text-sm text-muted-foreground">{order.items.length} item(s)</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatPrice(order.total)}</p>
                    <Badge variant={statusColors[order.status] || "outline"} className="mt-1 capitalize">{order.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
