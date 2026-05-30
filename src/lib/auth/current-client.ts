import { cache } from "react";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import { getCurrentWorkspace } from "@/lib/auth/current-workspace";
import { ForbiddenError } from "@/lib/permissions/errors";

export const getOptionalCurrentClient = cache(async () => {
  const { workspace, role } = await getCurrentWorkspace();

  if (role !== "CLIENT") {
    return null;
  }

  const user = await getCurrentUser();
  const client = await prisma.client.findUnique({
    where: {
      workspaceId_portalUserId: {
        workspaceId: workspace.id,
        portalUserId: user.id,
      },
    },
    select: {
      id: true,
    },
  });

  return client;
});

export const getCurrentClient = cache(async () => {
  const { role } = await getCurrentWorkspace();
  const client = await getOptionalCurrentClient();

  if (role === "CLIENT" && !client) {
    throw new ForbiddenError("Client profile is not linked.");
  }

  return client;
});
