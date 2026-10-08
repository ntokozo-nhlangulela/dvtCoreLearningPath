"use client";

import { useCallback, useState } from "react";
import { DailyUpdate } from "@/types/daily-update";
import { DailyUpdateCard } from "./daily-update-card";
import { DailyUpdateModal } from "./daily-update-form";
import useDailyUpdatesSocket from "@/hooks/useDailyUpdatesSocket";


interface Props {
  sprintId: string;
  initialUpdates: DailyUpdate[];
}

export function SprintDailyUpdates({
  sprintId,
  initialUpdates,
}: Props) {
  const [updates, setUpdates] = useState(initialUpdates);

  const handleNewUpdate = useCallback(
    (newUpdate: DailyUpdate) => {
      if (newUpdate.sprintId !== sprintId) {
        return;
      }

      setUpdates((current) => {
        const exists = current.some(
          (u) => u.id === newUpdate.id
        );

        if (exists) {
          return current;
        }

        return [newUpdate, ...current];
      });
    },
    [sprintId]
  );

  useDailyUpdatesSocket(handleNewUpdate);

  return (
    <section className="lg:col-span-2 space-y-4 min-w-0 w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">Sprint Update History</h2>

        <DailyUpdateModal
          sprintId={sprintId}
          onUpdateCreated={handleNewUpdate}
        />
      </div>

      <div className="space-y-4 min-h-[220px] w-full">
        {updates.length > 0 ? (
          updates.map((update) => (
            <div
              key={update.id}
              className="w-full min-w-0">
              <DailyUpdateCard update={update} />
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500 bg-slate-50 p-6 rounded-xl border border-dashed text-center flex items-center justify-center h-full min-h-[220px] w-full">
                No daily updates logged for this sprint yet. Click the + icon above to add your first update.
              </p>
        )}
      </div>
    </section>
  );
}