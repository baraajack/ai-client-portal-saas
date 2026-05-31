"use client";
import { Layers3, Menu } from "lucide-react";
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
  const sections = ["Workspace", "Management"] as const;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open navigation">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 bg-sidebar text-sidebar-foreground">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Layers3 className="size-5" />
            </div>
            <div>
              <SheetTitle className="text-sidebar-foreground">AI Client Portal</SheetTitle>
              <p className="mt-1 text-xs text-sidebar-foreground/55">{workspaceName}</p>
            </div>
          </div>
        </SheetHeader>

        <nav className="mt-8 space-y-6">
          {sections.map((section) => (
            <div key={section}>
              <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
                {section}
              </p>
              <div className="space-y-1">
                {navItems
                  .filter((item) => item.section === section)
                  .map((item) => (
                    <SidebarNavItem key={item.href} item={item} />
                  ))}
              </div>
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
