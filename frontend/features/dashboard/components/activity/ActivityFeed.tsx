"use client";

import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui";
import ActivityItem from "./ActivityItem";

export interface Activity {
  id: number | string;
  title: string;
  time: string;
  category: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

export default function ActivityFeed({
  activities,
}: Readonly<ActivityFeedProps>) {
  return (
    <Card className="border-slate-200/80 bg-white shadow-xs">
      <CardHeader className="flex-row items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-base font-bold text-slate-900">Recent Updates</h2>

        <Clock className="h-4 w-4 text-slate-400" />
      </CardHeader>

      <CardContent className="space-y-1 pt-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityItem
              key={activity.id}
              title={activity.title}
              time={activity.time}
              category={activity.category}
            />
          ))
        ) : (
          <div className="flex h-40 items-center justify-center text-sm text-slate-400">
            No recent activity.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
