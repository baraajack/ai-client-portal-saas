import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { getCurrentWorkspace } from "@/lib/auth/current-workspace";
import { permissions } from "@/lib/permissions/permissions";

type Resource = keyof typeof permissions;

type Action<R extends Resource> = keyof (typeof permissions)[R];

export async function requirePermission<R extends Resource>(
  resource: R,
  action: Action<R>
) {
  const { workspace, role } = await getCurrentWorkspace();

  const allowedRoles = permissions[resource][action] as readonly Role[];

  if (!allowedRoles.includes(role)) {
    redirect("/dashboard");
  }

  return {
    workspace,
    role,
  };
}