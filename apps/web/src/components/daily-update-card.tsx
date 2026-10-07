"use client";
import { DailyUpdate } from "@/types/daily-update";
import { FeedbackForm } from "./feedback-form";
import { useFeedbackSocket } from "@/hooks/useFeedbackSocket";
import { useCallback, useState } from "react";
import { Feedback } from "@/types/feedback";

interface Props {
  update: DailyUpdate;
}

export function DailyUpdateCard({ update }: Props) {
const [feedback, setFeedback] = useState(update.feedback ?? []);

  const handleFeedback = useCallback(
    (newFeedback: Feedback) => {
      setFeedback((current) => {
        const exists = current.some(
          (item) => item.id === newFeedback.id
        );

        if (exists) {
          return current;
        }

        return [...current, newFeedback];
      });
    },
    []
  );

  useFeedbackSocket(update.id, handleFeedback);
  

  return (
    <div className="rounded-lg border p-4 border-b-2 shadow-sm bg-white">
      <h3 className="font-semibold text-slate-700 text-center">
        Daily Update
      </h3>

      <div className="mt-2 text-slate-700">
        <strong>Completed Work</strong>
        <p>{update.completedWork}</p>
      </div>

      <div className="mt-2 text-slate-700">
        <strong>Next Focus</strong>
        <p>{update.nextFocus}</p>
      </div>

      {update.blockers && (
        <div className="mt-2 text-slate-700">
          <strong>Blockers</strong>
          <p>{update.blockers}</p>
        </div>
      )}

      {/* Feedback Section */}
      <div className="border-t pt-3 mt-3 border-slate-600">
        <h4 className="font-medium text-sm text-slate-700">Feedback</h4>
        {feedback.length > 0 ? (
          <ul className="space-y-2 mt-2">
            {feedback.map((fb) => (
              <li
                key={fb.id}
                className="p-2 text-sm text-slate-600"
              >
                - {fb.comment}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 mt-1">
            No feedback yet.
          </p>
        )}

        <FeedbackForm dailyUpdateId={update.id} />
      </div>
    </div>
  );
}