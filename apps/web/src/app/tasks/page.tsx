import { TaskCard } from "@/components/task-card";
import { getTasks } from "../../lib/tasks";

export default async function TasksPage() {
  const tasks = await getTasks();
    if (tasks.length === 0) {
    return (
        <main>
        <h1>Sprint Tasks</h1>

        <p>No tasks available.</p>
        </main>
    );
 }
  return (
    
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">
        Sprint Tasks
      </h1>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
        />
      ))}
    </main>
    
  );
  
}