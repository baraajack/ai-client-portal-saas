"use client";
import { Menu } from "lucide-react";
import { Role } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { dashboardNavItems } from "@/components/layout/dashboard-nav";
import { SidebarNavItem } from "@/components/layout/sidebar-nav-item";

type MobileSidebarProps = {
  workspaceName: string;
  role: Role;
};

export function MobileSidebar({ workspaceName, role }: MobileSidebarProps) {
  const navItems = dashboardNavItems.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle>AI Client Portal</SheetTitle>
          <p className="text-sm text-muted-foreground">{workspaceName}</p>
        </SheetHeader>

        <nav className="mt-6 space-y-1">
          {navItems.map((item) => (
            <SidebarNavItem key={item.href} item={item} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}