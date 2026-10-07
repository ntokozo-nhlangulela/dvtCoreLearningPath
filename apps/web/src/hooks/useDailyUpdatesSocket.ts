"use client";

import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { DailyUpdate } from "@/types/daily-update";

export function useDailyUpdatesSocket(
  sprintId: string | undefined,
  onDailyUpdate: (update: DailyUpdate) => void
) {
  useEffect(() => {
    const handler = (update: DailyUpdate) => {
      if (!sprintId || update.sprintId === sprintId) {
        onDailyUpdate(update);
      }
    };

    socket.on("daily-update-created", handler);

    return () => {
      socket.off("daily-update-created", handler);
    };
  }, [sprintId, onDailyUpdate]);
}