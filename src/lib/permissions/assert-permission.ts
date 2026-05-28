import { Role } from "@prisma/client";
import { getCurrentWorkspace } from "@/lib/auth/current-workspace";
import { ForbiddenError } from "@/lib/permissions/errors";
import { permissions } from "@/lib/permissions/permissions";

type Resource = keyof typeof permissions;

type Action<R extends Resource> = keyof (typeof permissions)[R];

export async function assertPermission<R extends Resource>(
  resource: R,
  action: Action<R>
) {
  const { workspace, role } = await getCurrentWorkspace();

  const allowedRoles = permissions[resource][action] as readonly Role[];

  if (!allowedRoles.includes(role)) {
    throw new ForbiddenError("You do not have permission to perform this action.");
  }

  return {
    workspace,
    role,
  };
}