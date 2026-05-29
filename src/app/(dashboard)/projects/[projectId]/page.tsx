import { notFound } from "next/navigation";
import { getProjectById } from "@/features/projects/queries";
import { ProjectStatusBadge } from "@/features/projects/components/project-status-badge";

type ProjectDetailPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { projectId } = await params;

  const project = await getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <p className="mt-2 text-muted-foreground">
              {project.description || "No description provided."}
            </p>
          </div>

          <ProjectStatusBadge status={project.status} />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Client</p>
            <p className="font-medium">{project.client?.name ?? "-"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Tasks</p>
            <p className="font-medium">{project.tasks.length}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Files</p>
            <p className="font-medium">{project.files.length}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border p-6">
          <h2 className="font-semibold">Tasks</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Task management will be added in the next phase.
          </p>
        </section>

        <section className="rounded-lg border p-6">
          <h2 className="font-semibold">Files</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            File uploads will be added after task management.
          </p>
        </section>
      </div>
    </div>
  );
}