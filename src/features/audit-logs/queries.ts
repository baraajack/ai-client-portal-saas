import { prisma } from "@/lib/db/prisma";
import { requirePermission } from "@/lib/permissions/require-permission";

export async function getAuditLogs() {
  const { workspace } = await requirePermission("auditLogs", "view");

  return prisma.auditLog.findMany({
    where: {
      workspaceId: workspace.id,
    },
    include: {
      actor: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
  });
}

export async function getRecentAuditLogs(limit = 5) {
  const { workspace } = await requirePermission("auditLogs", "view");

  return prisma.auditLog.findMany({
    where: {
      workspaceId: workspace.id,
    },
    include: {
      actor: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
}
