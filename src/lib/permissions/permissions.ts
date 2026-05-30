import { Role } from "@prisma/client";

export const permissions = {
  clients: {
    view: ["ADMIN", "MANAGER"],
    create: ["ADMIN", "MANAGER"],
    update: ["ADMIN", "MANAGER"],
    delete: ["ADMIN"],
  },
  projects: {
    view: ["ADMIN", "MANAGER", "TEAM_MEMBER", "CLIENT"],
    create: ["ADMIN", "MANAGER"],
    update: ["ADMIN", "MANAGER", "TEAM_MEMBER"],
    delete: ["ADMIN"],
  },
  tasks: {
    view: ["ADMIN", "MANAGER", "TEAM_MEMBER", "CLIENT"],
    create: ["ADMIN", "MANAGER"],
    update: ["ADMIN", "MANAGER", "TEAM_MEMBER"],
    delete: ["ADMIN", "MANAGER"],
  },
  files: {
    view: ["ADMIN", "MANAGER", "TEAM_MEMBER", "CLIENT"],
    upload: ["ADMIN", "MANAGER", "TEAM_MEMBER"],
    delete: ["ADMIN", "MANAGER"],
  },
  admin: {
    view: ["ADMIN"],
  },
  auditLogs: {
  view: ["ADMIN", "MANAGER"],
  },
  invitations: {
  view: ["ADMIN", "MANAGER"],
  create: ["ADMIN"],
  revoke: ["ADMIN"],
  },
 } as const satisfies Record<
  string,
  Record<string, readonly Role[]>
>;
