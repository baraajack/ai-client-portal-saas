export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 border-b pb-5">
        <div className="h-7 w-52 animate-pulse rounded bg-muted" />
        <div className="h-4 w-80 max-w-full animate-pulse rounded bg-muted" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-28 animate-pulse rounded-lg border bg-card" />
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-lg border bg-card" />
    </div>
  );
}
