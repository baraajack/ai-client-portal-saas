import { ProjectStatus } from "@prisma/client";
import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  description: z.string().optional(),
  clientId: z.string().optional().or(z.literal("")),
  status: z.nativeEnum(ProjectStatus),
});

export type ProjectInput = z.infer<typeof projectSchema>;