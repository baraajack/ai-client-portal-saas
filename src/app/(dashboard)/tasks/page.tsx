import { getTasks } from "@/features/tasks/queries";
import { getAssignableMembers } from "@/features/rbac/queries";
import { TasksTable } from "@/features/tasks/components/tasks-table";

export default async function TasksPage() {
  const [tasks, members] = await Promise.all([
    getTasks(),
    getAssignableMembers(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tasks</h1>
        <p className="text-muted-foreground">
          Track work across all workspace projects.
        </p>
      </div>

      <TasksTable tasks={tasks} members={members} showProject />
    </div>
  );
}