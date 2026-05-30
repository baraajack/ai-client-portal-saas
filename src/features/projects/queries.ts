import { prisma } from "@/lib/db/prisma";
import { getCurrentClient } from "@/lib/auth/current-client";
import { requirePermission } from "@/lib/permissions/require-permission";

export async function getProjects() {
  const { workspace } = await requirePermission("projects", "view");
  const client = await getCurrentClient();

  return prisma.project.findMany({
    where: {
      workspaceId: workspace.id,
      ...(client ? { clientId: client.id } : {}),
    },
    include: {
      client: true,
      _count: {
        select: {
          tasks: true,
          files: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProjectById(projectId: string) {
  const { workspace } = await requirePermission("projects", "view");
  const client = await getCurrentClient();

  return prisma.project.findFirst({
    where: {
      id: projectId,
      workspaceId: workspace.id,
      ...(client ? { clientId: client.id } : {}),
    },
    include: {
      client: true,
      tasks: {
        orderBy: {
          createdAt: "desc",
        },
      },
      files: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}
