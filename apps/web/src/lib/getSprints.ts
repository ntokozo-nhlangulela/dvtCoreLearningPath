import { Sprint } from "@/types/sprint";

export async function getSprints(): Promise<Sprint[]> {
  const res = await fetch("http://localhost:4000/api/sprints", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch sprints");
  }

  return res.json();
}