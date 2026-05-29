"use client";

import { Trash2 } from "lucide-react";
import { deleteProjectFileAction } from "@/features/files/actions";
import { Button } from "@/components/ui/button";

export function DeleteFileButton({ fileId }: { fileId: string }) {
  const deleteWithFileId = deleteProjectFileAction.bind(
    null,
    fileId
  ) as unknown as (formData: FormData) => void;

  return (
    <form action={deleteWithFileId}>
      <Button type="submit" variant="destructive" size="sm">
        <Trash2 className="mr-2 size-4" />
        Delete
      </Button>
    </form>
  );
}