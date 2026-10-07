"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDailyUpdate } from "@/lib/daily-updates";
import { useRouter } from "next/navigation";
import {
  dailyUpdateSchema,
  DailyUpdateFormValues,
} from "@/lib/validation/daily-update-schema";

interface Props {
  sprintId?: string; // Made optional
}

interface SprintOption {
  id: string;
  name: string;
}

export function DailyUpdateModal({ sprintId: initialSprintId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [sprints, setSprints] = useState<SprintOption[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  // Helper to safely open/close and clear success state
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Clear success message when closing the modal so it's fresh next time
      setSuccessMessage(null);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DailyUpdateFormValues>({
    resolver: zodResolver(dailyUpdateSchema),
    defaultValues: { sprintId: initialSprintId || "" },
  });

  // Fetch sprints if sprintId wasn't passed as a prop (for the global page)
  useEffect(() => {
    if (!initialSprintId && isOpen) {
      fetch("http://localhost:4000/api/sprints")
        .then((res) => res.json())
        .then((data) => setSprints(data))
        .catch((err) => console.error("Failed to fetch sprints", err));
    }
  }, [initialSprintId, isOpen]);

  const onSubmit = async (values: DailyUpdateFormValues) => {
    try {
      await createDailyUpdate({ ...values, sprintId: initialSprintId || values.sprintId });
      reset({ sprintId: initialSprintId || "", completedWork: "", nextFocus: "", blockers: "" });
      setSuccessMessage("Daily update submitted successfully.");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to create update");
    }
  };

  return (
    <>
      {/* Trigger Button with + icon */}
      <button
        onClick={() => handleOpenChange(true)}
        className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
        title="Log Daily Update"
      >
        +
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-900">Log Daily Update</h3>
              <button
                onClick={() => handleOpenChange(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-semibold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {successMessage && (
              <div className="rounded-md border border-green-300 bg-green-50 p-3 text-green-700 text-sm">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Show Sprint Dropdown only if sprintId was not provided as a prop */}
              {!initialSprintId && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Select Sprint</label>
                  <select
                    {...register("sprintId")}
                    className="border rounded-lg p-2.5 text-sm w-full text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  >
                    <option value="">-- Choose a sprint --</option>
                    {sprints.map((sprint) => (
                      <option key={sprint.id} value={sprint.id}>
                        {sprint.name}
                      </option>
                    ))}
                  </select>
                  {errors.sprintId && (
                    <p className="text-xs text-red-500 mt-1">{errors.sprintId.message}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Completed Work</label>
                <textarea
                  {...register("completedWork")}
                  placeholder="What did you accomplish today?"
                  className="border rounded-lg p-2.5 text-sm w-full text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows={3}
                />
                {errors.completedWork && (
                  <p className="text-xs text-red-500 mt-1">{errors.completedWork.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Next Focus</label>
                <textarea
                  {...register("nextFocus")}
                  placeholder="What are you focusing on next?"
                  className="border rounded-lg p-2.5 text-sm w-full text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows={3}
                />
                {errors.nextFocus && (
                  <p className="text-xs text-red-500 mt-1">{errors.nextFocus.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Blockers (Optional)</label>
                <textarea
                  {...register("blockers")}
                  placeholder="Any roadblocks or dependencies?"
                  className="border rounded-lg p-2.5 text-sm w-full text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  className="px-4 py-2 text-sm font-medium hover:bg-slate-100 rounded-lg cursor-pointer text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-slate-700 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50 cursor-pointer transition-colors"
                >
                  {isSubmitting ? "Submitting..." : "Submit Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}