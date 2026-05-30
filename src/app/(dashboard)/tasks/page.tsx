import { getTasks } from "@/features/tasks/queries";
import { getAssignableMembers } from "@/features/rbac/queries";
import { getCurrentWorkspace } from "@/lib/auth/current-workspace";
import { TasksTable } from "@/features/tasks/components/tasks-table";

export default async function TasksPage() {
  const { role } = await getCurrentWorkspace();
  const canMutateTask = role !== "CLIENT";
  const [tasks, members] = await Promise.all([
    getTasks(),
    canMutateTask ? getAssignableMembers() : Promise.resolve([]),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tasks</h1>
        <p className="text-muted-foreground">
          Track work across all workspace projects.
        </p>
      </div>

      <TasksTable
        tasks={tasks}
        members={members}
        showProject
        canMutate={canMutateTask}
      />
    </div>
  );
}
