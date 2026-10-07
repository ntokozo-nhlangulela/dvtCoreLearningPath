import { DailyUpdate } from "@/types/daily-update";

interface CreateDailyUpdateRequest {
  completedWork: string;
  nextFocus: string;
  blockers?: string;
}

export async function createDailyUpdate(
  payload: CreateDailyUpdateRequest & { sprintId: string }
): Promise<DailyUpdate> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/daily-updates`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create update");
  }

  return response.json();
}