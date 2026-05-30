"use server";

import { getCurrentUser } from "@/lib/auth/current-user";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { safeAction } from "@/lib/actions/safe-action";
import { assertPermission } from "@/lib/permissions/assert-permission";
import { assertClientBelongsToWorkspace } from "@/lib/permissions/assert-workspace-relations";
import { projectSchema } from "@/features/projects/schemas";

export async function createProjectAction(formData: FormData) {
  return safeAction(async () => {
    const { workspace } = await assertPermission("projects", "create");
    const user = await getCurrentUser();

    const parsed = projectSchema.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      clientId: formData.get("clientId"),
      status: formData.get("status"),
    });

    if (!parsed.success) {
      throw new Error("Invalid project data.");
    }

    const clientId = parsed.data.clientId || null;
    await assertClientBelongsToWorkspace(clientId, workspace.id);

    const project = await prisma.$transaction(async (tx) => {
      const createdProject = await tx.project.create({
        data: {
          workspaceId: workspace.id,
          name: parsed.data.name,
          description: parsed.data.description || null,
          clientId,
          status: parsed.data.status,
        },
      });

      await tx.auditLog.create({
        data: {
          actorId: user.id,
          workspaceId: workspace.id,
          action: "PROJECT_CREATED",
          entity: "Project",
          entityId: createdProject.id,
        },
      });

      return createdProject;
    });

    revalidatePath("/projects");

    return project;
  });
}

export async function updateProjectAction(projectId: string, formData: FormData) {
  return safeAction(async () => {
    const { workspace } = await assertPermission("projects", "update");
    const user = await getCurrentUser();

    const parsed = projectSchema.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      clientId: formData.get("clientId"),
      status: formData.get("status"),
    });

    if (!parsed.success) {
      throw new Error("Invalid project data.");
    }

    const clientId = parsed.data.clientId || null;
    await assertClientBelongsToWorkspace(clientId, workspace.id);

    const project = await prisma.$transaction(async (tx) => {
      const updatedProject = await tx.project.update({
        where: {
          id_workspaceId: {
            id: projectId,
            workspaceId: workspace.id,
          },
        },
        data: {
          name: parsed.data.name,
          description: parsed.data.description || null,
          clientId,
          status: parsed.data.status,
        },
      });

      await tx.auditLog.create({
        data: {
          actorId: user.id,
          workspaceId: workspace.id,
          action: "PROJECT_UPDATED",
          entity: "Project",
          entityId: updatedProject.id,
        },
      });

      return updatedProject;
    });

    revalidatePath("/projects");
    revalidatePath(`/projects/${project.id}`);

    return project;
  });
}

export async function deleteProjectAction(projectId: string) {
  return safeAction(async () => {
    const { workspace } = await assertPermission("projects", "delete");
    const user = await getCurrentUser();

    const project = await prisma.$transaction(async (tx) => {
      const deletedProject = await tx.project.delete({
        where: {
          id_workspaceId: {
            id: projectId,
            workspaceId: workspace.id,
          },
        },
      });

      await tx.auditLog.create({
        data: {
          workspaceId: workspace.id,
          action: "PROJECT_DELETED",
          entity: "Project",
          entityId: deletedProject.id,
          actorId: user.id,
        },
      });

      return deletedProject;
    });

    revalidatePath("/projects");

    return project;
  });
}
