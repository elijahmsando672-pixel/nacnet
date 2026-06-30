import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Account" };

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const { user } = session;

  return (
    <div className="mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold">My Account</h1>
      <Card className="mt-6">
        <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div><p className="text-sm text-muted-foreground">Name</p><p className="font-medium">{user.name}</p></div>
          <div><p className="text-sm text-muted-foreground">Email</p><p className="font-medium">{user.email}</p></div>
          <div><p className="text-sm text-muted-foreground">Role</p><p className="font-medium capitalize">{user.role}</p></div>
        </CardContent>
      </Card>
    </div>
  );
}
