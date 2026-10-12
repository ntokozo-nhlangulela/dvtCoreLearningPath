import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function generateCoachFeedback(
  completedWork: string,
  nextFocus: string,
  blockers?: string
) {
  const prompt = `
You are an agile software development coach.

Review the consultant's daily update.

Completed Work:
${completedWork}

Next Focus:
${nextFocus}

Blockers:
${blockers ?? "None"}

Provide:

1. Strengths
2. Improvements
3. Recommendations
4. Overall Score out of 10

Keep response under 150 words.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error: any) {
    console.warn("Primary model busy, trying fallback model...", error?.message);
    
    // Fallback to standard model variant if available
    const fallbackResponse = await ai.models.generateContent({
      model: "gemini-3.5-flash", 
      contents: prompt,
    });
    return fallbackResponse.text;
  }
}