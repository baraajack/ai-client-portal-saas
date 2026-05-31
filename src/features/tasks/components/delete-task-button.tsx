"use client";

import { Trash2 } from "lucide-react";
import { deleteTaskAction } from "@/features/tasks/actions";
import { Button } from "@/components/ui/button";

type DeleteTaskButtonProps = {
  taskId: string;
};

export function DeleteTaskButton({ taskId }: DeleteTaskButtonProps) {
  const deleteTaskWithId = deleteTaskAction.bind(null, taskId) as unknown as (
    formData: FormData
  ) => void;

  return (
    <form action={deleteTaskWithId}>
      <Button type="submit" variant="destructive" size="icon-sm" aria-label="Delete task" title="Delete task">
        <Trash2 className="size-4" />
      </Button>
    </form>
  );
}
