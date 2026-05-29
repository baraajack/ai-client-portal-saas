import Link from "next/link";
import { Project, Client } from "@prisma/client";
import { ProjectStatusBadge } from "@/features/projects/components/project-status-badge";
import { DeleteProjectButton } from "@/features/projects/components/delete-project-button";
import { EditProjectDialog } from "@/features/projects/components/edit-project-dialog";
import { Button } from "@/components/ui/button";

type ProjectWithClient = Project & {
  client: Client | null;
  _count: {
    tasks: number;
    files: number;
  };
};

type ProjectsTableProps = {
  projects: ProjectWithClient[];
  clients: {
    id: string;
    name: string;
  }[];
};

export function ProjectsTable({ projects, clients }: ProjectsTableProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        No projects found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Project</th>
            <th className="px-4 py-3 text-left font-medium">Client</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-left font-medium">Tasks</th>
            <th className="px-4 py-3 text-left font-medium">Files</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-t">
              <td className="px-4 py-3 font-medium">{project.name}</td>
              <td className="px-4 py-3">{project.client?.name ?? "-"}</td>
              <td className="px-4 py-3">
                <ProjectStatusBadge status={project.status} />
              </td>
              <td className="px-4 py-3">{project._count.tasks}</td>
              <td className="px-4 py-3">{project._count.files}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/projects/${project.id}`}>View</Link>
                  </Button>

                  <EditProjectDialog project={project} clients={clients} />
                  <DeleteProjectButton projectId={project.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}