import { Sprint } from "@/types/sprint";

export async function getSprintDetails(id: string): Promise<Sprint> {
  const res = await fetch(`http://localhost:4000/api/sprints/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch sprint details");
  }

  return res.json();
}