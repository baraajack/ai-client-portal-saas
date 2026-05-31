import { notFound } from "next/navigation";
import { getOptionalCurrentClient } from "@/lib/auth/current-client";
import { getCurrentWorkspace } from "@/lib/auth/current-workspace";
import { ClientProfileNotLinked } from "@/features/clients/components/client-profile-not-linked";
import { getProjectById } from "@/features/projects/queries";
import { ProjectStatusBadge } from "@/features/projects/components/project-status-badge";
import { getProjectTasks } from "@/features/tasks/queries";
import { getAssignableMembers } from "@/features/rbac/queries";
import { CreateTaskDialog } from "@/features/tasks/components/create-task-dialog";
import { TasksTable } from "@/features/tasks/components/tasks-table";
import { getProjectFiles } from "@/features/files/queries";
import { UploadFileForm } from "@/features/files/components/upload-file-form";
import { ProjectFilesList } from "@/features/files/components/project-files-list";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Files, ListTodo, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProjectDetailPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { projectId } = await params;
  const { role } = await getCurrentWorkspace();
  const client = await getOptionalCurrentClient();

  if (role === "CLIENT" && !client) {
    return <ClientProfileNotLinked />;
  }

  const project = await getProjectById(projectId);

  if (!project) {
    notFound();
  }

  const canMutate = role !== "CLIENT";
  const [tasks, members, files] = await Promise.all([
    getProjectTasks(projectId),
    canMutate ? getAssignableMembers() : Promise.resolve([]),
    getProjectFiles(projectId),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground">
          <Link href="/projects"><ArrowLeft className="size-4" /> Back to projects</Link>
        </Button>
      </div>

      <div className="rounded-lg border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Project workspace</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">{project.name}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {project.description || "No description provided."}
            </p>
          </div>

          <ProjectStatusBadge status={project.status} />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg border bg-muted/20 p-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-background text-muted-foreground"><UserRound className="size-4" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Client</p>
              <p className="mt-0.5 text-sm font-medium">{project.client?.name ?? "Unassigned"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border bg-muted/20 p-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-background text-muted-foreground"><CheckCircle2 className="size-4" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Tasks</p>
              <p className="mt-0.5 text-sm font-medium">{project.tasks.length}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border bg-muted/20 p-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-background text-muted-foreground"><Files className="size-4" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Files</p>
              <p className="mt-0.5 text-sm font-medium">{project.files.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
        <section className="rounded-lg border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><ListTodo className="size-4" /></div>
              <div>
              <h2 className="text-sm font-semibold">Project tasks</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Manage project work items and status.
              </p>
              </div>
            </div>
            
            {canMutate && (
              <CreateTaskDialog projectId={project.id} members={members} />
            )}
          </div>
          
          <TasksTable tasks={tasks} members={members} canMutate={canMutate} />
        </section>

        <section className="rounded-lg border bg-card p-5 shadow-sm">
          <div className="mb-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Files className="size-4" /></div>
              <div>
              <h2 className="text-sm font-semibold">Project files</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Upload and manage project documents.
              </p>
              </div>
            </div>
            
            {canMutate && <UploadFileForm projectId={project.id} />}
          </div>
          
          <ProjectFilesList files={files} canMutate={canMutate} />
        </section>
      </div>
    </div>
  );
}
