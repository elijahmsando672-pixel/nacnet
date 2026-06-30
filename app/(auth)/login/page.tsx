"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const loginSchema = z.object({ email: z.string().email("Invalid email"), password: z.string().min(1, "Password is required") });
type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) { const e = await res.json(); throw new Error(e.message || "Login failed"); }
      const { user } = await res.json();
      const home = user.role === "admin" ? "/admin/dashboard" : user.role === "merchant" ? "/dashboard" : "/products";
      router.push(home);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <Link href="/" className="mb-2 flex justify-center"><Store className="h-8 w-8 text-primary" /></Link>
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>Sign in to your Nacnet account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Sign in</Button>
        </form>
        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">Don&apos;t have an account? </span>
          <Link href="/register" className="text-primary hover:underline">Register</Link>
        </div>
        <div className="mt-6 rounded-lg border bg-muted/50 p-3">
          <p className="text-xs font-medium text-muted-foreground mb-2">Demo Credentials</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>Customer: customer@nacnet.com / password123</p>
            <p>Merchant: merchant@nacnet.com / password123</p>
            <p>Admin: admin@nacnet.com / password123</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
