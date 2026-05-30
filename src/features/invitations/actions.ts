"use server";

import { env } from "@/env";
import { sendInvitationEmail } from "@/features/invitations/email";
import crypto from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import { createClient } from "@/lib/supabase/server";
import { assertPermission } from "@/lib/permissions/assert-permission";
import { safeAction } from "@/lib/actions/safe-action";
import { createInvitationSchema } from "@/features/invitations/schemas";

function createInviteToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function createInvitationAction(formData: FormData) {
  return safeAction(async () => {
    const { workspace } = await assertPermission("invitations", "create");
    const user = await getCurrentUser();

    const parsed = createInvitationSchema.safeParse({
      email: formData.get("email"),
      role: formData.get("role"),
    });

    if (!parsed.success) {
      throw new Error("Invalid invitation data.");
    }

    const existingMember = await prisma.workspaceMember.findFirst({
      where: {
        workspaceId: workspace.id,
        user: {
          email: parsed.data.email,
        },
      },
    });

    if (existingMember) {
      throw new Error("User is already a member.");
    }

    const invitation = await prisma.$transaction(async (tx) => {
      const createdInvitation = await tx.invitation.create({
        data: {
          workspaceId: workspace.id,
          email: parsed.data.email.toLowerCase(),
          role: parsed.data.role,
          token: createInviteToken(),
          invitedById: user.id,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        },
      });

      await tx.auditLog.create({
        data: {
          workspaceId: workspace.id,
          action: "INVITATION_CREATED",
          entity: "Invitation",
          entityId: createdInvitation.id,
          actorId: user.id,
        },
      });

      return createdInvitation;
    });

    const inviteUrl =
      `${env.NEXT_PUBLIC_APP_URL}/invite/${invitation.token}`;

    try {
      await sendInvitationEmail({
        to: invitation.email,
        workspaceName: workspace.name,
        inviteUrl,
        role: invitation.role,
      });
    } catch (error) {
      console.error("Invitation email failed:", error);
    }

    revalidatePath("/admin");

    return invitation;
  });
}

export async function revokeInvitationAction(invitationId: string) {
  return safeAction(async () => {
    const { workspace } = await assertPermission("invitations", "revoke");
    const user = await getCurrentUser();

    const invitation = await prisma.invitation.findFirst({
      where: {
        id: invitationId,
        workspaceId: workspace.id,
        status: "PENDING",
      },
    });

    if (!invitation) {
      throw new Error("Invitation not found.");
    }

    await prisma.$transaction(async (tx) => {
      await tx.invitation.update({
        where: {
          id: invitation.id,
        },
        data: {
          status: "REVOKED",
        },
      });

      await tx.auditLog.create({
        data: {
          workspaceId: workspace.id,
          action: "INVITATION_REVOKED",
          entity: "Invitation",
          entityId: invitation.id,
          actorId: user.id,
        },
      });
    });

    revalidatePath("/admin");
  });
}

export async function acceptInvitationAction(token: string) {
  const supabase = await createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser?.email) {
    redirect(`/login?next=/invite/${token}`);
  }

  const invitation = await prisma.invitation.findUnique({
    where: {
      token,
    },
  });

  if (!invitation) {
    redirect("/dashboard");
  }

  if (invitation.status !== "PENDING") {
    redirect("/dashboard");
  }

  if (invitation.expiresAt < new Date()) {
    await prisma.invitation.update({
      where: {
        id: invitation.id,
      },
      data: {
        status: "EXPIRED",
      },
    });

    redirect("/dashboard");
  }

  if (authUser.email.toLowerCase() !== invitation.email.toLowerCase()) {
    redirect("/dashboard");
  }

  await prisma.$transaction(async (tx) => {
    await tx.user.upsert({
      where: {
        id: authUser.id,
      },
      update: {
        email: authUser.email!,
      },
      create: {
        id: authUser.id,
        email: authUser.email!,
      },
    });

    await tx.workspaceMember.upsert({
      where: {
        userId_workspaceId: {
          userId: authUser.id,
          workspaceId: invitation.workspaceId,
        },
      },
      update: {
        role: invitation.role,
      },
      create: {
        userId: authUser.id,
        workspaceId: invitation.workspaceId,
        role: invitation.role,
      },
    });

    if (invitation.role === "CLIENT") {
      const matchingClients = await tx.client.findMany({
        where: {
          workspaceId: invitation.workspaceId,
          email: {
            equals: authUser.email!,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          portalUserId: true,
        },
        take: 2,
      });

      if (
        matchingClients.length !== 1 ||
        (matchingClients[0].portalUserId &&
          matchingClients[0].portalUserId !== authUser.id)
      ) {
        throw new Error("Client profile could not be linked.");
      }

      await tx.client.update({
        where: {
          id: matchingClients[0].id,
        },
        data: {
          portalUserId: authUser.id,
        },
      });
    }

    await tx.invitation.update({
      where: {
        id: invitation.id,
      },
      data: {
        status: "ACCEPTED",
      },
    });

    await tx.auditLog.create({
      data: {
        workspaceId: invitation.workspaceId,
        action: "INVITATION_ACCEPTED",
        entity: "Invitation",
        entityId: invitation.id,
        actorId: authUser.id,
      },
    });
  });

  redirect("/dashboard");
}
