"use client";

import { Trash2 } from "lucide-react";
import { deleteProjectAction } from "@/features/projects/actions";
import { Button } from "@/components/ui/button";

type DeleteProjectButtonProps = {
  projectId: string;
};

export function DeleteProjectButton({ projectId }: DeleteProjectButtonProps) {
  return (
    <form
      action={async () => {
        await deleteProjectAction(projectId);
      }}
    >
      <Button type="submit" variant="destructive" size="sm">
        <Trash2 className="mr-2 size-4" />
        Delete
      </Button>
    </form>
  );
}