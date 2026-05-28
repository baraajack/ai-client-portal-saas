import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { getCurrentWorkspace } from "@/lib/auth/current-workspace";

export async function requireWorkspaceRole(allowedRoles: Role[]) {
  const { workspace, role } = await getCurrentWorkspace();

  if (!allowedRoles.includes(role)) {
    redirect("/dashboard");
  }

  return {
    workspace,
    role,
  };
}