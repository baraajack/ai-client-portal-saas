import Link from "next/link";
import { signInAction } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>

        <CardContent>
          <form action={signInAction} className="space-y-4">
            <Input name="email" type="email" placeholder="Email" required />
            <Input name="password" type="password" placeholder="Password" required />

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>

          <p className="mt-4 text-sm text-muted-foreground">
            No account?{" "}
            <Link href="/register" className="underline">
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}