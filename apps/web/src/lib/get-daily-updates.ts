import { DailyUpdate } from "@/types/daily-update";

export async function getDailyUpdates(sprintId?: string): Promise<DailyUpdate[]> {
  const url = sprintId 
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/daily-updates?sprintId=${sprintId}`
    : `${process.env.NEXT_PUBLIC_API_URL}/api/daily-updates`;

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch updates");
  }

  return response.json();
}