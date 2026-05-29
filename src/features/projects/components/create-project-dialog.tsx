"use client";

import { ProjectStatus } from "@prisma/client";
import { Plus } from "lucide-react";
import { createProjectAction } from "@/features/projects/actions";
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
        </DialogHeader>

        <form
          action={createProjectAction as unknown as (formData: FormData) => void}
          className="space-y-4"
        >
          <Input name="name" placeholder="Project name" required />
          
          <Textarea name="description" placeholder="Description" />
          
          <select
            name="clientId"
            defaultValue=""
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          >
            <option value="">No client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          
          <select
            name="status"
            defaultValue={ProjectStatus.PLANNING}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          >
            {Object.values(ProjectStatus).map((status) => (
              <option key={status} value={status}>
                {status.replaceAll("_", " ")}
              </option>
           ))}
          </select>
          
          <Button type="submit" className="w-full">
            Create project
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}