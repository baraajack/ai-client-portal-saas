import { prisma } from "@/lib/db/prisma";
import { getCurrentClient } from "@/lib/auth/current-client";
import { requirePermission } from "@/lib/permissions/require-permission";

export async function getTasks() {
  const { workspace } = await requirePermission("tasks", "view");
  const client = await getCurrentClient();

  return prisma.task.findMany({
    where: {
      project: {
        workspaceId: workspace.id,
        ...(client ? { clientId: client.id } : {}),
      },
    },
    include: {
      project: true,
      assignedTo: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProjectTasks(projectId: string) {
  const { workspace } = await requirePermission("projects", "view");
  const client = await getCurrentClient();

  return prisma.task.findMany({
    where: {
      projectId,
      project: {
        workspaceId: workspace.id,
        ...(client ? { clientId: client.id } : {}),
      },
    },
    include: {
      assignedTo: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
