// apps/web/src/components/task-modal.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  sprintId: string;
}

export function TaskModal({ sprintId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:4000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, sprintId }),
      });

      if (!res.ok) throw new Error("Failed to create task");

      setTitle("");
      setDescription("");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Could not create task");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {/* Trigger Button with + icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
        title="Add Task"
      >
        +
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-900">Add Task to Sprint</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-semibold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Task Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Implement Zod validation"
                  className="border rounded-lg p-2.5 text-sm w-full text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the task details..."
                  className="border rounded-lg p-2.5 text-sm w-full text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows={3}
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-slate-700 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50 cursor-pointer transition-colors"
                >
                  {isSubmitting ? "Saving..." : "Save Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}