"use client";

import { ProjectStatus } from "@prisma/client";
import { Plus } from "lucide-react";
import { createProjectAction } from "@/features/projects/actions";
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

type CreateProjectDialogProps = {
  clients: {
    id: string;
    name: string;
  }[];
};

export function CreateProjectDialog({ clients }: CreateProjectDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          New project
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>Set up a delivery workspace for tasks, files, and client collaboration.</DialogDescription>
        </DialogHeader>

        <form
          action={createProjectAction as unknown as (formData: FormData) => void}
          className="space-y-4"
        >
          <div className="space-y-2"><Label htmlFor="project-name">Project name</Label><Input id="project-name" name="name" placeholder="Website redesign" required /></div>
          <div className="space-y-2"><Label htmlFor="project-description">Description</Label><Textarea id="project-description" name="description" placeholder="Add a concise project brief." /></div>
          <div className="space-y-2">
          <Label htmlFor="project-client">Client</Label>
          <select
            id="project-client"
            name="clientId"
            defaultValue=""
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
          <div className="space-y-2">
          <Label htmlFor="project-status">Status</Label>
          <select
            id="project-status"
            name="status"
            defaultValue={ProjectStatus.PLANNING}
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-xs"
          >
            {Object.values(ProjectStatus).map((status) => (
              <option key={status} value={status}>
                {status.replaceAll("_", " ")}
              </option>
           ))}
          </select>
          </div>
          <Button type="submit" className="w-full">
            Create project
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
