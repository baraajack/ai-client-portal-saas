"use client";
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

  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r bg-background lg:block">
      <div className="flex h-16 items-center border-b px-6">
        <div>
          <p className="font-semibold leading-none">AI Client Portal</p>
          <p className="mt-1 truncate text-xs text-muted-foreground">
            {workspaceName}
          </p>
        </div>
      </div>

      <nav className="space-y-1 p-4">
        {navItems.map((item) => (
          <SidebarNavItem key={item.href} item={item} />
        ))}
      </nav>
    </aside>
  );
}