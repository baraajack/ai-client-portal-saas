import { notFound } from "next/navigation";
import { getCurrentWorkspace } from "@/lib/auth/current-workspace";
import { getProjectById } from "@/features/projects/queries";
import { ProjectStatusBadge } from "@/features/projects/components/project-status-badge";
import { getProjectTasks } from "@/features/tasks/queries";
import { getAssignableMembers } from "@/features/rbac/queries";
import { CreateTaskDialog } from "@/features/tasks/components/create-task-dialog";
import { TasksTable } from "@/features/tasks/components/tasks-table";
import { getProjectFiles } from "@/features/files/queries";
import { UploadFileForm } from "@/features/files/components/upload-file-form";
import { ProjectFilesList } from "@/features/files/components/project-files-list";

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

  const { role } = await getCurrentWorkspace();
  const canMutate = role !== "CLIENT";
  const [tasks, members, files] = await Promise.all([
    getProjectTasks(projectId),
    canMutate ? getAssignableMembers() : Promise.resolve([]),
    getProjectFiles(projectId),
  ]);

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
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold">Tasks</h2>
              <p className="text-sm text-muted-foreground">
                Manage project work items and status.
              </p>
            </div>
            
            {canMutate && (
              <CreateTaskDialog projectId={project.id} members={members} />
            )}
          </div>
          
          <TasksTable tasks={tasks} members={members} canMutate={canMutate} />
        </section>

        <section className="rounded-lg border p-6">
          <div className="mb-4 space-y-4">
            <div>
              <h2 className="font-semibold">Files</h2>
              <p className="text-sm text-muted-foreground">
                Upload and manage project documents.
              </p>
            </div>
            
            {canMutate && <UploadFileForm projectId={project.id} />}
          </div>
          
          <ProjectFilesList files={files} canMutate={canMutate} />
        </section>
      </div>
    </div>
  );
}
