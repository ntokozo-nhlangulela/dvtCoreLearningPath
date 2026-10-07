"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SprintForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !startDate || !endDate || !description) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:4000/api/sprints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, startDate, endDate, isActive: true }),
      });

      if (!res.ok) throw new Error("Failed to create sprint");

      setName("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Could not create sprint");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="border p-4 rounded-xl bg-white shadow-sm space-y-4">
      <h3 className="font-semibold text-slate-800">Create New Sprint</h3>
      
      <div>
        <label className="block text-sm font-medium text-slate-700">Sprint Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Sprint 15"
          className="border rounded p-2 w-full text-sm mt-1  text-slate-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is the main goal of this sprint?"
          className="border rounded p-2 w-full text-sm mt-1  text-slate-700"
          rows={2}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded p-2 w-full text-sm mt-1  text-slate-700"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" >End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded p-2 w-full text-sm mt-1  text-slate-700"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-slate-700 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50 cursor-pointer transition-colors"
      >
        {isSubmitting ? "Creating..." : "Create Sprint"}
      </button>
    </form>
  );
}