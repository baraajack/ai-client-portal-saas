import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  compact?: boolean;
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 text-center ${
        compact ? "px-5 py-8" : "px-6 py-12"
      }`}
    >
      <div className="flex size-10 items-center justify-center rounded-lg border bg-background text-muted-foreground shadow-sm">
        <Icon className="size-5" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
