import { ProjectStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

const statusLabels: Record<ProjectStatus, string> = {
  PLANNING: "Planning",
  ACTIVE: "Active",
  ON_HOLD: "On hold",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  return <Badge variant="secondary">{statusLabels[status]}</Badge>;
}