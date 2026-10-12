export async function getCoachFeedback(
  completedWork: string,
  nextFocus: string,
  blockers?: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/ai-coach`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completedWork,
        nextFocus,
        blockers,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to generate feedback");
  }

  return response.json();
}