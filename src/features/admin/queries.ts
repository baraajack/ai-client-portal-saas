import { prisma } from "@/lib/db/prisma";
import { requirePermission } from "@/lib/permissions/require-permission";

export async function getWorkspaceMembers() {
  const { workspace } = await requirePermission("admin", "view");

  return prisma.workspaceMember.findMany({
    where: {
      workspaceId: workspace.id,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function getWorkspaceSettings() {
  const { workspace } = await requirePermission("admin", "view");

  return workspace;
}