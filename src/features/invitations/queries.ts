import { prisma } from "@/lib/db/prisma";
import { requirePermission } from "@/lib/permissions/require-permission";

export async function getInvitations() {
  const { workspace } = await requirePermission("invitations", "view");

  return prisma.invitation.findMany({
    where: {
      workspaceId: workspace.id,
    },
    include: {
      invitedBy: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getInvitationByToken(token: string) {
  return prisma.invitation.findUnique({
    where: {
      token,
    },
    include: {
      workspace: true,
    },
  });
}