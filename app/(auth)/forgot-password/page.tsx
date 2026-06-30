"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const forgotSchema = z.object({ email: z.string().email("Invalid email") });
type ForgotForm = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotForm>({ resolver: zodResolver(forgotSchema) });

  const onSubmit = async (_data: ForgotForm) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("If an account exists, you'll receive a reset link.");
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <Link href="/" className="mb-2 flex justify-center"><Store className="h-8 w-8 text-primary" /></Link>
        <CardTitle className="text-xl">Forgot password?</CardTitle>
        <CardDescription>Enter your email and we&apos;ll send you a reset link</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Send reset link</Button>
        </form>
        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">Remember your password? </span>
          <Link href="/login" className="text-primary hover:underline">Sign in</Link>
        </div>
      </CardContent>
    </Card>
  );
}
