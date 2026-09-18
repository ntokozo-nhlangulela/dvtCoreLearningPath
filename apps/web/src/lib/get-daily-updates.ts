import { DailyUpdate } from "@/types/daily-update";

export async function getDailyUpdates(): Promise<DailyUpdate[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/daily-updates`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch updates");
  }

  return response.json();
}