"use server";

import { getCurrentUser } from "@/lib/auth/current-user";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { safeAction } from "@/lib/actions/safe-action";
import { assertPermission } from "@/lib/permissions/assert-permission";
import { taskSchema } from "@/features/tasks/schemas";

function parseDueDate(value?: string) {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export async function createTaskAction(projectId: string, formData: FormData) {
  return safeAction(async () => {
    const { workspace } = await assertPermission("tasks", "create");
    const user = await getCurrentUser();

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        workspaceId: workspace.id,
      },
    });

    if (!project) {
      throw new Error("Project not found.");
    }

    const parsed = taskSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      assignedToId: formData.get("assignedToId"),
      status: formData.get("status"),
      dueDate: formData.get("dueDate"),
    });

    if (!parsed.success) {
      throw new Error("Invalid task data.");
    }

    const task = await prisma.task.create({
      data: {
        projectId: project.id,
        title: parsed.data.title,
        description: parsed.data.description || null,
        assignedToId: parsed.data.assignedToId || null,
        status: parsed.data.status,
        dueDate: parseDueDate(parsed.data.dueDate),
      },
    });

    await prisma.auditLog.create({
      data: {
        workspaceId: workspace.id,
        action: "TASK_CREATED",
        entity: "Task",
        entityId: task.id,
      },
    });

    revalidatePath("/tasks");
    revalidatePath(`/projects/${project.id}`);

    return task;
  });
}

export async function updateTaskAction(taskId: string, formData: FormData) {
  return safeAction(async () => {
    const { workspace } = await assertPermission("tasks", "update");
    const user = await getCurrentUser();

    const existingTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        project: {
          workspaceId: workspace.id,
        },
      },
      include: {
        project: true,
      },
    });

    if (!existingTask) {
      throw new Error("Task not found.");
    }

    const parsed = taskSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      assignedToId: formData.get("assignedToId"),
      status: formData.get("status"),
      dueDate: formData.get("dueDate"),
    });

    if (!parsed.success) {
      throw new Error("Invalid task data.");
    }

    const task = await prisma.task.update({
      where: {
        id_projectId: {
          id: taskId,
          projectId: existingTask.projectId,
        },
      },
      data: {
        title: parsed.data.title,
        description: parsed.data.description || null,
        assignedToId: parsed.data.assignedToId || null,
        status: parsed.data.status,
        dueDate: parseDueDate(parsed.data.dueDate),
      },
    });

    await prisma.auditLog.create({
      data: {
        workspaceId: workspace.id,
        action: "TASK_UPDATED",
        entity: "Task",
        entityId: task.id,
        actorId: user.id,
      },
    });

    revalidatePath("/tasks");
    revalidatePath(`/projects/${existingTask.projectId}`);

    return task;
  });
}

export async function deleteTaskAction(taskId: string) {
  return safeAction(async () => {
    const { workspace } = await assertPermission("tasks", "delete");
    const user = await getCurrentUser();

    const existingTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        project: {
          workspaceId: workspace.id,
        },
      },
    });

    if (!existingTask) {
      throw new Error("Task not found.");
    }

    const task = await prisma.task.delete({
      where: {
        id_projectId: {
          id: taskId,
          projectId: existingTask.projectId,
        },
      },
    });

    await prisma.auditLog.create({
      data: {
        workspaceId: workspace.id,
        action: "TASK_DELETED",
        entity: "Task",
        entityId: task.id,
        actorId: user.id,
      },
    });

    revalidatePath("/tasks");
    revalidatePath(`/projects/${existingTask.projectId}`);

    return task;
  });
}