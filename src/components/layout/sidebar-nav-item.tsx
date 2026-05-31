"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { DashboardNavItem } from "@/components/layout/dashboard-nav";

export function SidebarNavItem({ item }: { item: DashboardNavItem }) {
  const pathname = usePathname();
  const isActive =
    pathname === item.href ||
    (item.href !== "/admin" && pathname.startsWith(`${item.href}/`));

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
          : "text-sidebar-foreground/65 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon
        className={cn(
          "size-4 transition-colors",
          isActive
            ? "text-sidebar-primary"
            : "text-sidebar-foreground/45 group-hover:text-sidebar-foreground/80"
        )}
      />
      <span>{item.title}</span>
    </Link>
  );
}
