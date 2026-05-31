import { Task, User, Project, WorkspaceMember } from "@prisma/client";
import { format } from "date-fns";
import { TaskStatusBadge } from "@/features/tasks/components/task-status-badge";
import { EditTaskDialog } from "@/features/tasks/components/edit-task-dialog";
import { DeleteTaskButton } from "@/features/tasks/components/delete-task-button";
import { ClipboardList } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type TaskWithRelations = Task & {
  project?: Project;
  assignedTo: User | null;
};

type MemberWithUser = WorkspaceMember & {
  user: User;
};

type TasksTableProps = {
  tasks: TaskWithRelations[];
  members: MemberWithUser[];
  showProject?: boolean;
  canMutate?: boolean;
};

export function TasksTable({
  tasks,
  members,
  showProject = false,
  canMutate = true,
}: TasksTableProps) {
  if (tasks.length === 0) {
    return (
      <EmptyState compact icon={ClipboardList} title="No tasks yet" description="Tasks will appear here as project work is planned and assigned." />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <Table>
        <TableHeader className="bg-muted/55">
          <TableRow>
            <TableHead>Task</TableHead>
            {showProject && (
              <TableHead>Project</TableHead>
            )}
            <TableHead>Assignee</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due date</TableHead>
            {canMutate && (
              <TableHead className="text-right">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <p className="font-medium">{task.title}</p>
                {task.description && (
                  <p className="mt-0.5 max-w-xs truncate text-xs text-muted-foreground">{task.description}</p>
                )}
              </TableCell>

              {showProject && (
                <TableCell className="text-muted-foreground">{task.project?.name ?? "—"}</TableCell>
              )}

              <TableCell className="text-muted-foreground">{task.assignedTo?.fullName || task.assignedTo?.email || "Unassigned"}</TableCell>

              <TableCell>
                <TaskStatusBadge status={task.status} />
              </TableCell>

              <TableCell className="text-muted-foreground">{task.dueDate ? format(task.dueDate, "MMM d, yyyy") : "—"}</TableCell>

              {canMutate && (
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <EditTaskDialog task={task} members={members} />
                    <DeleteTaskButton taskId={task.id} />
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
