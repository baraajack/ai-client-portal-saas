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
      <Button type="submit" variant="destructive" size="sm">
        <Trash2 className="mr-2 size-4" />
        Delete
      </Button>
    </form>
  );
}