import Link from "next/link";
import { signInAction } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Layers3 } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/25 px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm"><Layers3 className="size-5" /></div>
          <div>
          <CardTitle className="text-lg">Welcome back</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your AI Client Portal workspace.</p>
          </div>
        </CardHeader>

        <CardContent>
          <form action={signInAction} className="space-y-4">
            <div className="space-y-2"><Label htmlFor="login-email">Email</Label><Input id="login-email" name="email" type="email" placeholder="you@example.com" required /></div>
            <div className="space-y-2"><Label htmlFor="login-password">Password</Label><Input id="login-password" name="password" type="password" placeholder="Enter your password" required /></div>

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>

          <p className="mt-4 text-sm text-muted-foreground">
            No account?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
