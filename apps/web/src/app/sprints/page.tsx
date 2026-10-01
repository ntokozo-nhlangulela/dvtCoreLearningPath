// apps/web/src/app/sprints/page.tsx
import Link from "next/link";
import { SprintForm } from "@/components/sprint-form";
import { Sprint } from "@/types/sprint";

async function getSprints(): Promise<Sprint[]> {
  const res = await fetch("http://localhost:4000/api/sprints", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch sprints");
  }

  return res.json();
}

export default async function SprintsPage() {
  const sprints = await getSprints();

  return (
    <main className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Sprints Manager</h1>
        <p className="text-slate-500 mt-1">Manage cycles, track tasks, and review daily updates.</p>
      </div>

      {/* Side-by-side Layout: Left (Sprints List) & Right (Form) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: List of Sprints (takes up 2 columns on large screens) */}
        <section className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">All Sprints</h2>

          <div className="grid grid-cols-1 gap-4">
            {sprints && sprints.length > 0 ? (
              sprints.map((sprint) => (
                <Link
                  key={sprint.id}
                  href={`/sprints/${sprint.id}`}
                  className="block border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          sprint.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
                        }`}>
                          {sprint.isActive ? "Active" : "Closed"}
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
              ))
            ) : (
              <p className="text-sm text-slate-500 bg-slate-50 p-6 rounded-xl border border-dashed text-center">
                No sprints created yet. Use the form on the right to launch your first sprint!
              </p>
            )}
          </div>
        </section>

        {/* Right Column: Form to create a new sprint (takes up 1 column, sticky for easy access) */}
        <div className="lg:col-span-2 lg:sticky lg:top-6 space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">Create Sprint</h2>
          <SprintForm />
        </div>

      </div>
    </main>
  );
}