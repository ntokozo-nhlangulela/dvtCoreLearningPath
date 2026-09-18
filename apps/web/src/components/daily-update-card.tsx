import { DailyUpdate } from "@/types/daily-update";

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
    </div>
  );
}