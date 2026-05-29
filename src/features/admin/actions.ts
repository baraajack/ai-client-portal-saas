"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import { assertPermission } from "@/lib/permissions/assert-permission";
import { safeAction } from "@/lib/actions/safe-action";
import { updateMemberRoleSchema } from "@/features/admin/schemas";

export async function updateMemberRoleAction(
  memberId: string,
  formData: FormData
) {
  return safeAction(async () => {
    const { workspace } = await assertPermission("admin", "view");

    const currentUser = await getCurrentUser();

    const parsed = updateMemberRoleSchema.safeParse({
      role: formData.get("role"),
    });

    if (!parsed.success) {
      throw new Error("Invalid role.");
    }

    const member = await prisma.workspaceMember.findFirst({
      where: {
        id: memberId,
        workspaceId: workspace.id,
      },
    });

    if (!member) {
      throw new Error("Member not found.");
    }

    if (member.userId === currentUser.id) {
      throw new Error("Cannot change your own role.");
    }

    const adminCount = await prisma.workspaceMember.count({
        where: {
            workspaceId: workspace.id,
            role: "ADMIN",
        },
    });
    
    if (
        member.role === "ADMIN" &&
        adminCount <= 1 &&
        parsed.data.role !== "ADMIN"
    ) {
        throw new Error(
            "Workspace must have at least one admin."
        );
    }

    await prisma.workspaceMember.update({
      where: {
        id: member.id,
      },
      data: {
        role: parsed.data.role,
      },
    });

    revalidatePath("/admin");
  });
}

export async function updateWorkspaceNameAction(
  formData: FormData
) {
  return safeAction(async () => {
    const { workspace } = await assertPermission("admin", "view");

    const name = String(formData.get("name"));

    if (!name.trim()) {
      throw new Error("Workspace name is required.");
    }

    await prisma.workspace.update({
      where: {
        id: workspace.id,
      },
      data: {
        name,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/dashboard");
  });
}