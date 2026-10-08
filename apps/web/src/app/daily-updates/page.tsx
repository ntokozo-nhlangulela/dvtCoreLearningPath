"use client";

import { DailyUpdateModal } from "@/components/daily-update-form";
import { DailyUpdatesList } from "@/components/daily-updates-list";
import useDailyUpdatesSocket from "@/hooks/useDailyUpdatesSocket";
import { getDailyUpdates } from "@/lib/get-daily-updates";
import { DailyUpdate } from "@/types/daily-update";
import { useCallback, useEffect, useState } from "react";

export default function DailyUpdatesPage() {
  const [updates, setUpdates] = useState<DailyUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUpdates() {
      try {
        const data = await getDailyUpdates();

        console.log("Initial updates:", data);

        setUpdates(data);
      } catch (error) {
        console.error("Failed to load updates:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUpdates();
  }, []);

  const handleNewUpdate = useCallback(
    (newUpdate: DailyUpdate) => {
      console.log("Adding update to state:", newUpdate);

      setUpdates((current) => {
        const exists = current.some(
          (update) => update.id === newUpdate.id
        );

        if (exists) {
          return current;
        }

        return [newUpdate, ...current];
      });
    },
    []
  );

  useDailyUpdatesSocket(handleNewUpdate);

  if (loading) {
    return <div className="p-6">Loading updates...</div>;
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Daily Updates
      </h1>

      <DailyUpdateModal
        onUpdateCreated={handleNewUpdate}
      />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Update History
        </h2>

        <DailyUpdatesList updates={updates} />
      </section>
    </main>
  );
}