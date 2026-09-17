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

export function TaskCard({ task }: Props) {
  return (
    <div className="border rounded p-4">
      <h3>{task.title}</h3>

      <p>{statusMap[task.completed]}</p>
    </div>
  );
}