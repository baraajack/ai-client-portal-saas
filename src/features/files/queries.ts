import { prisma } from "@/lib/db/prisma";
import { requirePermission } from "@/lib/permissions/require-permission";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { FILE_BUCKET } from "@/features/files/constants";

export async function getProjectFiles(projectId: string) {
  const { workspace } = await requirePermission("files", "view");

  return prisma.fileUpload.findMany({
    where: {
      projectId,
      project: {
        workspaceId: workspace.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getSignedFileUrl(fileId: string) {
  const { workspace } = await requirePermission("files", "view");

  const file = await prisma.fileUpload.findFirst({
    where: {
      id: fileId,
      project: {
        workspaceId: workspace.id,
      },
    },
  });

  if (!file) {
    throw new Error("File not found.");
  }

  const { data, error } = await supabaseAdmin.storage
    .from(FILE_BUCKET)
    .createSignedUrl(file.filePath, 60);

  if (error || !data?.signedUrl) {
    throw new Error("Could not create signed URL.");
  }

  return data.signedUrl;
}