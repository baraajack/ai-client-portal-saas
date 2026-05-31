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
      <Button type="submit" variant="destructive" size="icon-sm" aria-label="Delete project" title="Delete project">
        <Trash2 className="size-4" />
      </Button>
    </form>
  );
}
