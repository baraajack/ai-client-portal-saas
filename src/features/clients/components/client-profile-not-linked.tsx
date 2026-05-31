import { Link2Off } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export function ClientProfileNotLinked() {
  return (
    <EmptyState
      icon={Link2Off}
      title="Client profile not linked"
      description="Your client profile is not linked yet. Please contact your workspace admin."
    />
  );
}
