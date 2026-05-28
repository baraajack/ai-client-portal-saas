import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOutAction } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen">
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <div>
          <p className="font-semibold">AI Client Portal</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>

        <form action={signOutAction}>
          <Button variant="outline" type="submit">
            Sign out
          </Button>
        </form>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}