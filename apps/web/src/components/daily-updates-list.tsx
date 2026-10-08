"use client";

import { DailyUpdate } from "@/types/daily-update";
import { DailyUpdateCard } from "./daily-update-card";

interface Props {
  updates: DailyUpdate[];
  onUpdateCreated?: (update: DailyUpdate) => void;
}

export function DailyUpdatesList({ updates }: Props) {
  return (
    <div className="space-y-4">
      {updates.length > 0 ? (
        updates.map((update) => (
          <DailyUpdateCard key={update.id} update={update} />
        ))
      ) : (
        <p className="text-sm text-slate-500">No updates found.</p>
      )}
    </div>
  );
}
