"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { safeAction } from "@/lib/actions/safe-action";
import { assertPermission } from "@/lib/permissions/assert-permission";
import {
  ALLOWED_MIME_TYPES,
  FILE_BUCKET,
  MAX_FILE_SIZE,
} from "@/features/files/constants";

function sanitizeFileName(fileName: string) {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-");
}

export async function uploadProjectFileAction(
  projectId: string,
  formData: FormData
) {
  return safeAction(async () => {
    const { workspace } = await assertPermission("files", "upload");
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

    const file = formData.get("file");

    if (!(file instanceof File)) {
      throw new Error("File is required.");
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File exceeds maximum size.");
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type as never)) {
      throw new Error("File type is not allowed.");
    }

    const safeName = sanitizeFileName(file.name);
    const filePath = `${workspace.id}/${project.id}/${crypto.randomUUID()}-${safeName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from(FILE_BUCKET)
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      throw new Error("File upload failed.");
    }

    const uploadedFile = await prisma.fileUpload.create({
      data: {
        projectId: project.id,
        fileName: file.name,
        filePath,
        fileSize: file.size,
        mimeType: file.type,
        uploadedById: user.id,
      },
    });

    await prisma.auditLog.create({
      data: {
        workspaceId: workspace.id,
        action: "FILE_UPLOADED",
        entity: "FileUpload",
        entityId: uploadedFile.id,
        actorId: user.id,
      },
    });

    revalidatePath("/files");
    revalidatePath(`/projects/${project.id}`);

    return uploadedFile;
  });
}

export async function deleteProjectFileAction(fileId: string) {
  return safeAction(async () => {
    const { workspace } = await assertPermission("files", "delete");
    const user = await getCurrentUser();

    const file = await prisma.fileUpload.findFirst({
      where: {
        id: fileId,
        project: {
          workspaceId: workspace.id,
        },
      },
      include: {
        project: true,
      },
    });

    if (!file) {
      throw new Error("File not found.");
    }

    await supabaseAdmin.storage.from(FILE_BUCKET).remove([file.filePath]);

    await prisma.fileUpload.delete({
      where: {
        id_projectId: {
          id: file.id,
          projectId: file.projectId,
        },
      },
    });

    await prisma.auditLog.create({
      data: {
        workspaceId: workspace.id,
        action: "FILE_DELETED",
        entity: "FileUpload",
        entityId: file.id,
        actorId: user.id,
      },
    });

    revalidatePath("/files");
    revalidatePath(`/projects/${file.projectId}`);

    return file;
  });
}