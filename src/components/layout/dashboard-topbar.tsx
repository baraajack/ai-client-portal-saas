"use client";
import { Role } from "@prisma/client";
import { signOutAction } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";

type DashboardTopbarProps = {
  email: string;
  role: Role;
  workspaceName: string;
};

export function DashboardTopbar({
  email,
  role,
  workspaceName,
}: DashboardTopbarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <MobileSidebar workspaceName={workspaceName} role={role} />

        <div>
          <p className="text-sm font-medium">{email}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <form action={signOutAction}>
          <Button type="submit" variant="outline">
            Sign out
          </Button>
        </form>
      </div>
    </header>
  );
}