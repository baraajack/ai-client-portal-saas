import { getActivityFeed } from "../queries";

export async function ActivityFeed() {
  const activities = await getActivityFeed();

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="rounded-lg border p-4"
        >
          <p className="text-sm">
            <span className="font-medium">
              {activity.actor}
            </span>{" "}
            {activity.text}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            {activity.time}
          </p>
        </div>
      ))}

      {activities.length === 0 && (
        <div className="rounded-lg border p-4 text-sm text-muted-foreground">
          No recent activity.
        </div>
      )}
    </div>
  );
}