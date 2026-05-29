import { prisma } from "@/lib/db/prisma";
import { requirePermission } from "@/lib/permissions/require-permission";

export async function getTasks() {
  const { workspace } = await requirePermission("tasks", "view");

  return prisma.task.findMany({
    where: {
      project: {
        workspaceId: workspace.id,
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

  return prisma.task.findMany({
    where: {
      projectId,
      project: {
        workspaceId: workspace.id,
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