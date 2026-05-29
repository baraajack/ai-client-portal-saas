import { TaskStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

const labels: Record<TaskStatus, string> = {
  TODO: "To do",
  IN_PROGRESS: "In progress",
  REVIEW: "Review",
  DONE: "Done",
};

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return <Badge variant="secondary">{labels[status]}</Badge>;
}