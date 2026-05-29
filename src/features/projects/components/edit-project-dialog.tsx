"use client";

import { Project, ProjectStatus } from "@prisma/client";
import { Pencil } from "lucide-react";
import { updateProjectAction } from "@/features/projects/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
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
  const updateProjectWithId = updateProjectAction.bind(null, project.id);

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
        </DialogHeader>

        <form 
          action={async (formData) => {
            await updateProjectAction(project.id, formData);
          }}
          className="space-y-4"
        >
          <Input name="name" defaultValue={project.name} required />

          <Textarea
            name="description"
            defaultValue={project.description ?? ""}
          />

          
          <select
            name="clientId"
            defaultValue={project.clientId ?? ""}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          >
              <option value="">No client</option>
              
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
          </select>
          
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

          <Button type="submit" className="w-full">
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}