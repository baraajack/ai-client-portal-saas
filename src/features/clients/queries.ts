import { prisma } from "@/lib/db/prisma";
import { requirePermission } from "@/lib/permissions/require-permission";

export async function getClients() {
  const { workspace } = await requirePermission("clients", "view");

  return prisma.client.findMany({
    where: {
      workspaceId: workspace.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getClientsForProjectForm() {
  const { workspace } = await requirePermission("projects", "create");

  return prisma.client.findMany({
    where: {
      workspaceId: workspace.id,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}
