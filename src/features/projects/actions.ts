"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { safeAction } from "@/lib/actions/safe-action";
import { assertPermission } from "@/lib/permissions/assert-permission";
import { projectSchema } from "@/features/projects/schemas";

export async function createProjectAction(formData: FormData) {
  return safeAction(async () => {
    const { workspace } = await assertPermission("projects", "create");

    const parsed = projectSchema.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      clientId: formData.get("clientId"),
      status: formData.get("status"),
    });

    if (!parsed.success) {
      throw new Error("Invalid project data.");
    }

    const project = await prisma.project.create({
      data: {
        workspaceId: workspace.id,
        name: parsed.data.name,
        description: parsed.data.description || null,
        clientId: parsed.data.clientId || null,
        status: parsed.data.status,
      },
    });

    await prisma.auditLog.create({
      data: {
        workspaceId: workspace.id,
        action: "PROJECT_CREATED",
        entity: "Project",
        entityId: project.id,
      },
    });

    revalidatePath("/projects");

    return project;
  });
}

export async function updateProjectAction(projectId: string, formData: FormData) {
  return safeAction(async () => {
    const { workspace } = await assertPermission("projects", "update");

    const parsed = projectSchema.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      clientId: formData.get("clientId"),
      status: formData.get("status"),
    });

    if (!parsed.success) {
      throw new Error("Invalid project data.");
    }

    const project = await prisma.project.update({
      where: {
        id_workspaceId: {
          id: projectId,
          workspaceId: workspace.id,
        },
      },
      data: {
        name: parsed.data.name,
        description: parsed.data.description || null,
        clientId: parsed.data.clientId || null,
        status: parsed.data.status,
      },
    });

    await prisma.auditLog.create({
      data: {
        workspaceId: workspace.id,
        action: "PROJECT_UPDATED",
        entity: "Project",
        entityId: project.id,
      },
    });

    revalidatePath("/projects");
    revalidatePath(`/projects/${project.id}`);

    return project;
  });
}

export async function deleteProjectAction(projectId: string) {
  return safeAction(async () => {
    const { workspace } = await assertPermission("projects", "delete");

    const project = await prisma.project.delete({
      where: {
        id_workspaceId: {
          id: projectId,
          workspaceId: workspace.id,
        },
      },
    });

    await prisma.auditLog.create({
      data: {
        workspaceId: workspace.id,
        action: "PROJECT_DELETED",
        entity: "Project",
        entityId: project.id,
      },
    });

    revalidatePath("/projects");

    return project;
  });
}