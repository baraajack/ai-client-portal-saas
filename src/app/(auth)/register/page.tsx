import Link from "next/link";
import { signUpAction } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Layers3 } from "lucide-react";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/25 px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm"><Layers3 className="size-5" /></div>
          <div>
          <CardTitle className="text-lg">Create your workspace</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">Set up a secure client delivery portal for your team.</p>
          </div>
        </CardHeader>

        <CardContent>
          <form action={signUpAction} className="space-y-4">
            <div className="space-y-2"><Label htmlFor="register-workspace">Workspace name</Label><Input id="register-workspace" name="workspaceName" type="text" placeholder="Acme Studio" required /></div>
            <div className="space-y-2"><Label htmlFor="register-email">Email</Label><Input id="register-email" name="email" type="email" placeholder="you@example.com" required /></div>
            <div className="space-y-2"><Label htmlFor="register-password">Password</Label><Input id="register-password" name="password" type="password" placeholder="Create a secure password" required /></div>

            <Button type="submit" className="w-full">
              Create account
            </Button>
          </form>

          <p className="mt-4 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
