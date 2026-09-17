import { getTasks } from "../../lib/tasks";

export default async function TasksPage() {
  const tasks = await getTasks();

  return (
    <main>
      <h1>Tasks</h1>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.completed}
          </li>
        ))}
      </ul>
    </main>
  );
}