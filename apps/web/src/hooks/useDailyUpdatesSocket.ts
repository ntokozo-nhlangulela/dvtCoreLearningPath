"use client";

import { socket } from "@/lib/socket";
import { DailyUpdate } from "@/types/daily-update";
import { useEffect } from "react";

export default function useDailyUpdatesSocket(
  onDailyUpdate: (update: DailyUpdate) => void
) {
  useEffect(() => {
    const handleConnect = () => {
      console.log("🟢 Socket connected:", socket.id);
    };

    const handleDisconnect = () => {
      console.log("🔴 Socket disconnected");
    };

    const handleDailyUpdateCreated = (update: DailyUpdate) => {
      console.log("📥 Received daily-update-created:", update);
      onDailyUpdate(update);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("daily-update-created", handleDailyUpdateCreated);

    // If socket somehow isn't connected yet
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("daily-update-created", handleDailyUpdateCreated);
    };
  }, [onDailyUpdate]);
}