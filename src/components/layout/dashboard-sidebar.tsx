"use client";
import { Layers3 } from "lucide-react";
import { Role } from "@prisma/client";
import { dashboardNavItems } from "@/components/layout/dashboard-nav";
import { SidebarNavItem } from "@/components/layout/sidebar-nav-item";

type DashboardSidebarProps = {
  workspaceName: string;
  role: Role;
};

export function DashboardSidebar({
  workspaceName,
  role,
}: DashboardSidebarProps) {
  const navItems = dashboardNavItems.filter((item) =>
    item.roles.includes(role)
  );
  const sections = ["Workspace", "Management"] as const;

  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex lg:flex-col">
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
        <div className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
          <Layers3 className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold leading-none">AI Client Portal</p>
          <p className="mt-1.5 truncate text-xs text-sidebar-foreground/55">
            {workspaceName}
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto p-3">
        {sections.map((section) => {
          const sectionItems = navItems.filter((item) => item.section === section);

          if (sectionItems.length === 0) return null;

          return (
            <div key={section}>
              <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
                {section}
              </p>
              <div className="space-y-1">
                {sectionItems.map((item) => (
                  <SidebarNavItem key={item.href} item={item} />
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/35 p-3">
          <p className="text-xs font-medium text-sidebar-foreground">Workspace access</p>
          <p className="mt-1 text-xs text-sidebar-foreground/55">
            Signed in as {role.replaceAll("_", " ").toLowerCase()}
          </p>
        </div>
      </div>
    </aside>
  );
}
