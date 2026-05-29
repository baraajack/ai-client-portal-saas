import { TaskStatus } from "@prisma/client";
import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(2, "Task title must be at least 2 characters"),
  description: z.string().optional(),
  assignedToId: z.string().optional().or(z.literal("")),
  status: z.nativeEnum(TaskStatus),
  dueDate: z.string().optional().or(z.literal("")),
});

export type TaskInput = z.infer<typeof taskSchema>;