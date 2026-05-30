import { Task, User, Project, WorkspaceMember } from "@prisma/client";
import { format } from "date-fns";
import { TaskStatusBadge } from "@/features/tasks/components/task-status-badge";
import { EditTaskDialog } from "@/features/tasks/components/edit-task-dialog";
import { DeleteTaskButton } from "@/features/tasks/components/delete-task-button";

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
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        No tasks found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Task</th>
            {showProject && (
              <th className="px-4 py-3 text-left font-medium">Project</th>
            )}
            <th className="px-4 py-3 text-left font-medium">Assignee</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-left font-medium">Due date</th>
            {canMutate && (
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t">
              <td className="px-4 py-3">
                <p className="font-medium">{task.title}</p>
                {task.description && (
                  <p className="text-muted-foreground">{task.description}</p>
                )}
              </td>

              {showProject && (
                <td className="px-4 py-3">{task.project?.name ?? "-"}</td>
              )}

              <td className="px-4 py-3">
                {task.assignedTo?.fullName || task.assignedTo?.email || "-"}
              </td>

              <td className="px-4 py-3">
                <TaskStatusBadge status={task.status} />
              </td>

              <td className="px-4 py-3">
                {task.dueDate ? format(task.dueDate, "PPP") : "-"}
              </td>

              {canMutate && (
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <DeleteTaskButton taskId={task.id} />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
