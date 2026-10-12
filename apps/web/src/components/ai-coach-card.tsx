"use client";

interface Props {
  feedback: string;
}

export function AiCoachCard({
  feedback,
}: Props) {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
      <h3 className="font-semibold text-blue-900">
        🤖 AI Coach
      </h3>

      <div className="mt-3 whitespace-pre-wrap text-sm text-slate-700">
        {feedback}
      </div>
    </div>
  );
}