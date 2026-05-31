import { FileUpload } from "@prisma/client";
import { format } from "date-fns";
import { DeleteFileButton } from "@/features/files/components/delete-file-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

type ProjectFilesListProps = {
  files: FileUpload[];
  canMutate?: boolean;
};

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, index)).toFixed(1)} ${units[index]}`;
}

export function ProjectFilesList({
  files,
  canMutate = true,
}: ProjectFilesListProps) {
  if (files.length === 0) {
    return (
      <EmptyState compact icon={FileText} title="No files uploaded" description="Upload project documents and deliverables to keep the workspace organized." />
    );
  }

  return (
    <div className="divide-y rounded-lg border bg-card">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-muted/35"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-medium">{file.fileName}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {formatBytes(file.fileSize)} · {file.mimeType} · {format(file.createdAt, "MMM d, yyyy")}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={`/files/${file.id}`}><Download className="size-3.5" /> Open</Link>
            </Button>

            {canMutate && <DeleteFileButton fileId={file.id} />}
          </div>
        </div>
      ))}
    </div>
  );
}
