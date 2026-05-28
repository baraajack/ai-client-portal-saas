import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/utils/slugify";

type BootstrapWorkspaceInput = {
  userId: string;
  email: string;
  workspaceName: string;
};

export async function bootstrapUserWorkspace(input: BootstrapWorkspaceInput) {
  const baseSlug = slugify(input.workspaceName);

  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.upsert({
      where: {
        id: input.userId,
      },
      update: {
        email: input.email,
      },
      create: {
        id: input.userId,
        email: input.email,
      },
    });

    const existingMembership = await tx.workspaceMember.findFirst({
      where: {
        userId: user.id,
      },
      include: {
        workspace: true,
      },
    });

    if (existingMembership) {
      return existingMembership.workspace;
    }

    let slug = baseSlug || "workspace";
    let counter = 1;

    while (
      await tx.workspace.findUnique({
        where: {
          slug,
        },
      })
    ) {
      slug = `${baseSlug}-${counter}`;
      counter += 1;
    }

    const workspace = await tx.workspace.create({
      data: {
        name: input.workspaceName,
        slug,
        members: {
          create: {
            userId: user.id,
            role: "ADMIN",
          },
        },
        auditLogs: {
          create: {
            action: "WORKSPACE_CREATED",
            entity: "Workspace",
            entityId: "pending",
            actorId: user.id,
          },
        },
      },
    });

    await tx.auditLog.updateMany({
      where: {
        workspaceId: workspace.id,
        entityId: "pending",
        action: "WORKSPACE_CREATED",
      },
      data: {
        entityId: workspace.id,
      },
    });

    return workspace;
  });
}