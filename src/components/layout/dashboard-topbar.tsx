"use client";
import { Role } from "@prisma/client";
import { LogOut, Search } from "lucide-react";
import { signOutAction } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
  const initials = email.slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/92 px-4 backdrop-blur lg:px-6">
      <div className="flex items-center gap-3">
        <MobileSidebar workspaceName={workspaceName} role={role} />

        <div className="hidden sm:block">
          <p className="text-sm font-semibold">{workspaceName}</p>
          <p className="text-xs text-muted-foreground">Workspace overview</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="hidden w-56 justify-between text-muted-foreground md:flex"
          onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
        >
          <span className="flex items-center gap-2">
            <Search className="size-4" />
            Search
          </span>
          <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px]">⌘ K</kbd>
        </Button>
        <ThemeToggle />

        <div className="hidden items-center gap-2 border-l pl-3 sm:flex">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden max-w-40 lg:block">
            <p className="truncate text-xs font-medium">{email}</p>
            <p className="text-[11px] text-muted-foreground">
              {role.replaceAll("_", " ")}
            </p>
          </div>
        </div>

        <form action={signOutAction}>
          <Button type="submit" variant="ghost" size="icon" aria-label="Sign out" title="Sign out">
            <LogOut className="size-4" />
          </Button>
        </form>
      </div>
    </header>
  );
}
