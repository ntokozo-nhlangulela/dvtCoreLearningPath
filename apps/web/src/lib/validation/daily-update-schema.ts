import { z } from "zod";

export const dailyUpdateSchema = z.object({
  completedWork: z
    .string()
    .min(10, "Completed work must be at least 10 characters"),

  nextFocus: z
    .string()
    .min(10, "Next focus must be at least 10 characters"),

  blockers: z
    .string()
    .max(500, "Blockers cannot exceed 500 characters")
    .optional(),
});

export type DailyUpdateFormValues =
  z.infer<typeof dailyUpdateSchema>;