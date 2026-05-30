"use server";

import { getCurrentUser } from "@/lib/auth/current-user";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { safeAction } from "@/lib/actions/safe-action";
import { assertPermission } from "@/lib/permissions/assert-permission";
import { clientSchema } from "@/features/clients/schemas";

export async function createClientAction(formData: FormData) {
  return safeAction(async () => {
    const { workspace } = await assertPermission("clients", "create");
    const user = await getCurrentUser();

    const parsed = clientSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      notes: formData.get("notes"),
    });

    if (!parsed.success) {
      throw new Error("Invalid client data.");
    }

    const client = await prisma.$transaction(async (tx) => {
      const createdClient = await tx.client.create({
        data: {
          workspaceId: workspace.id,
          name: parsed.data.name,
          email: parsed.data.email || null,
          company: parsed.data.company || null,
          notes: parsed.data.notes || null,
        },
      });

      await tx.auditLog.create({
        data: {
          actorId: user.id,
          workspaceId: workspace.id,
          action: "CLIENT_CREATED",
          entity: "Client",
          entityId: createdClient.id,
        },
      });

      return createdClient;
    });

    revalidatePath("/clients");

    return client;
  });
}

export async function updateClientAction(clientId: string, formData: FormData) {
  return safeAction(async () => {
    const { workspace } = await assertPermission("clients", "update");
    const user = await getCurrentUser();

    const parsed = clientSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      notes: formData.get("notes"),
    });

    if (!parsed.success) {
      throw new Error("Invalid client data.");
    }

    const client = await prisma.$transaction(async (tx) => {
      const updatedClient = await tx.client.update({
        where: {
          id: clientId,
          workspaceId: workspace.id,
        },
        data: {
          name: parsed.data.name,
          email: parsed.data.email || null,
          company: parsed.data.company || null,
          notes: parsed.data.notes || null,
        },
      });

      await tx.auditLog.create({
        data: {
          actorId: user.id,
          workspaceId: workspace.id,
          action: "CLIENT_UPDATED",
          entity: "Client",
          entityId: updatedClient.id,
        },
      });

      return updatedClient;
    });

    revalidatePath("/clients");

    return client;
  });
}

export async function deleteClientAction(clientId: string) {
  return safeAction(async () => {
    const { workspace } = await assertPermission("clients", "delete");
    const user = await getCurrentUser();

    const client = await prisma.$transaction(async (tx) => {
      const deletedClient = await tx.client.delete({
        where: {
          id: clientId,
          workspaceId: workspace.id,
        },
      });

      await tx.auditLog.create({
        data: {
          actorId: user.id,
          workspaceId: workspace.id,
          action: "CLIENT_DELETED",
          entity: "Client",
          entityId: deletedClient.id,
        },
      });

      return deletedClient;
    });

    revalidatePath("/clients");

    return client;
  });
}
