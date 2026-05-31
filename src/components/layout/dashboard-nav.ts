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
  section: "Workspace" | "Management";
};

export const dashboardNavItems: DashboardNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["ADMIN", "MANAGER", "TEAM_MEMBER", "CLIENT"],
    section: "Workspace",
  },
  {
    title: "Clients",
    href: "/clients",
    icon: Users,
    roles: ["ADMIN", "MANAGER"],
    section: "Workspace",
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderKanban,
    roles: ["ADMIN", "MANAGER", "TEAM_MEMBER", "CLIENT"],
    section: "Workspace",
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: ListTodo,
    roles: ["ADMIN", "MANAGER", "TEAM_MEMBER", "CLIENT"],
    section: "Workspace",
  },
  {
    title: "Files",
    href: "/files",
    icon: FileText,
    roles: ["ADMIN", "MANAGER", "TEAM_MEMBER", "CLIENT"],
    section: "Workspace",
  },
  {
    title: "Admin",
    href: "/admin",
    icon: Shield,
    roles: ["ADMIN"],
    section: "Management",
  },
  {
    title: "Audit Logs",
    href: "/admin/audit-logs",
    icon: Activity,
    roles: ["ADMIN", "MANAGER"],
    section: "Management",
  },
];
