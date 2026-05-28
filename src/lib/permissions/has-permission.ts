import { Role } from "@prisma/client";

const roleHierarchy: Record<Role, number> = {
  ADMIN: 4,
  MANAGER: 3,
  TEAM_MEMBER: 2,
  CLIENT: 1,
};

export function hasPermission(
  currentRole: Role,
  requiredRole: Role
) {
  return roleHierarchy[currentRole] >= roleHierarchy[requiredRole];
}