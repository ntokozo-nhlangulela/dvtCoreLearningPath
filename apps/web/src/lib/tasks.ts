import { Task } from "../types/task";

export async function getTasks(): Promise<Task[]> {
  const response = await fetch("http://localhost:4000/api/tasks", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load tasks");
  }

  return response.json();
}