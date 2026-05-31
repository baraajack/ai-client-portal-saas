import Link from "next/link";
import { Project, Client } from "@prisma/client";
import { ProjectStatusBadge } from "@/features/projects/components/project-status-badge";
import { DeleteProjectButton } from "@/features/projects/components/delete-project-button";
import { EditProjectDialog } from "@/features/projects/components/edit-project-dialog";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, FolderKanban } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
  canMutate?: boolean;
};

export function ProjectsTable({
  projects,
  clients,
  canMutate = true,
}: ProjectsTableProps) {
  if (projects.length === 0) {
    return (
      <EmptyState icon={FolderKanban} title="No projects yet" description="Create a project to organize client delivery, tasks, and files." />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <Table>
        <TableHeader className="bg-muted/55">
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tasks</TableHead>
            <TableHead>Files</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell className="text-muted-foreground">{project.client?.name ?? "—"}</TableCell>
              <TableCell>
                <ProjectStatusBadge status={project.status} />
              </TableCell>
              <TableCell>{project._count.tasks}</TableCell>
              <TableCell>{project._count.files}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/projects/${project.id}`}>View <ArrowUpRight className="size-3.5" /></Link>
                  </Button>

                  {canMutate && (
                    <>
                      <EditProjectDialog project={project} clients={clients} />
                      <DeleteProjectButton projectId={project.id} />
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
