import { getTasks } from "@/features/tasks/queries";
import { getAssignableMembers } from "@/features/rbac/queries";
import { getOptionalCurrentClient } from "@/lib/auth/current-client";
import { getCurrentWorkspace } from "@/lib/auth/current-workspace";
import { ClientProfileNotLinked } from "@/features/clients/components/client-profile-not-linked";
import { TasksTable } from "@/features/tasks/components/tasks-table";
import { PageHeader } from "@/components/ui/page-header";

export default async function TasksPage() {
  const { role } = await getCurrentWorkspace();
  const client = await getOptionalCurrentClient();

  if (role === "CLIENT" && !client) {
    return <ClientProfileNotLinked />;
  }

  const canMutateTask = role !== "CLIENT";
  const [tasks, members] = await Promise.all([
    getTasks(),
    canMutateTask ? getAssignableMembers() : Promise.resolve([]),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Delivery"
        title="Tasks"
        description="Track assignments, due dates, and progress across workspace projects."
      />

      <TasksTable
        tasks={tasks}
        members={members}
        showProject
        canMutate={canMutateTask}
      />
    </div>
  );
}
