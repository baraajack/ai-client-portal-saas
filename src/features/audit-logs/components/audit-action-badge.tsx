import { Badge } from "@/components/ui/badge";

export function AuditActionBadge({ action }: { action: string }) {
  const label = action
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return <Badge variant="secondary">{label}</Badge>;
}