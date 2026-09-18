// apps/web/src/app/sprints/[id]/page.tsx
import { DailyUpdateCard } from "@/components/daily-update-card";
import { DailyUpdateForm } from "@/components/daily-update-form";
import { TaskForm } from "@/components/task-form"; // <--- Import here
import { Sprint } from "@/types/sprint";

async function getSprintDetails(id: string): Promise<Sprint> {
  const res = await fetch(`http://localhost:4000/api/sprints/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch sprint details");
  }

  return res.json();
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SprintDashboardPage({ params }: PageProps) {
  const { id } = await params;
  const sprint = await getSprintDetails(id);

  return (
    <main className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Sprint Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider bg-blue-600 text-white px-2.5 py-1 rounded-full">
              {sprint.isActive ? "🟢 Active Sprint" : "📁 Archived Sprint"}
            </span>
            <span className="text-slate-400 text-sm">
              {new Date(sprint.startDate).toLocaleDateString()} – {new Date(sprint.endDate).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold mt-2">{sprint.name}</h1>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Sprint Tasks */}
        <section className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">Sprint Tasks</h2>
          
          {/* Task creation form scoped to this sprint */}
          <TaskForm sprintId={sprint.id} />

          <div className="space-y-3 pt-2">
            {sprint.tasks && sprint.tasks.length > 0 ? (
              sprint.tasks.map((task) => (
                <div key={task.id} className="border rounded-xl p-4 bg-white shadow-sm flex items-center justify-between">
                  <span className="font-medium text-slate-700">{task.title}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                    {task.completed}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 bg-slate-50 p-4 rounded-xl border border-dashed text-center">
                No tasks assigned to this sprint yet.
              </p>
            )}
          </div>
        </section>

        {/* Right Column: Daily Updates & Feedback */}
        <section className="lg:col-span-2 space-y-6">
  <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
    <h2 className="text-xl font-semibold text-slate-800">Log Daily Update</h2>
    <DailyUpdateForm sprintId={sprint.id} />
  </div>

  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-slate-800">Sprint Update History</h2>
    {sprint.dailyUpdates && sprint.dailyUpdates.length > 0 ? (
      sprint.dailyUpdates.map((update) => (
        <DailyUpdateCard key={update.id} update={update} />
      ))
    ) : (
      <p className="text-sm text-slate-500 bg-slate-50 p-6 rounded-xl border border-dashed text-center">
        No daily updates logged for this sprint yet.
      </p>
    )}
  </div>
</section>

      </div>
    </main>
  );
}