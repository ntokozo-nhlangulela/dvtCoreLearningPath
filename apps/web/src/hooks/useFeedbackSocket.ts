import { socket } from "@/lib/socket";
import { Feedback } from "@/types/feedback";
import { useEffect } from "react";

export function useFeedbackSocket(
  dailyUpdateId: string,
  onFeedback: (feedback: Feedback) => void
) {
  useEffect(() => {
    const handler = (feedback: Feedback) => {
      if (feedback.dailyUpdateId === dailyUpdateId) {
        onFeedback(feedback);
      }
    };

    socket.on("feedback-added", handler);

    return () => {
      socket.off("feedback-added", handler);
    };
  }, [dailyUpdateId, onFeedback]);
}