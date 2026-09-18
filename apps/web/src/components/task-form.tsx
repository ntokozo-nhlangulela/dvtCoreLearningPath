// apps/web/src/components/task-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  sprintId: string;
}

export function TaskForm({ sprintId }: Props) {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:4000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, sprintId }), // Links task to this sprint
      });

      if (!res.ok) throw new Error("Failed to create task");

      setTitle("");
      router.refresh(); // Refreshes the server component to show the new task instantly
    } catch (error) {
      console.error(error);
      alert("Could not create task");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a new task..."
        className="border rounded-lg p-2 text-sm flex-1 bg-white"
        required
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer transition-colors"
      >
        {isSubmitting ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}