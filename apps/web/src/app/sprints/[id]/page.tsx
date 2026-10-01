// apps/web/src/app/sprints/[id]/page.tsx
import { DailyUpdateCard } from "@/components/daily-update-card";
import { DailyUpdateModal } from "@/components/daily-update-form";
import { TaskCardModal } from "@/components/task-card-modal";
import { TaskModal } from "@/components/task-form";
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
    <main className="p-6 space-y-8 max-w-7xl mx-auto w-full box-border">
      {/* Sprint Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
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
          <p className="text-slate-300 text-sm mt-1">{sprint.description}</p>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full">
        
        {/* Left Column: Sprint Tasks */}
        <section className="lg:col-span-1 space-y-4 min-w-0 w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">Sprint Tasks</h2>
            <TaskModal sprintId={sprint.id} />
          </div>

          <div className="space-y-3 min-h-[220px] w-full">
            {sprint.tasks && sprint.tasks.length > 0 ? (
              sprint.tasks.map((task) => (
                <div key={task.id} className="w-full min-w-0">
                  <TaskCardModal task={task} />
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 bg-slate-50 p-6 rounded-xl border border-dashed text-center flex items-center justify-center h-full min-h-[220px] w-full">
                No tasks assigned yet. Click the + icon above to add one.
              </p>
            )}
          </div>
        </section>

        {/* Right Column: Daily Updates */}
        <section className="lg:col-span-2 space-y-4 min-w-0 w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">Sprint Update History</h2>
            <DailyUpdateModal sprintId={sprint.id} />
          </div>

          <div className="space-y-4 min-h-[220px] w-full">
            {sprint.dailyUpdates && sprint.dailyUpdates.length > 0 ? (
              sprint.dailyUpdates.map((update) => (
                <div key={update.id} className="w-full min-w-0">
                  <DailyUpdateCard update={update} />
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 bg-slate-50 p-6 rounded-xl border border-dashed text-center flex items-center justify-center h-full min-h-[220px] w-full">
                No daily updates logged for this sprint yet. Click the + icon above to add your first update.
              </p>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}