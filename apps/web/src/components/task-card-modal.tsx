"use client";

import { Task } from "@/types/task";
import { useState } from "react";

interface Props {
  task: Task;
}

export function TaskCardModal({ task }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Clickable Task Card */}
      <div
        onClick={() => setIsOpen(true)}
        className="border rounded-xl p-4 bg-white shadow-sm space-y-1 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer min-w-0"
      >
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-800 truncate">{task.title}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium shrink-0">
            {task.completed}
          </span>
        </div>
        <p className="text-xs text-slate-500 truncate">{task.description}</p>
      </div>

      {/* Task Details Modal View */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold uppercase tracking-wide">
                  Task Details
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                  {task.completed}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-semibold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 pt-2">
              <h2 className="text-2xl font-bold text-slate-900">{task.title}</h2>
              <div className="border-t pt-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Description</h4>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">
                  {task.description}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bg-slate-700 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50 cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}