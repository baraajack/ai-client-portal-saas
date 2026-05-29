import { Role } from "@prisma/client";
import { z } from "zod";

export const createInvitationSchema = z.object({
  email: z.string().email(),
  role: z.nativeEnum(Role),
});