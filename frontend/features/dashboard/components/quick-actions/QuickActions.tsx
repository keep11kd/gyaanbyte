"use client";

import { Zap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui";
import QuickActionButton, { type QuickActionItem } from "./QuickActionButton";

interface QuickActionsProps {
  actions: QuickActionItem[];
}

export default function QuickActions({
  actions,
}: Readonly<QuickActionsProps>) {
  return (
    <Card className="border-slate-200/80 bg-white shadow-xs">
      <CardHeader className="flex-row items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Quick Actions</h2>
          <p className="mt-1 text-xs text-slate-500">
            Frequently used administrative shortcuts
          </p>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 border border-amber-100">
          <Zap className="h-4 w-4" />
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {actions.map((action) => (
            <QuickActionButton key={action.id} action={action} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
