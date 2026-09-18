import { DailyUpdate } from "@/types/daily-update";
import { FeedbackForm } from "./feedback-form";

interface Props {
  update: DailyUpdate;
}

export function DailyUpdateCard({ update }: Props) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-semibold">
        Daily Update
      </h3>

      <div className="mt-2">
        <strong>Completed Work</strong>
        <p>{update.completedWork}</p>
      </div>

      <div className="mt-2">
        <strong>Next Focus</strong>
        <p>{update.nextFocus}</p>
      </div>

      {update.blockers && (
        <div className="mt-2">
          <strong>Blockers</strong>
          <p>{update.blockers}</p>
        </div>
      )}

      {/* Feedback Section */}
      <div className="border-t pt-3 mt-3">
        <h4 className="font-medium text-sm">Feedback</h4>
        {update.feedback && update.feedback.length > 0 ? (
          <ul className="space-y-2 mt-2">
            {update.feedback.map((fb) => (
              <li key={fb.id} className="bg-gray-50 p-2 rounded text-sm border">
                {fb.comment}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 mt-1">No feedback yet.</p>
        )}

        <FeedbackForm dailyUpdateId={update.id} />
      </div>
    </div>
  );
}