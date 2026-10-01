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
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add feedback..."
        className="border rounded p-2 w-full text-sm  text-slate-300 placeholder:text-slate-500 focus:ring-2 focus:ring-border-slate-700 focus:outline-none"
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