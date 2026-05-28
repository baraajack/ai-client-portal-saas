import { Role } from "@prisma/client";
import { getCurrentWorkspace } from "@/lib/auth/current-workspace";
import { ForbiddenError } from "@/lib/permissions/errors";

export async function assertWorkspaceRole(allowedRoles: Role[]) {
  const { workspace, role } = await getCurrentWorkspace();

  if (!allowedRoles.includes(role)) {
    throw new ForbiddenError("You do not have permission to perform this action.");
  }

  return {
    workspace,
    role,
  };
}