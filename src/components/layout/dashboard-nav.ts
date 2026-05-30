import {
  Activity,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  Shield,
  Users,
  FileText,
} from "lucide-react";
import { Role } from "@prisma/client";

export type DashboardNavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: Role[];
};

export const dashboardNavItems: DashboardNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["ADMIN", "MANAGER", "TEAM_MEMBER", "CLIENT"],
  },
  {
    title: "Clients",
    href: "/clients",
    icon: Users,
    roles: ["ADMIN", "MANAGER"],
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderKanban,
    roles: ["ADMIN", "MANAGER", "TEAM_MEMBER", "CLIENT"],
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: ListTodo,
    roles: ["ADMIN", "MANAGER", "TEAM_MEMBER", "CLIENT"],
  },
  {
    title: "Files",
    href: "/files",
    icon: FileText,
    roles: ["ADMIN", "MANAGER", "TEAM_MEMBER", "CLIENT"],
  },
  {
    title: "Admin",
    href: "/admin",
    icon: Shield,
    roles: ["ADMIN"],
  },
  {
  title: "Audit Logs",
  href: "/admin/audit-logs",
  icon: Activity,
  roles: ["ADMIN", "MANAGER"],
},
];
