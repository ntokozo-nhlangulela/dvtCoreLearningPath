"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  dailyUpdateId: string;
}

export function FeedbackForm({ dailyUpdateId }: Props) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [generatingAi, setGeneratingAi] = useState(false);

  // Ask AI to draft mentor feedback based on context
  const handleDraftWithAi = async () => {
    setGeneratingAi(true);
    try {
      const res = await fetch("http://localhost:4000/api/ai-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completedWork: "Reviewing daily update item for feedback suggestion",
          nextFocus: "Providing constructive mentorship",
        }),
      });
      const data = await res.json();
      // Extract or set structured AI suggestion into the comment box
      setComment(`AI Suggestion / Review:\n${data.feedback}`);
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingAi(false);
    }
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`http://localhost:4000/api/daily-updates/${dailyUpdateId}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
      });

      if (!res.ok) throw new Error("Failed to post feedback");

      setComment("");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Could not submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-3 space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-xs font-medium text-slate-600">Add Mentor Feedback</label>
        <button
          type="button"
          onClick={handleDraftWithAi}
          disabled={generatingAi}
          className="text-[11px] text-blue-600 hover:underline font-medium"
        >
          {generatingAi ? "Generating..." : "✨ Draft with AI"}
        </button>
      </div>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add feedback..."
        className="border rounded p-2 w-full text-sm  text-slate-600 placeholder:text-slate-500 focus:ring-2 focus:ring-border-slate-700 focus:outline-none"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-slate-700 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50 cursor-pointer transition-colors"
      >
        {isSubmitting ? "Posting..." : "Post Feedback"}
      </button>
    </form>
  );
}