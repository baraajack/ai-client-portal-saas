import { FileUpload } from "@prisma/client";
import { format } from "date-fns";
import { DeleteFileButton } from "@/features/files/components/delete-file-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">
        No files uploaded.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between gap-4 rounded-lg border p-4"
        >
          <div>
            <p className="font-medium">{file.fileName}</p>
            <p className="text-sm text-muted-foreground">
              {formatBytes(file.fileSize)} · {file.mimeType} ·{" "}
              {format(file.createdAt, "PPP")}
            </p>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={`/files/${file.id}`}>Open</Link>
            </Button>

            {canMutate && <DeleteFileButton fileId={file.id} />}
          </div>
        </div>
      ))}
    </div>
  );
}
