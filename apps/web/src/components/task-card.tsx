import { Task } from "@/types/task";

interface Props {
  task: Task;
}

const statusMap = {
  TODO: "⏳ To Do",
  IN_PROGRESS: "🚧 In Progress",
  IN_REVIEW: "👀 In Review",
  BLOCKED: "🚫 Blocked",
  DONE: "✅ Done",
};

const statusStyles = {
  TODO: "text-gray-500",
  IN_PROGRESS: "text-yellow-500",
  DONE: "text-green-500",
  IN_REVIEW: "text-blue-500",
  BLOCKED: "text-red-500",
};

export function TaskCard({ task }: Props) {
  return (
    <main className="p-6 space-y-4">
      <div className="rounded-lg border p-4 shadow-sm">
        <h3>{task.title}</h3>

        <p className={statusStyles[task.completed]}>
                {statusMap[task.completed]} {task.completed}
        </p>
      </div>
    </main>
  );
}