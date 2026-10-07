import Link from "next/link";
import { SprintForm } from "@/components/sprint-form";
import { getSprints } from "@/lib/getSprints";

export default async function SprintsPage() {
  const sprints = await getSprints();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <main className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Sprints Manager</h1>
        <p className="text-slate-500 mt-1">Manage cycles, track tasks, and review daily updates.</p>
      </div>

      {/* Side-by-side Layout: Left (Sprints List) & Right (Form) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: List of Sprints (takes up 1 column on large screens) */}
        <section className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">All Sprints</h2>

          <div className="grid grid-cols-1 gap-4">
            {sprints && sprints.length > 0 ? (
              sprints.map((sprint) => {
                const startDate = new Date(sprint.startDate);
                startDate.setHours(0, 0, 0, 0);
                
                const endDate = new Date(sprint.endDate);
                endDate.setHours(23, 59, 59, 999);

                let statusLabel = "Active Sprint";
                let statusStyle = "bg-green-100 text-green-700";

                if (today < startDate) {
                  statusLabel = "Future Sprint";
                  statusStyle = "bg-blue-100 text-blue-700";
                } else if (today > endDate) {
                  statusLabel = "Past Sprint";
                  statusStyle = "bg-slate-100 text-slate-600";
                }

                return (
                  <Link
                    key={sprint.id}
                    href={`/sprints/${sprint.id}`}
                    className="block border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyle}`}>
                            {statusLabel}
                          </span>
                          <span className="text-xs text-slate-400">
                            {new Date(sprint.startDate).toLocaleDateString()} – {new Date(sprint.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors mt-1">
                          {sprint.name}
                        </h3>
                      </div>
                      <span className="text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform">
                        View Dashboard 
                      </span>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p className="text-sm text-slate-500 bg-slate-50 p-6 rounded-xl border border-dashed text-center">
                No sprints created yet. Use the form on the right to launch your first sprint!
              </p>
            )}
          </div>
        </section>

        {/* Right Column: Form to create a new sprint */}
        <div className="lg:col-span-2 lg:sticky lg:top-6 space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">Create Sprint</h2>
          <SprintForm />
        </div>

      </div>
    </main>
  );
}