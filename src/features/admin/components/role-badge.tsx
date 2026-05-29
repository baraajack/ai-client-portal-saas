import { Role } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

export function RoleBadge({ role }: { role: Role }) {
  return (
    <Badge variant="secondary">
      {role}
    </Badge>
  );
}