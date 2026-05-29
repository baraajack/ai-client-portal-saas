import { getClientsForProjectForm } from "@/features/clients/queries";
import { getProjects } from "@/features/projects/queries";
import { CreateProjectDialog } from "@/features/projects/components/create-project-dialog";
import { ProjectsTable } from "@/features/projects/components/projects-table";

export default async function ProjectsPage() {
  const [projects, clients] = await Promise.all([
    getProjects(),
    getClientsForProjectForm(),
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

        <CreateProjectDialog clients={clients} />
      </div>

      <ProjectsTable projects={projects} clients={clients} />
    </div>
  );
}