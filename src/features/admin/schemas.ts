import { Role } from "@prisma/client";
import { z } from "zod";

export const updateMemberRoleSchema = z.object({
  role: z.nativeEnum(Role),
});

export const workspaceSettingsSchema = z.object({
  name: z.string().min(2).max(100),
});