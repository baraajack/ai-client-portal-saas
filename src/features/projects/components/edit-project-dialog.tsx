"use client";

import { Project, ProjectStatus } from "@prisma/client";
import { Pencil } from "lucide-react";
import { updateProjectAction } from "@/features/projects/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type EditProjectDialogProps = {
  project: Project;
  clients: {
    id: string;
    name: string;
  }[];
};

export function EditProjectDialog({ project, clients }: EditProjectDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 size-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit project</DialogTitle>
          <DialogDescription>Update project ownership, status, and delivery context.</DialogDescription>
        </DialogHeader>

        <form 
          action={async (formData) => {
            await updateProjectAction(project.id, formData);
          }}
          className="space-y-4"
        >
          <div className="space-y-2"><Label htmlFor={`project-name-${project.id}`}>Project name</Label><Input id={`project-name-${project.id}`} name="name" defaultValue={project.name} required /></div>
          <div className="space-y-2"><Label htmlFor={`project-description-${project.id}`}>Description</Label><Textarea
            id={`project-description-${project.id}`}
            name="description"
            defaultValue={project.description ?? ""}
          /></div>
          <div className="space-y-2"><Label htmlFor={`project-client-${project.id}`}>Client</Label>
          <select
            id={`project-client-${project.id}`}
            name="clientId"
            defaultValue={project.clientId ?? ""}
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-xs"
          >
              <option value="">No client</option>
              
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
          </select>
          </div>
          <div className="space-y-2"><Label>Status</Label>
          <Select name="status" defaultValue={project.status}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ProjectStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  {status.replaceAll("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          </div>

          <Button type="submit" className="w-full">
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
