import { getClientsForProjectForm } from "@/features/clients/queries";
import { getProjects } from "@/features/projects/queries";
import { getOptionalCurrentClient } from "@/lib/auth/current-client";
import { getCurrentWorkspace } from "@/lib/auth/current-workspace";
import { ClientProfileNotLinked } from "@/features/clients/components/client-profile-not-linked";
import { CreateProjectDialog } from "@/features/projects/components/create-project-dialog";
import { ProjectsTable } from "@/features/projects/components/projects-table";

export default async function ProjectsPage() {
  const { role } = await getCurrentWorkspace();
  const client = await getOptionalCurrentClient();

  if (role === "CLIENT" && !client) {
    return <ClientProfileNotLinked />;
  }

  const canCreateProject = role === "ADMIN" || role === "MANAGER";
  const canMutateProject = role !== "CLIENT";
  const [projects, clients] = await Promise.all([
    getProjects(),
    canCreateProject ? getClientsForProjectForm() : Promise.resolve([]),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Manage projects, statuses, clients, tasks, and files.
          </p>
        </div>

        {canCreateProject && <CreateProjectDialog clients={clients} />}
      </div>

      <ProjectsTable
        projects={projects}
        clients={clients}
        canMutate={canMutateProject}
      />
    </div>
  );
}
