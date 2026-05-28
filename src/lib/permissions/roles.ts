export const ROLES = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  TEAM_MEMBER: "TEAM_MEMBER",
  CLIENT: "CLIENT",
} as const;

export type Role = keyof typeof ROLES;