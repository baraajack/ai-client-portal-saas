"use client";

import { Pencil } from "lucide-react";
import { Task, TaskStatus, WorkspaceMember, User } from "@prisma/client";
import { updateTaskAction } from "@/features/tasks/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type MemberWithUser = WorkspaceMember & {
  user: User;
};

type EditTaskDialogProps = {
  task: Task;
  members: MemberWithUser[];
};

export function EditTaskDialog({ task, members }: EditTaskDialogProps) {
  const updateTaskWithId = updateTaskAction.bind(null, task.id);

  const dueDate = task.dueDate
    ? task.dueDate.toISOString().slice(0, 10)
    : "";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 size-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
        </DialogHeader>

        <form
          action={updateTaskWithId as unknown as (formData: FormData) => void}
          className="space-y-4"
        >
          <Input name="title" defaultValue={task.title} required />

          <Textarea
            name="description"
            defaultValue={task.description ?? ""}
          />

          <Select name="assignedToId" defaultValue={task.assignedToId ?? undefined}>
            <SelectTrigger>
              <SelectValue placeholder="Assign to" />
            </SelectTrigger>
            <SelectContent>
              {members.map((member) => (
                <SelectItem key={member.userId} value={member.userId}>
                  {member.user.fullName || member.user.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select name="status" defaultValue={task.status}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(TaskStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  {status.replaceAll("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input name="dueDate" type="date" defaultValue={dueDate} />

          <Button type="submit" className="w-full">
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}