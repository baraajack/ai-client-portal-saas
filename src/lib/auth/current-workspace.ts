import { cache } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db/prisma";

export const getCurrentWorkspace = cache(async () => {
  const user = await getCurrentUser();

  const membership = await prisma.workspaceMember.findFirst({
    where: {
      userId: user.id,
    },
    include: {
      workspace: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (!membership) {
    redirect("/login");
  }

  return {
    workspace: membership.workspace,
    role: membership.role,
  };
});