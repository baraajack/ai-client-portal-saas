import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { getCurrentWorkspace } from "@/lib/auth/current-workspace";
import { hasPermission } from "@/lib/permissions/has-permission";

export async function requireRole(requiredRole: Role) {
  const { workspace, role } = await getCurrentWorkspace();

  if (!hasPermission(role, requiredRole)) {
    redirect("/dashboard");
  }

  return {
    workspace,
    role,
  };
}