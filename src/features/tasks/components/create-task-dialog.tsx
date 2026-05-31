"use client";

import { Plus } from "lucide-react";
import { TaskStatus, WorkspaceMember, User } from "@prisma/client";
import { createTaskAction } from "@/features/tasks/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

type CreateTaskDialogProps = {
  projectId: string;
  members: MemberWithUser[];
};

export function CreateTaskDialog({ projectId, members }: CreateTaskDialogProps) {
  const createTaskWithProject = createTaskAction.bind(
    null,
    projectId
  ) as unknown as (formData: FormData) => void;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          New task
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create task</DialogTitle>
          <DialogDescription>Add a work item, assign ownership, and set delivery timing.</DialogDescription>
        </DialogHeader>

        <form action={createTaskWithProject} className="space-y-4">
          <div className="space-y-2"><Label htmlFor="task-title">Task title</Label><Input id="task-title" name="title" placeholder="Prepare review draft" required /></div>
          <div className="space-y-2"><Label htmlFor="task-description">Description</Label><Textarea id="task-description" name="description" placeholder="Add task details or acceptance notes." /></div>
          <div className="space-y-2"><Label>Assignee</Label>
          <Select name="assignedToId">
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
          </div>
          <div className="space-y-2"><Label>Status</Label>
          <Select name="status" defaultValue={TaskStatus.TODO}>
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
          </div>
          <div className="space-y-2"><Label htmlFor="task-due-date">Due date</Label><Input id="task-due-date" name="dueDate" type="date" /></div>

          <Button type="submit" className="w-full">
            Create task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
