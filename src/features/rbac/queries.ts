import { prisma } from "@/lib/db/prisma";
import { requirePermission } from "@/lib/permissions/require-permission";

export async function getAssignableMembers() {
  const { workspace } = await requirePermission("tasks", "view");

  return prisma.workspaceMember.findMany({
    where: {
      workspaceId: workspace.id,
      role: {
        in: ["ADMIN", "MANAGER", "TEAM_MEMBER"],
      },
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}