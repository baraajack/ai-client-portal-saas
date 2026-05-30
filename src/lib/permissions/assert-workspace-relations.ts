import { prisma } from "@/lib/db/prisma";
import { ForbiddenError } from "@/lib/permissions/errors";

export async function assertClientBelongsToWorkspace(
  clientId: string | null,
  workspaceId: string
) {
  if (!clientId) {
    return;
  }

  const client = await prisma.client.findFirst({
    where: {
      id: clientId,
      workspaceId,
    },
    select: {
      id: true,
    },
  });

  if (!client) {
    throw new ForbiddenError("Invalid client.");
  }
}

export async function assertAssigneeBelongsToWorkspace(
  assignedToId: string | null,
  workspaceId: string
) {
  if (!assignedToId) {
    return;
  }

  const member = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: assignedToId,
        workspaceId,
      },
    },
    select: {
      id: true,
    },
  });

  if (!member) {
    throw new ForbiddenError("Invalid assignee.");
  }
}
